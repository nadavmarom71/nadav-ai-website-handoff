"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, useGSAP, ScrollTrigger, SplitText };

/**
 * SplitText measures rendered line boxes, and ScrollTrigger measures element
 * positions. Both are wrong if they run before the webfonts land: next/font uses
 * `display: swap`, so the first paint is a fallback with different metrics, and
 * any wrapped headline gets split on the wrong words.
 *
 * Every section gates its setup on this, then refreshes ScrollTrigger once the
 * real metrics are in. Resolves immediately if fonts are already cached.
 */
export function whenFontsReady(run: () => void) {
  const go = () => {
    run();
    ScrollTrigger.refresh();
  };

  if (typeof document === "undefined") return;

  if (document.fonts?.status === "loaded") {
    go();
    return;
  }

  document.fonts?.ready.then(go) ?? go();
}

/**
 * Split a headline into masked lines and reveal them.
 *
 * Uses SplitText's own `mask: "lines"`, which wraps each line in an
 * overflow-hidden parent, so type rises out of a clip instead of fading. No
 * initial hidden state lives in CSS: if this never runs, the headline is simply
 * visible.
 */
export function revealLines(
  target: Element | null,
  opts: { delay?: number; stagger?: number; trigger?: Element | null } = {},
) {
  if (!target) return;

  const split = SplitText.create(target, {
    type: "lines",
    mask: "lines",
    linesClass: "br-line",
  });

  gsap.from(split.lines, {
    yPercent: 112,
    duration: 1.15,
    ease: "expo.out",
    stagger: opts.stagger ?? 0.085,
    delay: opts.delay ?? 0,
    ...(opts.trigger
      ? { scrollTrigger: { trigger: opts.trigger, start: "top 78%", once: true } }
      : {}),
  });

  return split;
}

/**
 * Rise-and-fade for supporting copy.
 *
 * Body paragraphs use this rather than revealLines: SplitText collapses a
 * multi-paragraph block to one "line" per paragraph, so masking it just slid
 * whole paragraphs around. Staggering the paragraphs themselves is both honest
 * and calmer to read.
 */
export function riseIn(
  targets: gsap.TweenTarget,
  opts: { delay?: number; stagger?: number; trigger?: Element | null; y?: number } = {},
) {
  return gsap.from(targets, {
    y: opts.y ?? 22,
    autoAlpha: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    ...(opts.trigger
      ? { scrollTrigger: { trigger: opts.trigger, start: "top 80%", once: true } }
      : {}),
  });
}
