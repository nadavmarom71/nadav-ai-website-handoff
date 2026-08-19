import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const routes = ["d1", "d2", "d3"];
const iphone = devices["iPhone 13"]; // 390x844 @3x, real mobile emulation

fs.mkdirSync(OUT, { recursive: true });

// Use the locally installed Chrome rather than downloading a matching build.
const browser = await chromium.launch({ channel: "chrome" });
const report = [];

for (const r of routes) {
  const ctx = await browser.newContext({ ...iphone, locale: "he-IL" });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000/${r}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  // First viewport, exactly as a phone shows it.
  await page.screenshot({ path: `${OUT}/${r}-fold.png` });

  // Overflow + layout audit in the real mobile viewport.
  const audit = await page.evaluate(() => {
    const de = document.documentElement;
    const offenders = [];
    for (const el of document.querySelectorAll("*")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) continue;
      // In RTL, overflow shows up as content extending past either edge.
      if (rect.right > de.clientWidth + 1 || rect.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 48),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          w: Math.round(rect.width),
        });
      }
    }
    return {
      clientWidth: de.clientWidth,
      scrollWidth: de.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowX: de.scrollWidth - de.clientWidth,
      offenders: offenders.slice(0, 12),
    };
  });

  // Scroll through and capture the section-2 mechanism after reveals fire.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.42));
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${OUT}/${r}-section2.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.72));
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${OUT}/${r}-section2b.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${r}-turn.png` });

  const height = await page.evaluate(() => document.body.scrollHeight);
  report.push({ route: r, height, ...audit });
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
