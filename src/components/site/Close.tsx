"use client";

import { useRef } from "react";
import { close } from "@/content/site";
import { gsap, revealLines, riseIn, useGSAP, whenFontsReady } from "@/lib/motion";
import { Cta, Lines } from "./bits";

/** Centred, quiet, one question. The glow rises to meet the reader on scrub. */
export function Close() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        whenFontsReady(() => {
        const h = root.current?.querySelector<HTMLElement>(".br-h3") ?? null;
        revealLines(h, { trigger: root.current, stagger: 0.09 });
        riseIn([".br-close-sub", ".br-close-act"], {
          trigger: root.current,
          stagger: 0.12,
        });

        gsap.fromTo(
          ".br-close-glow",
          { yPercent: 26, scale: 0.9 },
          {
            yPercent: -6,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          },
        );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="br-close" ref={root} id="contact">
      <span className="br-close-glow" aria-hidden="true" />

      <div className="br-wrap">
        <Lines lines={close.lines} blueIndex={2} className="br-h3" as="h2" />
        <p className="br-lede br-close-sub">{close.sub}</p>
        <div className="br-close-act">
          <Cta>{close.cta}</Cta>
        </div>
        <p className="br-foot">{close.foot}</p>
      </div>
    </section>
  );
}
