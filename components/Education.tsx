import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import AwardsStack from "@/components/AwardsStack";
import { education, awards } from "@/data/content";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeading title="Education &" accent="Awards" />

      {/* Minimal ledger-style rows — no cards */}
      <div className="divide-y divide-[var(--line)]">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={0.08 * i}>
            <div className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{edu.school}</p>
                {edu.note && <p className="mt-1 text-sm text-muted">{edu.note}</p>}
              </div>
              {edu.year && (
                <span className="font-mono text-sm text-muted">{edu.year}</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Awards — sticky stacking cards on scroll */}
      {awards.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display mb-8 text-center text-2xl font-bold tracking-tight">
              Achievements & <em className="font-serif-accent gradient-text font-medium">Awards</em>
            </h3>
          </Reveal>
          <AwardsStack />
        </div>
      )}
    </section>
  );
}
