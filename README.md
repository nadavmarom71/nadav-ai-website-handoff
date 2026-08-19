# נדב — AI website

Hebrew (RTL) marketing site for Nadav, who builds AI solutions and custom systems
for businesses.

**Status: handoff baseline.** The current design direction was reviewed by the
client and **rejected**. This repository preserves a working, verified implementation
so the next developer starts from a known state — not from an approved design.

---

## Read these first

| Document | What it covers |
|---|---|
| **[HANDOFF.md](HANDOFF.md)** | Start here. Business context, planned pages, and the client's design feedback |
| **[CURRENT_STATE.md](CURRENT_STATE.md)** | What is real, what is placeholder, what is not approved |
| **[TECHNICAL_AUDIT.md](TECHNICAL_AUDIT.md)** | Commands, dependencies, architecture, animation, known issues |
| **[COPY_BRIEF.md](COPY_BRIEF.md)** | Hebrew voice requirements. Highest-risk area — copy was rejected three times |
| **[DESIGN_REFERENCES.md](DESIGN_REFERENCES.md)** | The visual quality bar, with URLs |

Committed screenshots of what this code currently renders: **[`docs/baseline/`](docs/baseline/)**
(desktop 1440×900 and mobile 390×844, six scroll positions each).

---

## Quick start

```bash
npm install
npm run dev        # → http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

Requires Node ≥ 20.9 (developed on v24.13.0). No environment variables, no external
services, no API keys.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · GSAP 3.15 with
ScrollTrigger and SplitText · hand-authored CSS.

One route (`/`), five sections, Hebrew RTL throughout.

---

## Verified at handoff

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ 0 errors |
| `npm run build` | ✅ succeeds, 3 static pages |
| Console errors at runtime | ✅ 0 |
| Horizontal overflow @ 390px / 1440px | ✅ none |
| `prefers-reduced-motion` | ✅ 0 elements left hidden |
| Keyboard focus visibility | ✅ present |
| Lint | ⚠️ not configured |
| Tests | ⚠️ none |

Re-run the checks yourself (dev server must be running):

```bash
node scripts/gsap-check.mjs   # SplitText, marquee velocity, parallax, console
node scripts/pin-check.mjs    # pinned horizontal section
node scripts/review.mjs out   # overflow / reduced-motion / focus, both viewports
node scripts/baseline.mjs     # regenerate docs/baseline/
```

---

## Two things to know before changing code

**1. Nothing is hidden by CSS.** All animation entrance states live in GSAP `from()`
tweens. If JavaScript fails, the page still renders fully readable. Preserve this.

**2. `whenFontsReady()` in `src/lib/motion.ts` is load-bearing.** `next/font` uses
`display: swap`, so SplitText and ScrollTrigger measure the wrong values if they run
before webfonts land. Removing the gate reintroduces a real bug.

---

## Blockers needing input from Nadav

- real portrait photograph (the "Meet" section is built around an empty slot)
- surname (the wordmark is currently `נדב` alone — deliberately not invented)
- approval on what may be said publicly about תמלל לי, תדביק לי and the Lidor CRM
- consultation price, length and deliverables

No testimonials, client names, metrics or credentials appear anywhere in this
codebase. None were invented. Keep it that way.
