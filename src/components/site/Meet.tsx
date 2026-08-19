"use client";

import { useRef } from "react";
import { meet } from "@/content/site";
import { gsap, revealLines, riseIn, useGSAP, whenFontsReady } from "@/lib/motion";
import { Kicker } from "./bits";

/**
 * The page becomes a person.
 *
 * The previous version handed half the desktop canvas to an empty portrait slot,
 * so the section could not stand up until a photograph existed. It now leads with
 * type and its own visual argument, and the portrait is a slim vertical band that
 * reads as a colour column when empty and as a portrait when filled.
 *
 * The visual moment is the two-worlds device: marketing and engineering arrive
 * from opposite edges and overlap, with the seam lit in brass. That is the claim
 * this section makes, made visible, and it needs no asset.
 *
 * [NEEDS NADAV INPUT] real portrait for .br-portrait-inner.
 */
export function Meet() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        whenFontsReady(() => {
          const q = <T extends Element>(s: string) =>
            root.current?.querySelector<T>(s) ?? null;

          revealLines(q(".br-hello"), { trigger: root.current, stagger: 0.1 });

          // Paragraphs stagger as blocks. Masking them by "line" collapsed each
          // paragraph to a single line, which slid whole blocks around.
          riseIn(".br-meet-body p", { trigger: root.current, stagger: 0.11 });
          riseIn(".br-pull", { trigger: root.current });

          gsap.from(".br-portrait", {
            yPercent: 10,
            scale: 1.05,
            autoAlpha: 0,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
          });

          // The two worlds converge. Motion carries the argument.
          const worlds = gsap.timeline({
            scrollTrigger: { trigger: ".br-worlds", start: "top 85%", once: true },
          });

          worlds
            .from(".br-world[data-side='a']", {
              xPercent: 34,
              autoAlpha: 0,
              duration: 1,
              ease: "expo.out",
            })
            .from(
              ".br-world[data-side='b']",
              { xPercent: -34, autoAlpha: 0, duration: 1, ease: "expo.out" },
              0,
            )
            .from(".br-seam", { scaleY: 0, duration: 0.6, ease: "power2.out" }, 0.55);

          // Layered parallax: the ghosted name and the portrait move opposite.
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            })
            .fromTo(".br-ghost", { yPercent: 16 }, { yPercent: -16, ease: "none" }, 0)
            .fromTo(
              ".br-portrait-inner",
              { yPercent: -7 },
              { yPercent: 7, ease: "none" },
              0,
            );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="br-meet" ref={root} id="me">
      <span className="br-ghost" aria-hidden="true">
        {meet.ghost}
      </span>

      <div className="br-wrap">
        <Kicker>{meet.kicker}</Kicker>

        <div className="br-meet-grid">
          <div className="br-portrait br-bevel">
            <div className="br-portrait-inner">
              {/* <img src="/nadav.jpg" alt="נדב" /> */}
              <div className="br-portrait-slot">
                <i aria-hidden="true" />
                <span>{meet.portrait}</span>
              </div>
            </div>
          </div>

          <div className="br-meet-col">
            <h2 className="br-d br-hello">
              {meet.hello.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>

            <div className="br-meet-body">
              {meet.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* The two worlds, overlapping. The seam is the point. */}
        <div className="br-worlds">
          <div className="br-world br-bevel" data-side="a">
            {meet.tags[0]}
          </div>
          <span className="br-seam" aria-hidden="true" />
          <div className="br-world br-bevel" data-side="b">
            {meet.tags[1]}
          </div>
        </div>

        <p className="br-pull">{meet.pull}</p>
      </div>
    </section>
  );
}
