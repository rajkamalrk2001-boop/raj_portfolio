"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = [
  "Hello",
  "नमस्ते",
  "Bonjour",
  "Hola",
  "こんにちは",
  "How are you?",
  "Brewing coffee…",
  "Crafting pixels…",
  "Welcome",
];

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("loading");
    const counter = { value: 0 };

    const wordTimer = setInterval(
      () => setWordIndex((i) => Math.min(i + 1, words.length - 1)),
      300
    );

    const tween = gsap.to(counter, {
      value: 100,
      duration: 2.6,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
      onComplete: () => {
        clearInterval(wordTimer);
        // Symbols start gathering on screen while the curtain lifts
        window.dispatchEvent(new Event("preloader:done"));
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          delay: 0.25,
          ease: "power3.inOut",
          onComplete: () => {
            document.documentElement.classList.remove("loading");
            setDone(true);
          },
        });
      },
    });

    return () => {
      tween.kill();
      clearInterval(wordTimer);
      document.documentElement.classList.remove("loading");
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--accent-violet)]" />
        <span
          key={wordIndex}
          className="font-display animate-[word-in_0.3s_ease_both] text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {words[wordIndex]}
        </span>
      </div>

      <div className="absolute bottom-6 right-8 font-display text-7xl font-bold tabular-nums text-foreground/90 sm:bottom-10 sm:right-12 sm:text-9xl">
        {progress}
        <span className="gradient-text">%</span>
      </div>

      {/* progress hairline */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-line">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-emerald)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
