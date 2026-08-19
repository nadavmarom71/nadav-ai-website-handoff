# TECHNICAL AUDIT

Everything needed to run, build and modify this project.

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server → http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run typecheck    # tsc --noEmit
```

**No lint script and no ESLint config exist.** If you want linting, add it:
`npm i -D eslint eslint-config-next` and an `eslint.config.mjs`.

### Verified status at handoff

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ 0 errors |
| `npm run build` | ✅ Compiled successfully in ~19s, 3 static pages |
| Lint | ⚠️ Not configured — nothing to run |
| Tests | ⚠️ None exist |
| Console errors at runtime | ✅ 0 |

---

## Environment

| | |
|---|---|
| Node | v24.13.0 (developed on). Next 16 requires Node ≥ 20.9 |
| npm | 11.10.0 |
| OS during development | Windows 11 |
| Environment variables | **None.** No `.env` file exists and none is needed |
| External services | **None.** No API keys, no database, no analytics, no third-party SDK. The site is fully static |
| Deployment | Never deployed |

---

## Dependencies and why each is here

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `next` | ^16.3.1 | Framework. App Router, Turbopack, `next/font` |
| `react` / `react-dom` | ^19.2.8 | Required by Next 16 |
| `gsap` | ^3.15.0 | All animation. Uses ScrollTrigger + SplitText (both now free in GSAP 3.13+) |
| `@gsap/react` | ^2.1.2 | `useGSAP()` hook — handles cleanup on unmount, avoids React 19 double-invoke issues |

### Dev

| Package | Version | Purpose |
|---|---|---|
| `typescript` | 5.9.2 | Strict mode on |
| `tailwindcss` + `@tailwindcss/postcss` | 4.1.13 | ⚠️ **Installed but barely used.** See "technical debt" |
| `playwright` | ^1.62.1 | Screenshot + verification scripts only. Not a test runner here |
| `@types/*` | — | Types |

> **Playwright note:** the scripts launch `channel: "chrome"`, i.e. your locally
> installed Google Chrome, rather than a downloaded Playwright browser. If Chrome
> is not installed, run `npx playwright install chromium` and change `channel:
> "chrome"` to nothing in the scripts.

---

## Project structure

```
src/
  app/
    layout.tsx      <html lang="he" dir="rtl">, metadata, favicon wiring
    page.tsx        the only route. Loads 3 fonts, composes 5 sections
    globals.css     minimal reset, .sr-only, global reduced-motion guard
  components/site/
    Nav.tsx         fixed pill nav, inverts over the light section
    Hero.tsx        section 1
    Manual.tsx      section 2 — velocity-driven marquee
    Meet.tsx        section 3 — light section, portrait slot, "two worlds" device
    Builds.tsx      section 4 — pinned horizontal run on desktop
    Close.tsx       section 5
    bits.tsx        shared primitives: Kicker, Lines, Cta, Progress
  content/
    site.ts         ALL COPY. Single source of truth
  lib/
    motion.ts       GSAP registration + shared helpers
  styles/
    brand.css       ALL DESIGN. 996 lines, single file
public/
  icon.png          32×32 generated brass diamond favicon
docs/baseline/      committed screenshots of the current render
scripts/            Playwright verification + research tools
```

### Routing

**One route: `/`.** Statically prerendered. No dynamic routes, no route groups, no
API routes, no middleware. Nav links are on-page anchors (`#builds`, `#me`,
`#consult`, `#contact`), several of which have no matching target — they were
placeholders for pages that were never built.

---

## CSS architecture

**Not Tailwind-driven.** Despite Tailwind being installed, the design is written as
hand-authored CSS in `src/styles/brand.css`, scoped under a single `.br` root class.
`globals.css` does `@import "tailwindcss"` for the preflight reset, but essentially
no utility classes are used in the components.

**If you rebuild:** either commit to Tailwind properly or drop the dependency. The
current half-and-half state is technical debt.

### Design tokens (`.br` in `brand.css`)

```css
/* night */
--ink:     #06152b    --ink-2:  #091f3d    --deep: #0a2a57
--blue:    #026fd7    --azure:  #4fa3ff    --glow: #7fc4ff
/* daylight */
--bone:    #ece7dd    --bone-2: #ded7c9
--on-bone: #11161d    --on-bone-mute: #5a5f66
/* the only warm accent */
--brass:   #d99a2b
/* text on night */
--on-ink:  #eaf1fa    --on-ink-mute:  #8ba3c0
/* layout */
--pad: 22px (40px desktop)   --bevel: 26px
```

### Recurring visual devices

| Class | What it does |
|---|---|
| `.br-bevel` | Cut-corner polygon via `clip-path`. Panels are never rounded rectangles |
| `.br-ghost` | Huge low-contrast word behind each section |
| `.br-kicker` | Small mono label with a brass diamond |
| `.br-d` | Display type: Heebo 900, `-0.045em` tracking, `0.92` line-height |
| `.br-line` | Wrapper SplitText injects per line |

### Fonts

Loaded via `next/font/google` in `page.tsx`, exposed as CSS variables:

- `--font-display` → **Heebo** 800/900 (hebrew + latin)
- `--font-body` → **Assistant** 400/600/700 (hebrew + latin)
- `--font-mono` → **IBM Plex Mono** 400/500 (latin only)

---

## Animation implementation

All in GSAP. Registered once in `src/lib/motion.ts`.

### Critical pattern: nothing is hidden by CSS

Entrance states live in GSAP `from()` tweens, never in CSS. If JavaScript fails, the
page still renders fully readable. **Preserve this if you rewrite the motion layer** —
it is the difference between a graceful degradation and a blank page.

### `whenFontsReady()` — do not remove

`next/font` uses `display: swap`. The first paint uses fallback metrics. SplitText
measures rendered line boxes and ScrollTrigger measures element positions, so both
compute **wrong values** if they run before webfonts land. Every section gates its
setup through `whenFontsReady()`, which awaits `document.fonts.ready` then calls
`ScrollTrigger.refresh()`. This was a real bug that was found and fixed.

### Reduced motion

Every animation lives inside `gsap.matchMedia()` with a
`(prefers-reduced-motion: no-preference)` query. Under `reduce`, the contexts are
simply never created, so no animation exists to disable. Verified: 0 elements
left hidden.

### Per-section motion

| Section | Technique |
|---|---|
| Hero | SplitText masked line reveal; scrubbed fade/lift on scroll out |
| Manual | Two infinite marquee tweens; `ScrollTrigger.onUpdate` reads `self.getVelocity()` and drives `timeScale`, clamped 1–7. Direction flips with scroll direction. Settles back on `onScrubComplete` |
| Meet | SplitText on the greeting; staggered paragraph rise; two-panel converge timeline; opposing scrub parallax on ghost + portrait |
| Builds | **Desktop only** (`min-width: 900px`): pins `.br-frame`, animates `.br-track` on `x` with `ease: "none"` and `scrub`. Mobile gets a plain stacked entrance |
| Close | SplitText reveal; scrubbed glow |

> **Pinning is fragile.** `ease: "none"` is required or scroll position desynchronises
> from horizontal position. The pinned ancestor uses `overflow-x: clip`, not
> `overflow: hidden`, because `overflow: hidden` on an ancestor breaks ScrollTrigger
> pinning. If you change section heights, re-run `node scripts/pin-check.mjs`.

---

## Verification scripts

Run the dev server first, then:

| Script | Purpose | Keep? |
|---|---|---|
| `scripts/baseline.mjs` | Regenerate `docs/baseline/` screenshots | ✅ Keep |
| `scripts/gsap-check.mjs` | Assert SplitText, marquee velocity, parallax, console errors | ✅ Keep |
| `scripts/pin-check.mjs` | Assert the pinned horizontal run travels | ✅ Keep |
| `scripts/review.mjs` | Overflow / reduced-motion / focus audit at both viewports | ✅ Keep |
| `scripts/probe.mjs` | Ad-hoc DOM probe | 🗑️ Safe to delete |
| `scripts/audit.mjs` | Written for a deleted design direction | 🗑️ Safe to delete |
| `scripts/home-shots.mjs` | Written for a deleted design direction | 🗑️ Safe to delete |
| `scripts/shoot.mjs`, `shots.mjs` | Written for a deleted design direction | 🗑️ Safe to delete |
| `scripts/research.mjs`, `research2.mjs`, `research3.mjs` | Captured the reference sites for study | 🗑️ Safe to delete, or keep to re-study references |

They are left in the repo rather than deleted so the next developer can see how the
current state was verified.

---

## Technical debt

1. **Tailwind installed but unused.** Commit to it or remove it.
2. **996-line single CSS file.** Fine at this size, will not scale to five pages.
   Split per section or move to CSS modules before adding routes.
3. **`package.json` name is `nadav-ai-infrastructure`** — a leftover from a rejected
   direction.
4. **No linter, no tests, no CI.**
5. **Dead anchors.** `#consult` and `#contact` have no matching elements on the page.
6. **`tsconfig.tsbuildinfo` was committed to disk** during development; it is now
   gitignored.
7. **Extraneous npm packages** (`@emnapi/runtime`, `@img/sharp-wasm32`) appear in
   `npm ls` as transitive artefacts. Harmless. A clean `rm -rf node_modules && npm i`
   clears them.

---

## What can safely be deleted / rebuilt

**Safe to delete entirely:**
- All of `src/styles/brand.css` — if you rebuild the design, none of it is sacred
- All of `src/components/site/*` — same
- The one-off scripts marked 🗑️ above
- `public/icon.png` — placeholder favicon

**Worth keeping:**
- `src/content/site.ts` — the copy is the most valuable artefact in the repo and the
  closest the project came to an acceptable Hebrew voice. Read `COPY_BRIEF.md` before
  changing it.
- `src/lib/motion.ts` — specifically `whenFontsReady()` and the "no CSS hiding"
  pattern. Both encode real bugs that were found and fixed.
- `docs/baseline/` — the visual record of what was rejected.
- The verification scripts marked ✅.
