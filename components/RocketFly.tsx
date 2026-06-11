"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Paper rocket that launches across the contact section (left → right)
 * with a gradient exhaust tail, every time the section scrolls into view.
 */
export default function RocketFly() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = ref.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const fly = gsap.timeline({ paused: true });
      fly
        .fromTo(
          ".rocket",
          { x: -160, opacity: 1 },
          { x: () => container.offsetWidth + 200, duration: 2.4, ease: "power2.in" }
        )
        // gentle arc: climb then level out
        .to(".rocket", { y: -52, duration: 1.2, ease: "sine.out" }, 0)
        .to(".rocket", { y: -84, duration: 1.2, ease: "sine.in" }, 1.2)
        .fromTo(".rocket", { rotation: 4 }, { rotation: -10, duration: 2.4, ease: "none" }, 0)
        // exhaust tail stretches as it accelerates
        .fromTo(
          ".rocket-tail",
          { scaleX: 0.1, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.7, ease: "power1.out" },
          0.2
        )
        .to(".rocket-tail", { scaleX: 1.6, duration: 1.5, ease: "power1.in" }, 0.9);

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) fly.restart();
          });
        },
        { threshold: 0.5 }
      );
      io.observe(container);

      return () => io.disconnect();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-0 top-10 h-28" aria-hidden>
      <svg
        className="rocket absolute left-0 top-1/2 w-36 opacity-0"
        viewBox="0 0 220 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rocketTail" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.9" />
            <stop offset="45%" stopColor="var(--accent-violet)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rocketBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* gradient exhaust tail (scales from the plane backwards) */}
        <path
          className="rocket-tail"
          style={{ transformOrigin: "130px 38px" }}
          d="M130 33 C92 28 48 30 2 26 C-4 33 -4 39 2 44 C48 42 92 42 130 41 Z"
          fill="url(#rocketTail)"
        />

        {/* paper rocket */}
        <g>
          <path d="M212 30 L118 8 L150 33 Z" fill="url(#rocketBody)" stroke="var(--accent-violet)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M212 30 L126 58 L150 36 Z" fill="url(#rocketBody)" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M212 30 L150 33 L150 36 Z" fill="var(--accent-violet)" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
