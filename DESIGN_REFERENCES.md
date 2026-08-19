# DESIGN REFERENCES

The quality bar. **Browse these as real websites** — on a phone, scrolling them,
watching the motion. Do not judge them from a screenshot or a DOM dump. Most of what
matters here is in the transitions.

---

## The split

| Reference | What it is a reference *for* |
|---|---|
| **Adir Sellam** | Copy and messaging. **Not** visual |
| **Shir Uziel + her project work** | Visual storytelling, motion, art direction. **Primary visual bar** |
| **Enigma** | Interactive presentation, visual explanation, dynamic solution presentation |
| **Liat Zelig** | Softer composition, larger typography, imagery, rounded visual language |
| **Emerald, Uzralex** | Polished custom art direction rather than generic web sections |

---

## Copy reference

### `https://www.adirsellam.com/`

**Copy / messaging only.** His visual design is explicitly *not* the bar — his site
is warm cream paper, sticker buttons, hand-drawn doodles and macOS traffic-light
window chrome. Do not emulate any of that.

Full analysis of his copy mechanisms is in **`COPY_BRIEF.md`**. Short version: he
makes the reader feel he knows their actual life, using real situations, real tools
and real objections.

---

## Primary visual references

### `https://shiruziel.com/`
### `https://shiruziel.com/projects/`

**The main quality bar.** Nadav explicitly said the next attempt may stay *very close*
to the level, structure and creative approach of this work — reaching the quality bar
matters more than originality right now.

Observed on mobile:

- full-bleed **colour environments**, not white boxes with content inside them
- **typography as the image** — huge Hebrew display type carrying the composition
- **floating pill navigation** docked to the bottom on mobile, which makes the site
  feel like an app in the hand rather than a web page
- ambient depth: soft 3D objects drifting in gradient space
- conversational Hebrew headings (`בתכל'ס, למה אני צריך את זה?`)
- section-to-section transitions that feel authored, not stacked

**Do not copy** her logo, text, photography or brand assets. Emulate the art
direction, composition logic, section behaviour, typography scale, visual
storytelling and motion language.

### `https://enigma.jetdomains.co.il/`

**Most relevant to Nadav's actual category** (automation / AI for businesses), and
the best reference for **interactive and dynamic solution presentation** — how to let
a visitor switch between solution areas and see the explanation change live, instead
of dumping six feature cards.

Also notable:

- **oversized outline numerals** with gradient strokes used as the visual object —
  the number *is* the image, not a label inside a box
- floating gradient pill header
- generous vertical space per idea

### `https://liatzelig.com/course/`

For **softer premium composition**: larger typography, more imagery, rounded visual
language, richer storytelling.

Notable devices:

- **giant ghosted outline numerals sitting behind** soft rounded panels
- the customer's literal sentence used as a headline, in quotes
  (`'אני יודעת לעצב אבל לא יודעת לנהל עסק'`) — the same mechanism Adir uses for
  objections, applied visually
- warm neutral palette, barely-tinted grounds, soft rounded cards
- pill CTA with a directional arrow

### `https://emeraldltd.co.il/`
### `https://uzralex.co.il/`

Examples of **polished custom art direction** rather than generic web sections.
Useful for seeing what "this was designed for this client specifically" looks like,
as opposed to a theme with content poured into it.

---

## Colour

Nadav's stated preference:

```
#026FD7
```

He is open to a **slightly deeper / more authoritative variation** in the same family
if it produces a stronger identity.

Constraints he gave:

- do **not** make the whole brand "blue everywhere" — use it with hierarchy and
  restraint
- target feeling: **modern, confident, clean, technological, slightly authoritative**
- avoid: boring corporate navy, childish bright startup blue, generic SaaS blue

The current implementation builds a deep cobalt night around it plus one bone-coloured
daylight section and brass as the only warm accent. The palette is documented in
`TECHNICAL_AUDIT.md`. It is **not approved** — treat it as one interpretation.

---

## Anti-references

Avoid **AI-industry visual clichés**:

- gradient-tech pages
- glowing blobs
- "AI brain" imagery
- arbitrary glass cards
- neural-network graphics

Also avoid the three current AI-default looks, which appear regardless of subject:

1. warm cream background + high-contrast serif + terracotta accent
2. near-black background + a single acid-green or vermilion accent
3. broadsheet layout with hairline rules, zero border-radius, dense columns

Do not limit research to "AI agency" websites. Premium landing pages, creative
studio sites and high-quality Envato references are all fair game for reaching the
bar.

---

## The one thing from the current build that Nadav liked

Worth carrying forward, though not required:

- **rounded section / container transitions**
- one rounded surface visually **overlapping** another
- visible changes between **darker and lighter section backgrounds**

He said this gave the page depth and a less rigid feeling.

---

## What "good" means here

Nadav's stated test, verbatim in substance:

> I want to open the website and think: **"Someone actually designed this."**
> Not: *"This is pretty good for AI."*

And the failure mode to avoid:

> headline / paragraph / button / box / headline / paragraph / box — with a nice
> theme on top.
