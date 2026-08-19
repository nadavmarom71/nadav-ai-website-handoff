/** Review pass for the homepage: scroll rhythm, overflow, motion, a11y. */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const iphone = devices["iPhone 13"];
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ ...iphone, locale: "he-IL" });
const page = await ctx.newPage();

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/01-fold.png` });

const audit = await page.evaluate(() => {
  const de = document.documentElement;
  const bad = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > de.clientWidth + 1 || r.left < -1) {
      bad.push({
        cls: (el.className || "").toString().slice(0, 44),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  }
  return {
    clientWidth: de.clientWidth,
    overflowX: de.scrollWidth - de.clientWidth,
    height: document.body.scrollHeight,
    offenders: bad.slice(0, 10),
  };
});

// Walk the page the way a thumb does.
const stops = [0.16, 0.3, 0.42, 0.56, 0.72, 0.88];
for (const [i, f] of stops.entries()) {
  await page.evaluate(async (frac) => {
    const target = document.body.scrollHeight * frac;
    for (let y = window.scrollY; y < target; y += 380) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo(0, target);
  }, f);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/0${i + 2}-scroll.png` });
}

// Interactive: switch a scenario chip and capture the replayed thread.
await page.locator(".nv-chip").nth(2).scrollIntoViewIfNeeded();
await page.locator(".nv-chip").nth(2).click();
await page.waitForTimeout(1300);
await page.screenshot({ path: `${OUT}/09-chip-switched.png` });

const chipState = await page.evaluate(() => {
  const chips = [...document.querySelectorAll(".nv-chip")];
  return {
    count: chips.length,
    selected: chips.findIndex((c) => c.getAttribute("aria-selected") === "true"),
    minTap: Math.min(...chips.map((c) => c.getBoundingClientRect().height)),
  };
});

await ctx.close();

// Reduced motion: nothing may be hidden behind an animation.
const rm = await browser.newContext({ ...iphone, reducedMotion: "reduce" });
const rp = await rm.newPage();
await rp.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await rp.waitForTimeout(600);
const hidden = await rp.evaluate(() => {
  const sel = ".nv-h1 i, .nv-hero-sub, .nv-actions, .nv-ticker, .nv-reveal, .nv-bubble, .nv-note";
  return [...document.querySelectorAll(sel)].filter(
    (e) => parseFloat(getComputedStyle(e).opacity) < 0.99,
  ).length;
});
await rp.keyboard.press("Tab");
const focus = await rp.evaluate(() => {
  const el = document.activeElement;
  const cs = el ? getComputedStyle(el) : null;
  return el && cs
    ? { text: (el.textContent || "").trim().slice(0, 24), outline: cs.outlineStyle !== "none" }
    : null;
});
await rm.close();
await browser.close();

console.log(JSON.stringify({ audit, chipState, reducedMotionHidden: hidden, focus }, null, 2));
