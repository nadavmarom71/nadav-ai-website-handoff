"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * A headline as plain block lines. No hidden initial state and no clip wrappers
 * in the markup: GSAP's SplitText adds the masks at runtime, so if JS never runs
 * the headline still reads normally.
 */
export function Lines({
  lines,
  blueIndex,
  className,
  as: Tag = "h2",
}: {
  lines: readonly string[];
  blueIndex?: number;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={`br-d ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span key={line} className={i === blueIndex ? "br-blue" : undefined}>
          {line}
        </span>
      ))}
    </Tag>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <span className="br-kicker">{children}</span>;
}

export function Cta({
  children,
  href = "#contact",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a className="br-cta" href={href}>
      {children}
      <span className="br-cta-a" aria-hidden="true">
        →
      </span>
    </a>
  );
}

/** Thin gradient bar at the top edge, tied to scroll depth. */
export function Progress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const on = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <div className="br-prog" style={{ width: `${p * 100}%` }} aria-hidden="true" />
  );
}
