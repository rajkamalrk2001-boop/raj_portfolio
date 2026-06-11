"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Timeline line draws itself as you scroll
      gsap.fromTo(
        ".xp-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      // Each entry slides in
      gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%" },
        });
        gsap.from(item.querySelectorAll("li"), {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 78%" },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeading title="Work" accent="Experience" />

      <div ref={containerRef} className="relative space-y-12 pl-8 sm:pl-12">
        {/* Self-drawing timeline line */}
        <div className="xp-line absolute bottom-0 left-0 top-0 w-0.5 bg-gradient-to-b from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-emerald)]" />

        {experience.map((job) => (
          <article key={`${job.role}-${job.period}`} className="xp-item relative">
            {/* Timeline dot — centered on the 2px line at the container's left edge */}
            <span className="absolute -left-[calc(2rem+7px)] top-1.5 h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] sm:-left-[calc(3rem+7px)]" />

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">
                {job.role}
                <span className="text-muted"> · {job.company}</span>
              </h3>
              <span className="font-mono text-sm text-muted">{job.period}</span>
            </div>

            <ul className="mt-4 space-y-2.5">
              {job.bullets.map((bullet, j) => (
                <li key={j} className="flex gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-violet)]" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
