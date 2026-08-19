# CURRENT STATE

What is genuinely implemented, what is placeholder, and what must not be assumed
approved. Read alongside `HANDOFF.md`.

---

## Implemented and working

| Item | Detail |
|---|---|
| Homepage `/` | Five sections, Hebrew RTL, statically prerendered |
| Production build | Passes. `npm run build` succeeds, 3 static pages |
| Typecheck | Passes. `tsc --noEmit` → 0 errors |
| Responsive | No horizontal overflow at 390px or 1440px (measured) |
| Reduced motion | 0 elements left hidden under `prefers-reduced-motion: reduce` (measured) |
| Keyboard focus | Visible focus ring on interactive elements (measured) |
| RTL / bidi | Latin runs (`CRM`, `AI`, `n8n`) isolated so they do not reorder |
| Fonts | Heebo 800/900, Assistant 400/600/700, IBM Plex Mono 400/500 via `next/font` |
| Console | Zero errors on load (measured) |
| GSAP motion | SplitText line reveals, velocity-driven marquee, scrub parallax, pinned horizontal run |

### Motion verified by measurement, not assumption

`scripts/gsap-check.mjs` and `scripts/pin-check.mjs` assert this and can be re-run:

- SplitText produces 13 masked lines; the hero keeps its 3 authored line breaks
- Marquee responds to scroll velocity: ~50px travel when scrolling slowly vs ~106px
  when flicking, a ~2.1× speed-up
- Parallax layers move in opposite directions (ghost −15px, portrait +26px)
- Pinned horizontal run: 4 panels, track travels 0 → −646px, no page errors

---

## Placeholder / not real

| Item | State | Consequence |
|---|---|---|
| **Portrait image** | Empty slot with a diamond outline and the caption `תמונה של נדב` | The Meet section is built around an image that does not exist. Drop a real photo into `.br-portrait-inner` (commented `<img>` is already in `Meet.tsx`) |
| **Surname** | Not present. Wordmark is `נדב` alone | Deliberately not invented. Nadav never supplied one |
| **All CTAs** | `href="#contact"` / `#consult` anchors | No form, no mailto, no WhatsApp link, no booking system. Nothing submits anywhere |
| **Nav links** | On-page anchors only | `שעת ייעוץ` points at an anchor, not a page |
| **Favicon** | 32×32 brass diamond generated programmatically at `public/icon.png` | Placeholder mark, not a designed logo |
| **`package.json` name** | `nadav-ai-infrastructure` | Leftover from a rejected direction. Rename freely |

---

## Explicitly NOT approved

Treat all of the following as unapproved:

- **The entire visual design.** See `HANDOFF.md` § CURRENT DESIGN FEEDBACK. The
  client rejected this direction.
- **All homepage copy** in `src/content/site.ts`. It is the best draft the project
  produced and is a reasonable starting point, but Nadav has not signed off on it
  and has rejected three prior copy drafts as too generic.
- **The five-section structure.** Chosen by the previous developer, never approved.
- **Colour palette.** `#026FD7` is Nadav's stated preference and the palette is built
  around it, but the specific cobalt/bone/brass system is not approved.
- **Typography.** Heebo 900 at display scale was a judgement call.

---

## Fake / demo content

**There is none currently, and this is deliberate.**

Earlier iterations contained invented WhatsApp conversations, mock CRM rows and
fake dashboards used to fill visual space. Nadav explicitly rejected this. All of it
was removed.

The one thing that could be mistaken for demo content is the task list in
`src/content/site.ts` → `manual.tasks` (`"להעביר ליד מהטופס ל-CRM"`,
`"לחזור למי שלא ענה"`, …). These are **not** fake UI. They are plain sentences
describing manual work a business owner does, rendered as scrolling text bands.
They are illustrative, not claimed as any specific client's data.

**Nothing invented anywhere:** no clients, no testimonials, no numbers, no revenue,
no conversion rates, no ROI, no case-study results, no years of experience, no
credentials. If you need proof content, get it from Nadav.

---

## Unfinished

- Only 1 of 5 planned site areas exists (homepage). No AI Solutions, Consultation,
  Resources or Work pages.
- No contact mechanism of any kind.
- No analytics, no SEO beyond a title and description, no Open Graph image, no
  sitemap, no `robots.txt`.
- No tests.
- No linter configured.
- No CI.
- No deployment. Never been deployed anywhere.

---

## Known issues

| Issue | Severity | Notes |
|---|---|---|
| Design direction rejected by client | **Blocker** | The reason this handoff exists |
| No real imagery anywhere | High | Directly causes the "insufficient imagery" feedback |
| Desktop `Builds` section pins and scrolls horizontally | Medium | Works, but pinning is easy to break — if you change section heights, re-run `scripts/pin-check.mjs` |
| `scripts/` contains one-off research tools | Low | Several were written to study reference sites and are no longer needed. See `TECHNICAL_AUDIT.md` for which are safe to delete |
| `package.json` name is stale | Low | Cosmetic |
