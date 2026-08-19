/** Targeted captures for review: index, D1 gate, D3 signature note. */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const iphone = devices["iPhone 13"];
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ ...iphone, locale: "he-IL" });
const page = await ctx.newPage();

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/index.png`, fullPage: true });

await page.goto("http://localhost:3000/d1", { waitUntil: "networkidle" });
await page.locator('.d1-state-infra[data-kind="gate"]').first().scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/d1-gate.png` });

await page.goto("http://localhost:3000/d3", { waitUntil: "networkidle" });
await page.locator(".d3-note").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/d3-note.png` });

await browser.close();
console.log("ok");
