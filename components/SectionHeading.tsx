import Reveal from "@/components/Reveal";

export default function SectionHeading({
  title,
  accent,
}: {
  title: string;
  accent?: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
          {accent && (
            <>
              {" "}
              <em className="font-serif-accent gradient-text pr-1 font-medium">
                {accent}
              </em>
            </>
          )}
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)]" />
      </div>
    </Reveal>
  );
}
