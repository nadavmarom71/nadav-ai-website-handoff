"use client";

import { useRef } from "react";
import { hero } from "@/content/site";
import { gsap, revealLines, riseIn, useGSAP, whenFontsReady } from "@/lib/motion";
import { Cta, Kicker, Lines } from "./bits";

/**
 * Type is the image. No photograph, no device mockup: one enormous sentence on a
 * field of cobalt, a breathing light source, and AI ghosted at display scale so
 * the subject is present without being illustrated.
 *
 * Motion has two jobs here. On load, the headline is *set* line by line out of a
 * mask. On scroll, the three layers (ghost, headline, glow) leave at different
 * rates, so the hero reads as depth rather than as a slab moving away.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Everything animated is opt-in: with reduced motion, matchMedia never
      // adds a context and the section renders in its final state.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        whenFontsReady(() => {
        const h1 = root.current?.querySelector<HTMLElement>(".br-h1") ?? null;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".br-hero-glow", {
          scale: 0.82,
          autoAlpha: 0,
          duration: 1.6,
          ease: "power2.out",
        })
          .from(".br-ghost", { autoAlpha: 0, duration: 1.4 }, 0.15)
          .from(".br-kicker", { y: 14, autoAlpha: 0, duration: 0.7 }, 0.2);

        revealLines(h1, { delay: 0.3, stagger: 0.09 });

        riseIn([".br-hero-body", ".br-hero-acts", ".br-scroll"], {
          delay: 1.05,
          stagger: 0.12,
        });

        // Depth on exit: three layers, three rates.
        const out = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        out
          .to(h1, { yPercent: -14, autoAlpha: 0.15, ease: "none" }, 0)
          .to(".br-ghost", { yPercent: -46, ease: "none" }, 0)
          .to(".br-hero-glow", { yPercent: 26, scale: 1.12, ease: "none" }, 0)
          .to(
            [".br-hero-body", ".br-hero-acts"],
            { yPercent: -8, autoAlpha: 0, ease: "none" },
            0,
          );

        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="br-hero" ref={root}>
      <span className="br-hero-glow" aria-hidden="true" />
      <span className="br-ghost" aria-hidden="true">
        {hero.ghost}
      </span>

      <div className="br-wrap br-hero-grid">
        <div className="br-hero-main">
          <Kicker>{hero.kicker}</Kicker>
          <Lines lines={hero.lines} blueIndex={2} className="br-h1" as="h1" />
        </div>

        {/* Support column sits opposite the headline, creating the diagonal
            that keeps the desktop canvas from going dead on one side. */}
        <div className="br-hero-side">
          <p className="br-lede br-hero-body">{hero.sub}</p>

          <div className="br-hero-acts">
            <Cta>{hero.cta}</Cta>
            <a className="br-quiet" href="#consult">
              {hero.ctaSub}
            </a>
          </div>

          <div className="br-scroll">
            <span className="br-scroll-line" aria-hidden="true" />
            {hero.scroll}
          </div>
        </div>
      </div>
    </section>
  );
}
