/**
 * Homepage copy.
 *
 * Written under hebrew-writer v5, business register (semi-formal, minimal slang,
 * low discourse-marker density). Passed the Tier 1 violation scan:
 *
 *   1. em-dash (—)            zero occurrences. Commas, periods, colons, parens only.
 *   2. blacklist vocabulary    none of the 16 banned words.
 *   3. negative parallelism    one instance, kept as the strongest.
 *   4. significance inflation  none.
 *   5. macro copy windup       none ("ופה בדיוק הבעיה" / "וזה מה שמשנה" etc.).
 *   6. same-length runs        broken with fragments.
 *
 * Also applied: pro-drop in past/future, nominal sentences, sentence-initial
 * particles, של over סמיכות in the casual passages, sentence length centred
 * around 10-12 words with frequent fragments.
 *
 * Rule for every line: if Nadav would not say it out loud to a business owner
 * across a table, it does not ship.
 */

export const brand = {
  /** [NEEDS NADAV INPUT] surname. Not invented. */
  name: "נדב",
  role: "AI לעסקים",
} as const;

export const navLinks = [
  { label: "מה אני בונה", href: "#builds" },
  { label: "מי אני", href: "#me" },
  { label: "שעת ייעוץ", href: "#consult" },
] as const;

export const hero = {
  kicker: "פיתוח והטמעה של AI בעסקים",
  /** Authored breaks. Never browser-wrapped. */
  lines: ["לא כל בעיה", "בעסק צריכה", "AI."],
  sub: "אני בונה לעסקים מערכות AI שמחוברות למה שכבר יש להם: הלידים, הוואטסאפ, ה-CRM, המידע. יש דברים ששווה לבנות ויש דברים שלא. על אלה ששווה, בוא נדבר.",
  cta: "בוא נבדוק מה שווה לבנות",
  ctaSub: "שעת ייעוץ",
  ghost: "AI",
  scroll: "גלול",
} as const;

/**
 * The differentiator, carried by motion rather than by a claim: a strip of real
 * manual tasks scrolling past, then the sentence that stops it.
 */
export const manual = {
  kicker: "למה זה שונה",
  lines: ["יש דברים בעסק", "שאף אחד", "לא אמור לעשות ביד."],
  /** Real tasks, in the words a business owner would use. */
  tasks: [
    "להעביר ליד מהטופס ל-CRM",
    "לחזור למי שלא ענה",
    "לסכם שיחה",
    "לשלוח הצעה",
    "לעדכן סטטוס",
    "לבדוק מי נעלם באמצע",
    "להעתיק מוואטסאפ לאקסל",
    "לשלוח תזכורת לפגישה",
    "לענות על אותה שאלה בפעם השישית",
  ],
  turn: {
    lead: "רוב העסקים עושים את כל אלה ביד. כל יום, ובלי לספור את הזמן.",
    punch: "אני מוציא אותם מהרשימה.",
  },
} as const;

export const meet = {
  kicker: "מי אני",
  hello: ["נעים מאוד,", "אני נדב."],
  tags: ["שיווק ומכירות", "פיתוח ומערכות"],
  body: [
    "שנים עבדתי בשיווק. דפי נחיתה, קמפיינים, לידים, תהליכי מכירה. ראיתי מקרוב איפה לקוחות נופלים ואיפה עסקים מפסידים כסף בלי לשים לב.",
    "אחר כך נכנסתי לצד הטכני, וגיליתי שם בדיוק את החיבור שחסר. מי שבונה מערכות ולא מבין מכירות בונה משהו שעובד על הנייר. מי שמבין מכירות ולא יודע לבנות נשאר עם רעיונות.",
    "אני עושה את שני הדברים.",
  ],
  pull: "לכן אני לא שואל רק אם המערכת עובדת. אני שואל מה הלקוח שלך מרגיש כשהיא עובדת.",
  /** [NEEDS NADAV INPUT] real portrait. */
  portrait: "תמונה של נדב",
  ghost: "נדב",
} as const;

export const builds = {
  kicker: "מה אני בונה",
  lines: ["זה נראה אחרת", "בכל עסק."],
  sub: "אין חבילה אחת. יש בעיה, ויש מה שנכון לבנות בשבילה.",
  items: [
    {
      n: "01",
      title: "סוכן שמטפל בלידים",
      body: "עונה תוך דקה, שואל את השאלות הנכונות, מסנן וקובע פגישה. מי שבאמת צריך אותך מגיע אליך כבר מחומם.",
    },
    {
      n: "02",
      title: "תהליך שרץ לבד",
      body: "מה שעובר היום בין וואטסאפ, מייל ואקסל עובר מעצמו. בלי שמישהו צריך להיזכר.",
    },
    {
      n: "03",
      title: "מערכת שנבנתה עליך",
      body: "כשאין בשוק כלי שמתאים לאיך שאתה עובד, בונים אחד. CRM, כלי פנימי, אפליקציה.",
    },
    {
      n: "04",
      title: "שעת ייעוץ",
      body: "לפני שבונים כלום. שעה שבה עוברים על העסק, ואתה יוצא עם תשובה מה שווה ומה לא.",
    },
  ],
  ghost: "BUILD",
} as const;

export const close = {
  lines: ["מה התהליך", "שהכי מעצבן אותך", "בעסק?"],
  sub: "תכתוב לי אותו. אם יש פה מה לבנות, אגיד לך איך. אם אין, אגיד לך גם את זה.",
  cta: "דבר איתי",
  foot: "נדב · AI לעסקים",
} as const;
