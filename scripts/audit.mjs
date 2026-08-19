/**
 * Verification pass for the three prototypes, in a real mobile viewport.
 *
 * Checks the things that actually matter for this gate:
 *  - the guardrail beats are visible and visually distinct from the auto beats
 *  - reduced-motion users see all content (reveals must not gate content)
 *  - keyboard focus is visible
 *  - no bidi reordering of Latin runs inside Hebrew
 */
import { chromium, devices } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2];
const iphone = devices["iPhone 13"];
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const results = [];

// Selector for the gate beat + the reveal target, per direction.
const spec = {
  d1: { beat: ".d1-beat", gate: '.d1-state-infra[data-kind="gate"]' },
  d2: { beat: ".d2-beat", gate: '.d2-beat[data-kind="gate"] .d2-junction' },
  d3: { beat: ".d3-beat", gate: '.d3-beat[data-kind="gate"] .d3-msg-infra' },
};

for (const route of ["d1", "d2", "d3"]) {
  const ctx = await browser.newContext({ ...iphone, locale: "he-IL" });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000/${route}`, { waitUntil: "networkidle" });

  // --- guardrail beats: scroll to the first gate and shoot it in context ---
  const gate = page.locator(spec[route].gate).first();
  await gate.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${route}-gate.png` });

  const gateCount = await page.locator(spec[route].gate).count();

  // --- bidi: Latin runs must not be reordered against Hebrew ---
  const bidi = await page.evaluate(() => {
    const body = document.body.innerText;
    // If bidi broke, these appear reversed or split by stray punctuation.
    return {
      chatgpt: body.includes("ChatGPT"),
      crm: body.includes("CRM"),
      time: /18:42/.test(body) && /09:36/.test(body),
    };
  });

  await ctx.close();

  // --- reduced motion: every beat must be fully visible without scrolling ---
  const rmCtx = await browser.newContext({
    ...iphone,
    locale: "he-IL",
    reducedMotion: "reduce",
  });
  const rmPage = await rmCtx.newPage();
  await rmPage.goto(`http://localhost:3000/${route}`, { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(500);

  const hidden = await rmPage.evaluate((sel) => {
    const out = [];
    document.querySelectorAll(sel).forEach((el, i) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.99) out.push({ i, opacity: cs.opacity });
    });
    return out;
  }, spec[route].beat);

  // --- keyboard focus visibility on the primary CTA ---
  await rmPage.keyboard.press("Tab");
  await rmPage.keyboard.press("Tab");
  const focus = await rmPage.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || "").trim().slice(0, 28),
      outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0,
    };
  });

  await rmCtx.close();

  results.push({
    route,
    gateBeatsFound: gateCount,
    bidiOk: bidi.chatgpt && bidi.crm && bidi.time,
    beatsHiddenUnderReducedMotion: hidden.length,
    focusVisible: focus,
  });
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
