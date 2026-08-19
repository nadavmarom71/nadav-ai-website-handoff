/** Capture discrete mobile viewports down a reference page to read scroll rhythm. */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const sites = JSON.parse(process.argv[3]);
const iphone = devices["iPhone 13"];
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const { name, url, stops } of sites) {
  try {
    const ctx = await browser.newContext({ ...iphone, locale: "he-IL" });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);

    for (const [i, frac] of stops.entries()) {
      // Creep down so reveals fire naturally rather than jumping past them.
      await page.evaluate(async (f) => {
        const target = document.body.scrollHeight * f;
        const step = 420;
        for (let y = window.scrollY; y < target; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 90));
        }
        window.scrollTo(0, target);
      }, frac);
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${OUT}/${name}-${i}.png` });
    }
    console.log(name, "ok");
    await ctx.close();
  } catch (e) {
    console.log(name, "FAILED:", e.message.slice(0, 80));
  }
}

await browser.close();
