"use client";

import { useRef } from "react";
import { manual } from "@/content/site";
import { gsap, revealLines, riseIn, ScrollTrigger, useGSAP, whenFontsReady } from "@/lib/motion";
import { Kicker, Lines } from "./bits";

/**
 * The differentiator, argued by motion instead of by a claim.
 *
 * Two bands of real manual tasks run past each other. There is no fake interface
 * here: every chip is a sentence a business owner would say about their own week.
 *
 * The bands are tied to scroll VELOCITY, not just to scroll position. Scrolling
 * faster drives them faster, and reversing direction reverses them. So the
 * reader's own hand is what makes the workload rush past, which is the argument.
 * Then one line stops it.
 */
export function Manual() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = root.current?.querySelector<HTMLElement>(".br-h2") ?? null;
        whenFontsReady(() => {
        revealLines(heading, { trigger: root.current });
        riseIn([".br-turn-lead", ".br-turn-punch"], {
          trigger: root.current,
          stagger: 0.12,
        });

        const tracks = gsap.utils.toArray<HTMLElement>(".br-marq-track", root.current);

        // Each band loops on its own; -50% works because the list is doubled.
        const loops = tracks.map((track, i) =>
          gsap.to(track, {
            xPercent: -50,
            ease: "none",
            repeat: -1,
            duration: i === 0 ? 30 : 38,
          }),
        );

        // Row 1 runs one way, row 2 the other.
        loops.forEach((l, i) => l.timeScale(i === 0 ? 1 : -1));

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            // Velocity is in px/sec; 320 keeps a normal flick near 2-3x.
            const boost = gsap.utils.clamp(
              1,
              7,
              1 + Math.abs(self.getVelocity()) / 320,
            );
            const sign = self.direction === 1 ? 1 : -1;

            loops.forEach((l, i) => {
              const base = i === 0 ? 1 : -1;
              gsap.to(l, {
                timeScale: base * sign * boost,
                duration: 0.35,
                overwrite: true,
                ease: "power2.out",
              });
            });
          },
          onScrubComplete: () => {
            // Settle back to a walking pace once the hand stops.
            loops.forEach((l, i) =>
              gsap.to(l, { timeScale: i === 0 ? 1 : -1, duration: 1.1 }),
            );
          },
        });

        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const loop = [...manual.tasks, ...manual.tasks];

  return (
    <section className="br-manual" ref={root}>
      <div className="br-wrap">
        <Kicker>{manual.kicker}</Kicker>
        <Lines lines={manual.lines} className="br-h2" />
      </div>

      <div className="br-marq" aria-hidden="true">
        {(["fwd", "back"] as const).map((dir) => (
          <div className="br-marq-row" key={dir}>
            <div className="br-marq-track">
              {loop.map((task, i) => (
                <span
                  className="br-task"
                  data-hot={i % 4 === (dir === "fwd" ? 1 : 3)}
                  key={`${dir}-${i}`}
                  dir="rtl"
                >
                  {task}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Text equivalent of the two decorative bands. */}
      <ul className="sr-only">
        {manual.tasks.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="br-wrap">
        <div className="br-turn">
          <p className="br-turn-lead">{manual.turn.lead}</p>
          <p className="br-turn-punch">
            <b>{manual.turn.punch}</b>
          </p>
        </div>
      </div>
    </section>
  );
}
