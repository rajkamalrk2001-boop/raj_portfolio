"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SymbolDef = {
  glyph: string;
  color: string;
  size: string;
  top: string;
  left: string;
};

const symbols: SymbolDef[] = [
  { glyph: "</>", color: "var(--accent-violet)", size: "text-3xl", top: "18%", left: "8%" },
  { glyph: "{ }", color: "var(--accent-cyan)", size: "text-2xl", top: "30%", left: "85%" },
  { glyph: "⚛", color: "var(--accent-cyan)", size: "text-4xl", top: "68%", left: "12%" },
  { glyph: "λ", color: "var(--accent-amber)", size: "text-3xl", top: "75%", left: "82%" },
  { glyph: "#", color: "var(--accent-rose)", size: "text-2xl", top: "12%", left: "72%" },
  { glyph: "( )", color: "var(--accent-emerald)", size: "text-xl", top: "55%", left: "92%" },
  { glyph: "=>", color: "var(--accent-violet)", size: "text-2xl", top: "85%", left: "45%" },
  { glyph: "&&", color: "var(--accent-amber)", size: "text-xl", top: "40%", left: "4%" },
  { glyph: "*", color: "var(--accent-rose)", size: "text-4xl", top: "8%", left: "38%" },
  { glyph: "[ ]", color: "var(--accent-emerald)", size: "text-2xl", top: "26%", left: "55%" },
  { glyph: "++", color: "var(--accent-cyan)", size: "text-xl", top: "62%", left: "30%" },
  { glyph: ";", color: "var(--accent-violet)", size: "text-4xl", top: "48%", left: "68%" },
];

/**
 * Symbols start gathered in a ring at the center of the hero (revealed when
 * the preloader finishes), then scatter to their resting spots as the user
 * scrolls through the pinned hero section.
 */
export default function FloatingSymbols() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current!;
      const items = gsap.utils.toArray<HTMLElement>(".symbol", container);
      const inners = gsap.utils.toArray<HTMLElement>(".symbol-inner", container);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Idle bob on the inner span (composes with the scatter transform)
      if (!reduce) {
        inners.forEach((el, i) => {
          gsap.to(el, {
            y: -14,
            duration: 2.4 + (i % 4) * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.18,
          });
        });
      }

      if (reduce) {
        gsap.set(items, { opacity: 1 });
        return;
      }

      // Gather: offset every symbol so it sits on a ring around the center
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const ex = r.left - rect.left + r.width / 2;
        const ey = r.top - rect.top + r.height / 2;
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 90 + (i % 3) * 42;
        gsap.set(el, {
          x: cx + Math.cos(angle) * radius - ex,
          y: cy + Math.sin(angle) * radius - ey,
          opacity: 0,
          scale: 0.3,
        });
      });

      // Pop in (clustered) once the preloader curtain lifts
      const reveal = () => {
        gsap.to(items, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "back.out(1.7)",
        });
      };
      window.addEventListener("preloader:done", reveal, { once: true });
      // Fallback if the preloader was skipped for any reason
      const fallback = setTimeout(reveal, 4500);

      // Scatter to resting spots while the hero is pinned
      const section = container.closest("section");
      gsap.to(items, {
        x: 0,
        y: 0,
        ease: "none",
        stagger: 0.015,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=70%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      return () => {
        window.removeEventListener("preloader:done", reveal);
        clearTimeout(fallback);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {symbols.map((s, i) => (
        <span
          key={i}
          className={`symbol absolute opacity-0 ${s.size}`}
          style={{ top: s.top, left: s.left }}
        >
          <span
            className="symbol-inner font-mono block select-none font-bold"
            style={{ color: s.color, opacity: 0.55 }}
          >
            {s.glyph}
          </span>
        </span>
      ))}
    </div>
  );
}
