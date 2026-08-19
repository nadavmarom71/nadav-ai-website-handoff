"use client";

import { brand, navLinks } from "@/content/site";

/**
 * Bottom-floating pill on a phone, where the thumb already is. Moves to the top
 * on desktop and gains its links there.
 */
export function Nav() {
  return (
    <nav className="br-nav">
      <span className="br-mark">
        {brand.name}
        <small>{brand.role}</small>
      </span>

      <div className="br-nav-links">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>

      <a className="br-nav-cta" href="#contact">
        דברו איתי
      </a>
    </nav>
  );
}
