import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.
        </p>
        <a
          href="#top"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          Back to top
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
