"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

/* Single logo letter with staggered entrance after the preloader */
function L({
  c,
  d,
  ready,
  className = "",
}: {
  c: string;
  d: number;
  ready: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-block transition-all duration-500 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${d}ms` }}
    >
      {c}
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const go = () => setReady(true);
    window.addEventListener("preloader:done", go, { once: true });
    const fallback = setTimeout(go, 4500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("preloader:done", go);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-full border border-line bg-card/55 px-5 py-2.5 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/10" : ""
        }`}
      >
        {/* RAJ KAMAL → collapses to a gradient RK on scroll */}
        <a
          href="#top"
          aria-label="Raj Kamal — back to top"
          className={`font-display flex items-baseline text-xl font-bold tracking-tight ${
            scrolled ? "logo-collapsed" : ""
          }`}
          onClick={() => setOpen(false)}
        >
          <L c="R" d={0} ready={ready} className={scrolled ? "gradient-text" : ""} />
          <span className="logo-collapse">
            <L c="A" d={60} ready={ready} />
            <L c="J" d={120} ready={ready} />
            <L c={" "} d={150} ready={ready} />
          </span>
          <L c="K" d={180} ready={ready} className={scrolled ? "gradient-text" : ""} />
          <span className="logo-collapse">
            <L c="A" d={240} ready={ready} />
            <L c="M" d={300} ready={ready} />
            <L c="A" d={360} ready={ready} />
            <L c="L" d={420} ready={ready} />
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-line bg-card/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  );
}
