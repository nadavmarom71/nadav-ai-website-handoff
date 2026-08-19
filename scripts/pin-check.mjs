import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: "he-IL" });
const p = await c.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message.slice(0, 140)));
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.waitForTimeout(2600);
const frameTop = await p.evaluate(() => document.querySelector(".br-frame").getBoundingClientRect().top + window.scrollY);
const samples = [];
for (const off of [-300, 200, 700, 1200, 1700]) {
  await p.evaluate((y) => window.scrollTo(0, y), frameTop + off);
  await p.waitForTimeout(500);
  samples.push(await p.evaluate(() => {
    const t = document.querySelector(".br-track");
    const f = document.querySelector(".br-frame");
    return {
      x: Math.round(new DOMMatrix(getComputedStyle(t).transform).m41),
      pinned: getComputedStyle(f.parentElement).position === "relative" ? f.getBoundingClientRect().top.toFixed(0) : "?",
    };
  }));
}
const panels = await p.evaluate(() => document.querySelectorAll(".br-panel").length);
await b.close();
console.log(JSON.stringify({ errs, panels, trackX: samples.map(s => s.x) }, null, 2));
