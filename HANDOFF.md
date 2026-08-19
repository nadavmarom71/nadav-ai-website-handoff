# HANDOFF — Nadav AI website

Prepared for a new developer / AI environment taking over this project.

Read this file first, then `CURRENT_STATE.md` (what is real vs placeholder), then
`TECHNICAL_AUDIT.md` (how to run it).

**The single most important thing to know:** the client is **not satisfied** with
the current design direction. See [CURRENT DESIGN FEEDBACK](#current-design-feedback).
The code in this repo is a **working baseline to replace, not a design to polish.**

---

## 1. Business context

**Nadav** builds AI solutions and custom systems for businesses. The work ranges
across:

- AI agents (lead handling, qualification, follow-up)
- sales processes and sales systems
- automations connecting WhatsApp, CRM, email, forms, calendars, databases
- internal tools and dashboards
- custom business systems and client portals
- custom applications, including mobile
- complete software products

He also comes from a **marketing background**: landing pages, funnels, copywriting,
conversion and sales thinking. He combines that commercial understanding with the
technical implementation. This combination is a genuine differentiator and the site
should communicate it, but through how the work is presented rather than as a
claim in a headline.

### Prior product experience (real, usable as proof once he approves specifics)

- transcription systems
- **"תמלל לי"** — transcription product for long recordings (sales calls, meetings,
  1hr+ files), with speaker identification and downstream analysis
- **"תדביק לי"** — desktop application built around transcription and content work
- a **custom CRM built for Lidor** — designed around one specific workflow instead
  of forcing the business into a generic CRM
- management / client systems (admin, employees, clients, tasks, dashboards)
- mobile application work
- AI sales systems

> ⚠️ **None of this is currently on the site.** Nadav has not yet approved what may
> be said publicly about these projects. Do not publish details, client names,
> screenshots or results without asking him. See `CURRENT_STATE.md`.

### Positioning constraint

Position him as **highly professional at AI implementation**. Do **not** let the site
read as "a freelancer who offers everything." The breadth is proof of capability,
not the pitch. Earlier drafts failed by turning the range into a service menu.

---

## 2. Planned website areas

| Area | Status |
|---|---|
| **Homepage** | Implemented (single route `/`) |
| **AI Solutions** | Planned only — not built |
| **Consultation / שעת ייעוץ** | Planned only — currently just an anchor link and one card on the homepage |
| **Free Guides / Resources** | Planned only — not built |
| **Work / Projects** | Planned, optional — not built |

Only the homepage exists. Every nav link points to an on-page anchor; there is no
routing beyond `/`.

Open commercial questions Nadav has **not** answered, which block the consultation
page: price, call length, and what is actually delivered (recording? written plan?
follow-up window?). Do not invent these.

---

## 3. CURRENT DESIGN FEEDBACK

**Nadav is not satisfied with the current design direction.** Recorded verbatim in
substance so the next developer does not repeat the same failures.

Problems he identified:

- it still feels **AI-generated**
- too much content reads as **stacked blocks**
- too much **square / rigid composition**
- **insufficient visual storytelling**
- **insufficient imagery**
- **insufficient graphics**
- **insufficient meaningful infographics**
- **insufficient composition variety**
- does not feel like a **premium custom landing-page experience**
- **animations and scroll storytelling are not at the desired level**
- **some fake UI / business examples were invented purely to fill visual space**
  (earlier iterations contained mock WhatsApp threads and mock dashboards; these
  were removed, but treat the pattern as forbidden)
- **copy still feels too generic**, too much like marketing/AI copy
- **does not reach the visual quality of the reference websites**

### The one thing he did like

- **rounded section / container transitions**
- one rounded surface visually **overlapping** another
- visible changes between **darker and lighter section backgrounds**
- this gave the page **depth** and a less rigid feeling

> This is feedback, not a requirement. The next developer is **not** obliged to
> preserve the current design. Nothing in `src/` should be treated as approved.

### History of rejected directions

Three full creative directions preceded this one and were rejected. They are not in
this repo (deliberately deleted). Summary so the same ground is not re-covered:

1. **Three parallel design systems** (record-keeping / engineering-drawing /
   work-correspondence), evaluated side by side. Rejected: they were "the same
   wireframe with different visual themes," and the positioning was too broad.
2. **A blue mobile-first homepage** with an interactive scenario switcher.
   Rejected: repeated blocks, weak copy, fake WhatsApp UI used as filler.
3. **The current cobalt/bone/brass direction** with GSAP. Rejected for the reasons
   listed above, though the rounded overlapping section transitions were liked.

---

## 4. What exists today

One route, five sections, all in Hebrew RTL:

| # | Section | Component | Idea |
|---|---|---|---|
| 1 | Hero | `Hero.tsx` | Enormous Hebrew display type as the primary image |
| 2 | Manual work | `Manual.tsx` | Two marquee bands of real manual tasks, speed tied to scroll velocity |
| 3 | Meet Nadav | `Meet.tsx` | Bone-coloured daylight section; "two worlds" device (marketing ∪ engineering) |
| 4 | What I build | `Builds.tsx` | Four panels; on desktop the section pins and they run horizontally |
| 5 | Close | `Close.tsx` | Centred question and one CTA |

Design tokens, devices and layout live in one file: `src/styles/brand.css` (996 lines).
All copy lives in one file: `src/content/site.ts`.

---

## 5. Where to start if you are rebuilding

1. Read `CURRENT_STATE.md` — know what is placeholder before you trust anything.
2. Read `COPY_BRIEF.md` — the Hebrew voice requirements are strict and the client
   has rejected copy three times. This is the highest-risk part of the project.
3. Read `DESIGN_REFERENCES.md` — and actually browse the reference sites on a phone,
   scrolling them, not just screenshotting them.
4. Look at `docs/baseline/` — committed screenshots of exactly what this code renders
   today, desktop and mobile.
5. `src/content/site.ts` is worth keeping as a starting point even if you throw away
   all the CSS. It was the closest the project got to an acceptable Hebrew voice.

### Assets still needed from Nadav

| Blocker | Needed for |
|---|---|
| Real portrait photograph | The "Meet" section is built around an empty slot |
| Surname | Wordmark is currently just `נדב` — a surname was never provided and was deliberately not invented |
| Approval on project details | Any proof / case-study / Work page |
| Consultation price, length, deliverables | The consultation page |
| Which integrations he has actually built | Any diagram or list naming real tools |

There are **no testimonials, client names, metrics, ROI figures or years-of-experience
claims** anywhere in this codebase. None were invented. Keep it that way until Nadav
supplies real ones.
