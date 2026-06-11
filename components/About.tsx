"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/SectionHeading";
import { about } from "@/data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Split the statement into words; **wrapped** segments become highlighted
const words = about.statement.split("**").flatMap((segment, i) =>
  segment
    .split(" ")
    .filter(Boolean)
    .map((w) => ({ w, hi: i % 2 === 1 }))
);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".about-word", { opacity: 1 });
        return;
      }

      // Statement lights up word by word as you scroll through it
      gsap.to(".about-word", {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".about-statement",
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.4,
        },
      });

      // Stats count up once they enter the viewport
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.value!);
        const suffix = el.dataset.suffix ?? "";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="about" ref={ref} className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeading title="About" accent="Me" />

      <p className="about-statement font-display mx-auto max-w-4xl text-center text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
        {words.map((t, i) => (
          <span
            key={i}
            className={`about-word inline-block opacity-10 ${
              t.hi ? "font-serif-accent gradient-text pr-0.5" : ""
            }`}
          >
            {t.w}&nbsp;
          </span>
        ))}
      </p>

      {/* Animated stat strip */}
      <div className="mt-16 flex flex-wrap items-start justify-center gap-x-16 gap-y-8">
        {about.highlights.map((h) => {
          const match = h.value.match(/^(\d+)(.*)$/);
          return (
            <div key={h.label} className="text-center">
              <div
                className="stat-num font-display gradient-text text-5xl font-bold sm:text-6xl"
                data-value={match?.[1] ?? h.value}
                data-suffix={match?.[2] ?? ""}
              >
                0{match?.[2] ?? ""}
              </div>
              <div className="mt-2 text-sm text-muted">{h.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
