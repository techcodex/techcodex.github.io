import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { contentService } from "../services/contentService";
import { useContent } from "../hooks/useContent";
import { FadeInSection } from "../components/ui/FadeInSection";
import { Badge } from "../components/ui/Badge";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: projects, loading } = useContent(() => contentService.getProjects());

  if (loading || !projects) {
    return <div className="h-40" />;
  }

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <FadeInSection>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <h1 className="mt-6 font-heading text-3xl font-medium text-ink md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">{project.description}</p>

        {project.tags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Tech Used</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        {project.problem && (
          <div className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
              The Problem
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{project.problem}</p>
          </div>
        )}

        {project.outcome && (
          <div className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Outcome</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{project.outcome}</p>
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </FadeInSection>
    </div>
  );
}
