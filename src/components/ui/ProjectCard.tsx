import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./Badge";
import type { Project } from "../../types/content";

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const navigate = useNavigate();
  const detailPath = `/projects/${project.id}`;

  return (
    // Deliberately a <div role="link">, not an <a>/<Link> — this card can
    // contain real nested external <a> links (see decisions/0014), and a
    // native anchor can't contain another anchor without breaking HTML/a11y.
    <div
      // eslint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="link"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={() => navigate(detailPath)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(detailPath);
      }}
      className={clsx(
        "flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-paper-dim p-6 transition-transform duration-200 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-black/30",
        featured && "sm:p-8",
      )}
    >
      <h3 className={clsx("font-heading font-medium text-ink", featured ? "text-2xl" : "text-lg")}>
        {project.title}
      </h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{project.description}</p>

      <div className="mt-auto flex flex-col gap-4 pt-4">
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
