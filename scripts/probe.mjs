import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: "he-IL" });
const p = await c.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(() => {
  const g = (s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { top: Math.round(r.top), h: Math.round(r.height), pos: cs.position, minH: cs.minHeight, disp: cs.display };
  };
  return {
    scrollY: window.scrollY,
    hero: g(".br-hero"),
    wrap: g(".br-hero > .br-wrap"),
    h1: g(".br-h1"),
    glow: g(".br-hero-glow"),
    ghost: g(".br-hero .br-ghost"),
    manual: g(".br-manual"),
    bodyChildren: [...document.querySelector("main").children].map(e => e.className.toString().slice(0,24)),
  };
}), null, 2));
await b.close();
