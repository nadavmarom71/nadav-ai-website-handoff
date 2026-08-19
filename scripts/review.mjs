/** Review pass: mobile + desktop captures, plus a layout/a11y audit. */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

const audit = async (page) =>
  page.evaluate(() => {
    const de = document.documentElement;
    const bad = [];
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      // Ignore elements that are intentionally clipped scroll/overflow tracks.
      if (cs.position === "fixed") continue;
      if (r.right > de.clientWidth + 2 || r.left < -2) {
        const p = el.closest(".br-marq-row, .br-ghost, .br-hero-glow, .br-close-glow");
        if (p) continue;
        bad.push({
          cls: (el.className || "").toString().slice(0, 40),
          l: Math.round(r.left),
          r: Math.round(r.right),
        });
      }
    }
    return {
      w: de.clientWidth,
      overflowX: de.scrollWidth - de.clientWidth,
      h: document.body.scrollHeight,
      offenders: bad.slice(0, 8),
      h1: (() => {
        const el = document.querySelector(".br-h1");
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { size: cs.fontSize, lines: el.querySelectorAll(".br-mask").length };
      })(),
      bodySize: getComputedStyle(document.querySelector(".br-lede")).fontSize,
    };
  });

const walk = async (page, stops, tag) => {
  for (const [i, f] of stops.entries()) {
    await page.evaluate(async (frac) => {
      const t = document.body.scrollHeight * frac;
      for (let y = window.scrollY; y < t; y += 420) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
      window.scrollTo(0, t);
    }, f);
    await page.waitForTimeout(1500);
    // Start at 1: index 0 is reserved for the untouched fold capture.
    await page.screenshot({ path: `${OUT}/${tag}-${i + 1}.png` });
  }
};

// ---- mobile ----
const m = await browser.newContext({ ...devices["iPhone 13"], locale: "he-IL" });
const mp = await m.newPage();
await mp.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await mp.waitForTimeout(2200);
await mp.screenshot({ path: `${OUT}/m-0.png` });
const mAudit = await audit(mp);
await walk(mp, [0.2, 0.36, 0.52, 0.7, 0.9], "m");
await m.close();

// ---- desktop ----
const d = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: "he-IL",
});
const dp = await d.newPage();
await dp.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await dp.waitForTimeout(2200);
await dp.screenshot({ path: `${OUT}/d-0.png` });
const dAudit = await audit(dp);
await walk(dp, [0.2, 0.38, 0.56, 0.78], "d");
await d.close();

// ---- reduced motion ----
const r = await browser.newContext({
  ...devices["iPhone 13"],
  reducedMotion: "reduce",
});
const rp = await r.newPage();
await rp.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await rp.waitForTimeout(700);
const hidden = await rp.evaluate(() => {
  const sel = ".br-mask > i, .br-hero-body, .br-portrait, .br-item, .br-rev, .br-scroll";
  return [...document.querySelectorAll(sel)].filter((e) => {
    const cs = getComputedStyle(e);
    return parseFloat(cs.opacity) < 0.99 || cs.transform !== "none";
  }).length;
});
await rp.keyboard.press("Tab");
const focus = await rp.evaluate(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const cs = getComputedStyle(el);
  return {
    text: (el.textContent || "").trim().slice(0, 22),
    outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
  };
});
await r.close();
await browser.close();

console.log(JSON.stringify({ mobile: mAudit, desktop: dAudit, reducedMotionUnrevealed: hidden, focus }, null, 2));
