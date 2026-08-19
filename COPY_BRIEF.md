# COPY BRIEF

**This is the highest-risk part of the project.** Copy has been rejected three
times as "too generic" and "sounds like AI wrote it." Read this before touching a
single Hebrew sentence.

---

## The voice

Nadav wants Hebrew that sounds:

- **human**
- **conversational**
- **confident**
- **professional**
- **specific**
- **grounded in situations that really happen to business owners**

The test for any sentence: *would Nadav say this out loud to a business owner
across a table?* If not, rewrite it.

---

## Banned

- generic AI slogans
- vague transformation language
- buzzwords
- clever lines that need decoding
- **fake customer pain** (invented frustrations nobody actually has)
- generic "streamline / transform / unlock" language
- `לשחרר את הפוטנציאל`, `לייעל תהליכים`, `לשדרג את העסק לעידן ה-AI`
- `מהפכת ה-AI כבר כאן` and any deadline threat / fear framing
- LinkedIn thought-leadership register
- self-titling (`מומחה AI`, `מאסטר AI`)

### Rejected examples from this project

Real lines that were written and rejected. They read as branding exercises, not
speech:

> ✗ `ה-AI שלכם לא מחובר לכלום. אז אתם המחבר.`
> ✗ `אני בונה את השכבה שחסרה.`
> ✗ repeated use of `תשתית AI` as a category claim

The failure mode is always the same: a strategist's framing device dressed up as a
sentence.

---

## Never invent proof

No clients, testimonials, numbers, revenue, conversion rates, ROI, case-study
results, guarantees, years of experience or credentials — unless Nadav supplies
them. The current codebase contains **zero** invented proof. Keep it that way.

Where something is missing, mark it `[NEEDS NADAV INPUT]` rather than filling it in.

---

## Primary reference: Adir Sellam

`https://www.adirsellam.com/`

**Do not copy his paragraphs.** The lesson is his *ability*, not his text:

- explains complicated AI ideas simply
- speaks like a human
- mentions real situations
- mentions real tools and real behaviour
- makes the reader feel he understands their world
- uses **specific objections and real-life frustrations** instead of generic pain

### The mechanisms worth learning

**1. The recognition ladder.** He opens with four statements, numbered 01–04, each
readable in under two seconds:

> `01 אתם יודעים שצריך AI בעסק.`
> `02 פשוט לא היה זמן להיכנס לזה.`
> `03 יש עוד מיליון דברים על השולחן.`
> `04 אתם עדיין על ChatGPT, זאפייר או n8n.`

01–03 are nearly impossible to disagree with. By 04 — which names the tools actually
on the reader's screen — they have already agreed three times. The reader supplies
the conclusion themselves.

**2. Tool names as proof of a shared world.** The single most effective line on his
site is inside an objection rebuttal: `בדיבוג של n8n ב-2 בלילה`. It is 2am, it is
n8n, it is debugging. Nobody who has not done it writes that sentence. **One clause
does more credibility work than any credentials paragraph.** This is the mechanism to
match.

**3. Objection quoted, not paraphrased.** The objection *is* the headline, in the
reader's own voice: `"אני יכול לעשות את זה לבד."` The answer concedes first — `אולי.`
— then answers as a practitioner describing cost in hours.

**4. Show the day, not the feature.** `אתם קמים בבוקר והכל כבר קרה.` Then six
*states*, not features, each written as accomplished fact.

**5. Disqualification as trust.** `מתאים לכם אם...` against `אל תקבעו אם...`, framed
by `אני מאמין יותר בלהגיד לא בזמן מאשר לקחת תשלום על שיחה שלא תיתן ערך.` Turning
business away is the strongest signal of optimising for fit.

### Where his positioning stops and Nadav's starts

Adir's stated audience is `אנשים שלא מבינים בתכנות`. Nadav's reader is the opposite:
already paying for ChatGPT, has tried an automation, maybe has someone doing Make for
them. That reader does not need AI explained. That gap is the opportunity.

---

## Hebrew writing rules applied to the current draft

The existing copy in `src/content/site.ts` was written under the `hebrew-writer`
skill, business register. Rules that were enforced and should stay enforced:

| Rule | Detail |
|---|---|
| **No em-dashes (`—`)** | Tier 1 violation. Use commas, periods, colons, parentheses. Currently **zero** in the codebase |
| **Blacklist vocabulary** | `מגוון`, `מרתק`, `חיוני`, `מהותי`, `ייחודי`, `מקיף`, `חדשני`, `פורץ דרך`, `חסר תקדים`, `משמעותי`, `רלוונטי`, `מאתגר` and similar. Currently **zero** hits |
| **Negative parallelism** | `לא X, אלא Y` — at most one instance per page |
| **Significance inflation** | Never tell the reader something matters. Show it |
| **Macro copy windup** | No `ופה בדיוק הבעיה`, `וזה מה שמשנה` |
| **Same-length runs** | Break with fragments. Sentence length centred on 10–12 words |
| **Pro-drop** | Drop pronouns in past/future where natural Hebrew does |
| **`של` over סמיכות** | In casual passages |

To re-scan:

```bash
grep -rn '"[^"]*—[^"]*"' src --include=*.ts --include=*.tsx
grep -rEo "מגוון|מרתק|חיוני|מהותי|ייחודי|מקיף|חדשני|פורץ דרך|חסר תקדים|משמעותי|רלוונטי|מאתגר" src
```

Both currently return nothing.

---

## The current draft

All copy is in **`src/content/site.ts`**, one file. It is **not approved**, but it is
the closest the project came to an acceptable voice and is a reasonable base.

The strongest thing in it is `manual.tasks` — nine plain sentences naming manual work
in the words a business owner would actually use:

> `להעביר ליד מהטופס ל-CRM` · `לחזור למי שלא ענה` · `לסכם שיחה` ·
> `להעתיק מוואטסאפ לאקסל` · `לענות על אותה שאלה בפעם השישית`

That last one is the closest this project got to Adir's `2am debugging n8n` quality.
Aim for more sentences like it.

### What the copy must make a visitor understand

Without over-explaining, a visitor should naturally grasp:

- who Nadav is
- roughly what he does
- why his AI work differs from bolting on another random tool or automation
- why he seems like someone who actually understands this field

---

## Language and direction

The site is **Hebrew only, RTL**. Confirmed by Nadav. No i18n, no English page.

Latin runs inside Hebrew (`CRM`, `AI`, `ChatGPT`, `n8n`, `18:42`) must be wrapped so
bidi does not reorder them against neighbouring punctuation. The current code does
this; preserve the pattern if you rewrite.
