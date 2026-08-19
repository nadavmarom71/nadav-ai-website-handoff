import { Assistant, Heebo, IBM_Plex_Mono } from "next/font/google";
import "@/styles/brand.css";
import { Progress } from "@/components/site/bits";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Manual } from "@/components/site/Manual";
import { Meet } from "@/components/site/Meet";
import { Builds } from "@/components/site/Builds";
import { Close } from "@/components/site/Close";

/**
 * Heebo 900 (Oded Ezer) is the whole identity. At 60px on a phone and 138px on a
 * desktop, with -0.045em tracking, its Hebrew letterforms go tight and
 * architectural. Below ~40px it reads as a UI font, which is exactly the trap
 * the earlier attempts fell into.
 */
const display = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["800", "900"],
  variable: "--font-display",
  display: "swap",
});

/** Warm, wide-aperture Hebrew sans. Set at 19-20px on desktop, matching the
 *  body scale the reference sites use, which is far larger than a default 16px. */
const body = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "נדב · AI לעסקים",
  description:
    "בונה לעסקים מערכות AI שמחוברות ללידים, לוואטסאפ ול-CRM שכבר יש להם. יש דברים ששווה לבנות ויש דברים שלא.",
};

export default function Page() {
  return (
    <main className={`br ${display.variable} ${body.variable} ${mono.variable}`}>
      <Progress />
      <Nav />
      <Hero />
      <Manual />
      <Meet />
      <Builds />
      <Close />
    </main>
  );
}
