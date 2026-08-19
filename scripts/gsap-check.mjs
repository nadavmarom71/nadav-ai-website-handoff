/** Verify the GSAP layer actually does what it claims. */
import { chromium, devices } from "playwright";

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "he-IL" });
const page = await ctx.newPage();

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text().slice(0, 160));
});
page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message.slice(0, 160)));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

const before = await page.evaluate(() => ({
  splitLines: document.querySelectorAll(".br-line").length,
  masks: document.querySelectorAll("[data-split-mask], .br-line").length,
  scrollTriggers: window.ScrollTrigger?.getAll?.().length ?? "no global",
  h1LineCount: document.querySelectorAll(".br-h1 .br-line").length,
  helloLines: document.querySelectorAll(".br-hello .br-line").length,
  bodyParas: document.querySelectorAll(".br-meet-body p").length,
  h1Visible: getComputedStyle(document.querySelector(".br-h1")).opacity,
  trackTransform: getComputedStyle(document.querySelector(".br-marq-track")).transform,
}));

// Does the marquee move at all?
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(300);
const t1 = await page.evaluate(
  () => getComputedStyle(document.querySelector(".br-marq-track")).transform,
);
await page.waitForTimeout(900);
const t2 = await page.evaluate(
  () => getComputedStyle(document.querySelector(".br-marq-track")).transform,
);

// Does a fast scroll change its speed? Compare travel per unit time.
const travel = async (fast) => {
  await page.evaluate(async (f) => {
    const y = window.scrollY;
    if (f) {
      window.scrollTo(0, y + 1400);
    } else {
      for (let i = 0; i < 14; i++) {
        window.scrollTo(0, y + i * 20);
        await new Promise((r) => setTimeout(r, 30));
      }
    }
  }, fast);
  await page.waitForTimeout(120);
  const a = await page.evaluate(
    () => getComputedStyle(document.querySelector(".br-marq-track")).transform,
  );
  await page.waitForTimeout(260);
  const b = await page.evaluate(
    () => getComputedStyle(document.querySelector(".br-marq-track")).transform,
  );
  const nx = (s) => parseFloat(s.split(",")[4] ?? "0");
  return Math.abs(nx(b) - nx(a));
};

await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(1400);
const slow = await travel(false);
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(1400);
const fast = await travel(true);

// Are the parallax layers actually offset at different scroll depths?
await page.evaluate(() => window.scrollTo(0, 2600));
await page.waitForTimeout(700);
const parallax = await page.evaluate(() => {
  const g = document.querySelector(".br-meet .br-ghost");
  const p = document.querySelector(".br-portrait-inner");
  return {
    ghost: g ? getComputedStyle(g).transform : null,
    portraitInner: p ? getComputedStyle(p).transform : null,
    worlds: document.querySelectorAll(".br-world").length,
  };
});

await browser.close();
console.log(
  JSON.stringify(
    { errors, before, marqueeMoves: t1 !== t2, travelSlow: slow.toFixed(1), travelFast: fast.toFixed(1), parallax },
    null,
    2,
  ),
);
