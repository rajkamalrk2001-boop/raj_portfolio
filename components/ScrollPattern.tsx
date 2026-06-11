"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Page-wide decorative layer: soft gradient blobs and outline shapes that
 * drift at different speeds while the user scrolls (parallax). Fixed behind
 * all content.
 */
export default function ScrollPattern() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>("[data-speed]", ref.current!).forEach((el) => {
        const speed = parseFloat(el.dataset.speed!);
        const spin = parseFloat(el.dataset.spin ?? "0");
        gsap.to(el, {
          y: speed,
          rotation: spin,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {/* Gradient shades, placed down the page and drifting with scroll */}
      <div
        data-speed="-220"
        className="absolute left-[-7rem] top-[22%] h-80 w-80 rounded-full opacity-25 blur-[100px]"
        style={{ background: "var(--accent-violet)" }}
      />
      <div
        data-speed="-340"
        className="absolute right-[-6rem] top-[48%] h-96 w-96 rounded-full opacity-20 blur-[110px]"
        style={{ background: "var(--accent-cyan)" }}
      />
      <div
        data-speed="-160"
        className="absolute left-[30%] top-[72%] h-72 w-72 rounded-full opacity-15 blur-[100px]"
        style={{ background: "var(--accent-emerald)" }}
      />
      <div
        data-speed="-420"
        className="absolute right-[18%] top-[92%] h-80 w-80 rounded-full opacity-20 blur-[100px]"
        style={{ background: "var(--accent-rose)" }}
      />

      {/* Outline shapes */}
      <div
        data-speed="-500"
        data-spin="160"
        className="absolute left-[10%] top-[38%] h-24 w-24 rounded-full border-2 opacity-30"
        style={{ borderColor: "var(--accent-cyan)" }}
      />
      <svg
        data-speed="-620"
        data-spin="-120"
        className="absolute right-[8%] top-[30%] opacity-30"
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        stroke="var(--accent-amber)"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <path
              key={`${r}-${c}`}
              d={`M${14 + c * 28} ${6 + r * 28} v16 M${6 + c * 28} ${14 + r * 28} h16`}
            />
          ))
        )}
      </svg>
      <svg
        data-speed="-380"
        data-spin="90"
        className="absolute left-[16%] top-[86%] opacity-30"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M32 6 L58 52 L6 52 Z"
          stroke="var(--accent-rose)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
