/**
 * Reference research: browse each site as a real mobile experience.
 *
 * Scrolls the whole page first so scroll-triggered reveals fire, then captures
 * (a) the full page, to read section rhythm and composition variety at a glance,
 * and (b) the first viewport, to judge craft up close.
 */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const sites = JSON.parse(process.argv[3]);
const iphone = devices["iPhone 13"];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const { name, url } of sites) {
  try {
    const ctx = await browser.newContext({ ...iphone, locale: "he-IL" });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);

    await page.screenshot({ path: `${OUT}/${name}-hero.png` });

    // Walk the page so every reveal fires, then return to the top.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(160);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);

    await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

    const meta = await page.evaluate(() => ({
      title: document.title,
      h: document.body.scrollHeight,
      fonts: [...new Set([...document.querySelectorAll("h1,h2,h3,p,a")]
        .map((e) => getComputedStyle(e).fontFamily))].slice(0, 6),
    }));
    console.log(name, JSON.stringify(meta));
    await ctx.close();
  } catch (e) {
    console.log(name, "FAILED:", e.message.slice(0, 90));
  }
}

await browser.close();
