"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { awards } from "@/data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const accents = [
  "var(--accent-violet)",
  "var(--accent-cyan)",
  "var(--accent-amber)",
  "var(--accent-rose)",
];

const STICKY_TOP = 108;
const STICKY_STEP = 18;

export default function AwardsStack() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const wrappers = gsap.utils.toArray<HTMLElement>(".award-wrap", ref.current!);

      // As the next card scrolls over, the pinned card settles back slightly
      wrappers.forEach((wrap, i) => {
        if (i === wrappers.length - 1) return;
        const card = wrap.querySelector(".award-card");
        gsap.to(card, {
          scale: 0.96,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrappers[i + 1],
            start: "top bottom",
            end: `top ${STICKY_TOP + i * STICKY_STEP + 40}px`,
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      {awards.map((award, i) => (
        <div
          key={award.title}
          className="award-wrap sticky mb-8 last:mb-0"
          style={{ top: `${STICKY_TOP + i * STICKY_STEP}px` }}
        >
          <div
            className="award-card relative overflow-hidden rounded-3xl border border-line bg-card p-8 shadow-xl shadow-black/5 sm:p-10"
            style={{ borderTop: `3px solid ${accents[i % accents.length]}` }}
          >
            {/* Ghost index number */}
            <span
              className="font-display pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-bold opacity-10 sm:text-[9rem]"
              style={{ color: accents[i % accents.length] }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display relative text-xl font-bold sm:text-2xl">
              {award.title}
            </h4>
            <p className="relative mt-2 max-w-xl leading-relaxed text-muted">
              {award.note}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
