"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FloatingSymbols from "@/components/FloatingSymbols";
import { profile } from "@/data/content";

gsap.registerPlugin(useGSAP);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Hold entrance animations until the preloader curtain lifts
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const go = () => setReady(true);
    window.addEventListener("preloader:done", go, { once: true });
    const fallback = setTimeout(go, 4500);
    return () => {
      window.removeEventListener("preloader:done", go);
      clearTimeout(fallback);
    };
  }, []);

  // Magnetic pull on the CTA buttons
  useGSAP(
    () => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const cleanups: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>(".magnetic", sectionRef.current!).forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.35,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef }
  );

  const anim = ready ? "show" : "hidden";

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Banner gradient shades */}
      <div className="blob h-72 w-72" style={{ background: "var(--accent-violet)", top: "12%", left: "-6rem" }} />
      <div className="blob h-80 w-80" style={{ background: "var(--accent-cyan)", bottom: "8%", right: "-7rem" }} />
      <div
        className="blob h-96 w-[36rem] opacity-20"
        style={{ background: "linear-gradient(120deg, var(--accent-violet), var(--accent-cyan))", top: "30%", left: "50%", transform: "translateX(-50%)" }}
      />

      <FloatingSymbols />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        {profile.available && (
          <motion.div variants={fadeUp} initial="hidden" animate={anim} custom={0}>
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={anim}
          custom={1}
          className="font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-7xl"
        >
          Hi, I&apos;m <span className="gradient-text">{profile.firstName}</span>.
          <br />
          Software <em className="font-serif-accent pr-2 font-medium">Engineer</em>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={anim}
          custom={2}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={anim}
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={profile.resumeUrl}
            download
            className="cta magnetic group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background"
          >
            <span>Download Resume</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-0.5">
              <path d="M12 3v13M6 11l6 6 6-6M5 21h14" />
            </svg>
          </a>
          <a
            href="#contact"
            className="cta magnetic inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold"
          >
            <span>Get in touch</span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={anim}
          custom={4}
          className="mt-9 flex items-center justify-center gap-5"
        >
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted transition-all hover:scale-110 hover:text-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted transition-all hover:scale-110 hover:text-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1, y: [0, 8, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
