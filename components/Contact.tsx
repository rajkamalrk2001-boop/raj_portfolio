import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import RocketFly from "@/components/RocketFly";
import { profile } from "@/data/content";

const pills = [
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, accent: "var(--accent-emerald)" },
  { label: "GitHub", href: profile.github, accent: "var(--accent-cyan)" },
  { label: "LinkedIn", href: profile.linkedin, accent: "var(--accent-amber)" },
  { label: "Source Code", href: profile.sourceCode, accent: "var(--accent-rose)" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl overflow-hidden px-6 pb-20 pt-28 sm:pb-24 sm:pt-36">
      <RocketFly />

      <SectionHeading title="Let's" accent="Connect" />

      <Reveal>
        <p className="mx-auto max-w-xl text-center text-lg text-muted">
          Open to opportunities, collaborations, or a good conversation about
          software. The fastest way to reach me:
        </p>
      </Reveal>

      {/* Giant email link with growing gradient underline */}
      <Reveal delay={0.15}>
        <div className="mt-10 text-center">
          <a
            href={`mailto:${profile.email}`}
            className="email-link font-display inline-block text-2xl font-bold tracking-tight sm:text-4xl"
          >
            {profile.email}
          </a>
        </div>
      </Reveal>

      {/* Pills */}
      <Reveal delay={0.25}>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {pills.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              target={/^(mailto|tel):/.test(pill.href) ? undefined : "_blank"}
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-foreground/30"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: pill.accent }} />
              {pill.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
