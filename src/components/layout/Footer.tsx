import { ArrowUp } from "lucide-react";
import type { ProfileInfo } from "../../types/content";

interface FooterProps {
  profile: ProfileInfo | undefined;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6">
        <div className="flex w-full flex-col items-center gap-3 text-sm text-ink-soft sm:flex-row sm:justify-between">
          <p>
            © {year} {profile?.name ?? ""}
          </p>
          <div className="flex gap-4">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="hover:text-ink">
                {profile.email}
              </a>
            )}
            {profile?.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:text-accent hover:shadow-lg hover:shadow-black/20"
        >
          <ArrowUp
            size={18}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </footer>
  );
}
