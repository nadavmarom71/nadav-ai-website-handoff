/**
 * Capture the committed visual baseline in docs/baseline/.
 *
 * Run against a live dev server so scroll-triggered motion has actually settled:
 *   npm run dev          (in one terminal)
 *   node scripts/baseline.mjs
 *
 * Regenerate this whenever the design changes, so the repo always carries an
 * honest picture of what the code currently produces.
 */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] ?? "docs/baseline";
const URL = process.argv[3] ?? "http://localhost:3000/";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

/** Creep down the page so ScrollTrigger fires in order, then hold and shoot. */
async function shoot(page, prefix, stops) {
  for (const [i, frac] of stops.entries()) {
    await page.evaluate(async (f) => {
      const target = (document.body.scrollHeight - window.innerHeight) * f;
      const from = window.scrollY;
      const steps = 26;
      for (let s = 1; s <= steps; s++) {
        window.scrollTo(0, from + ((target - from) * s) / steps);
        await new Promise((r) => setTimeout(r, 32));
      }
    }, frac);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}/${prefix}-${i}.png` });
  }
}

const stops = [0, 0.18, 0.38, 0.58, 0.78, 1];

// --- desktop ---
const dctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: "he-IL",
});
const dpage = await dctx.newPage();
await dpage.goto(URL, { waitUntil: "networkidle" });
await dpage.waitForTimeout(2400);
await shoot(dpage, "desktop", stops);
await dctx.close();

// --- mobile, the primary target ---
const mctx = await browser.newContext({ ...devices["iPhone 13"], locale: "he-IL" });
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: "networkidle" });
await mpage.waitForTimeout(2400);
await shoot(mpage, "mobile", stops);
await mctx.close();

await browser.close();
console.log(`baseline written to ${OUT}`);
