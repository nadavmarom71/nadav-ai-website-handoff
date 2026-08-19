/** Desktop research pass: composition, type scale, layering, transitions. */
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const sites = JSON.parse(process.argv[3]);
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const { name, url, stops } of sites) {
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      locale: "he-IL",
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3200);

    for (const [i, frac] of stops.entries()) {
      await page.evaluate(async (f) => {
        const target = document.body.scrollHeight * f;
        for (let y = window.scrollY; y < target; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 90));
        }
        window.scrollTo(0, target);
      }, frac);
      await page.waitForTimeout(1600);
      await page.screenshot({ path: `${OUT}/${name}-d${i}.png` });
    }

    // Type scale + palette actually in use.
    const style = await page.evaluate(() => {
      const seen = new Map();
      for (const el of document.querySelectorAll("h1,h2,h3,p,a,button,span")) {
        const cs = getComputedStyle(el);
        const size = Math.round(parseFloat(cs.fontSize));
        if (size < 13) continue;
        const key = `${size}|${cs.fontWeight}|${cs.fontFamily.split(",")[0]}`;
        seen.set(key, (seen.get(key) || 0) + 1);
      }
      const colors = new Map();
      for (const el of document.querySelectorAll("section,div,header,main")) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)") colors.set(bg, (colors.get(bg) || 0) + 1);
      }
      return {
        type: [...seen.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12),
        colors: [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10),
      };
    });
    console.log("###", name, JSON.stringify(style));
    await ctx.close();
  } catch (e) {
    console.log(name, "FAILED:", e.message.slice(0, 80));
  }
}

await browser.close();
