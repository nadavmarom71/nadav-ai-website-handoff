"use client";

import { useRef } from "react";
import { builds } from "@/content/site";
import { gsap, revealLines, riseIn, useGSAP, whenFontsReady } from "@/lib/motion";
import { Kicker, Lines } from "./bits";

/**
 * This was a plain numbered list, which was the least designed thing on the page.
 *
 * It is now a horizontal run: on desktop the section pins and the four panels
 * travel sideways as you scroll down, so the reader moves through the range of
 * work rather than scrolling past a list of it. The vertical scroll becomes the
 * horizontal read, which is the one place on this page where the scroll itself
 * is the mechanism.
 *
 * On a phone it stays a vertical stack. Hijacking a thumb sideways is hostile,
 * and the panels already read well stacked.
 */
export function Builds() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        whenFontsReady(() => {
          revealLines(root.current?.querySelector<HTMLElement>(".br-h2") ?? null, {
            trigger: root.current,
          });
          riseIn(".br-builds-sub", { trigger: root.current });
        });
      });

      // Horizontal run: desktop only, and only when motion is welcome.
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          whenFontsReady(() => {
            const frame = root.current?.querySelector<HTMLElement>(".br-frame");
            const track = root.current?.querySelector<HTMLElement>(".br-track");
            if (!frame || !track) return;

            const distance = () => Math.max(0, track.scrollWidth - frame.clientWidth);

            // ease "none" is required: anything else desynchronises scroll
            // position from horizontal position.
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                // Pin the frame, animate the track inside it.
                pin: true,
                start: "center center",
                end: () => "+=" + distance(),
                scrub: 0.6,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            // Each numeral drifts against its own panel while it crosses.
            gsap.utils.toArray<HTMLElement>(".br-panel", root.current).forEach((p) => {
              gsap.fromTo(
                p.querySelector(".br-num"),
                { yPercent: 10 },
                {
                  yPercent: -10,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame,
                    start: "center center",
                    end: () => "+=" + distance(),
                    scrub: 0.8,
                  },
                },
              );
            });
          });
        },
      );

      // Stacked entrance for phones.
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        whenFontsReady(() => {
          gsap.utils.toArray<HTMLElement>(".br-panel", root.current).forEach((p) => {
            gsap.from(p, {
              y: 36,
              autoAlpha: 0,
              duration: 0.95,
              ease: "expo.out",
              scrollTrigger: { trigger: p, start: "top 88%", once: true },
            });
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="br-builds" ref={root} id="builds">
      <span className="br-ghost" aria-hidden="true">
        {builds.ghost}
      </span>

      <div className="br-wrap">
        <Kicker>{builds.kicker}</Kicker>
        <Lines lines={builds.lines} blueIndex={1} className="br-h2" />
        <p className="br-lede br-builds-sub">{builds.sub}</p>
      </div>

      <div className="br-frame">
        <div className="br-track">
          {builds.items.map((item) => (
            <article className="br-panel br-bevel" key={item.n}>
              <span className="br-num" aria-hidden="true">
                {item.n}
              </span>
              <h3 className="br-item-t">{item.title}</h3>
              <p className="br-item-b">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
