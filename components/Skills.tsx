"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { skills } from "@/data/content";

gsap.registerPlugin(useGSAP);

const allSkills = skills.flatMap((g) =>
  g.items.map((item) => ({ item, accent: g.accent }))
);
const mid = Math.ceil(allSkills.length / 2);
const rows = [allSkills.slice(0, mid), allSkills.slice(mid)];

function Chip({ item, accent }: { item: string; accent: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-card px-5 py-2.5 font-mono text-sm text-muted">
      <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
      {item}
    </span>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track, i) => {
        const dir = i % 2 === 0 ? -50 : 0;
        const from = i % 2 === 0 ? 0 : -50;
        const tween = gsap.fromTo(
          track,
          { xPercent: from },
          { xPercent: dir, duration: 28, ease: "none", repeat: -1 }
        );
        // Slow down on hover instead of stopping dead
        track.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.15, duration: 0.4 }));
        track.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.4 }));
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="My" accent="Skills" />
      </div>

      {/* Category legend */}
      <Reveal className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {skills.map((g) => (
            <span key={g.category} className="flex items-center gap-2 text-sm text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.accent }} />
              {g.category}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Marquee rows */}
      <div ref={containerRef} className="marquee-mask space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="overflow-hidden">
            <div className="marquee-track flex w-max gap-4 pr-4">
              {[...row, ...row].map((s, j) => (
                <Chip key={`${s.item}-${j}`} item={s.item} accent={s.accent} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
