import { Link } from "react-router-dom";
import { Download, ArrowRight, MapPin, Mail, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import type { ComponentType } from "react";
import { contentService } from "../services/contentService";
import { useContent } from "../hooks/useContent";
import { FadeInSection } from "../components/ui/FadeInSection";
import { StatBlock } from "../components/ui/StatBlock";
import { ProjectCard } from "../components/ui/ProjectCard";
import { SectionContainer } from "../components/layout/SectionContainer";
import { STAGGER_STEP } from "../lib/animation";
import headshot from "../assets/images/headshot.jpg";

const SOCIAL_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  github: SiGithub,
  linkedin: FaLinkedin,
};

// Derived from data/experiences.json, data/projects.json, data/skills.json —
// re-check these if that content changes materially.
const STATS = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 10, label: "Projects Shipped" },
  { value: 20, suffix: "+", label: "Technologies" },
];

export function HomePage() {
  const { data: profile, loading: profileLoading } = useContent(() => contentService.getProfile());
  const { data: resume } = useContent(() => contentService.getResumeMeta());
  const { data: projects } = useContent(() => contentService.getProjects());

  const featured = projects?.find((p) => p.featured);
  const teaser = [
    ...(featured ? [featured] : []),
    ...(projects?.filter((p) => p.id !== featured?.id) ?? []),
  ].slice(0, 2);

  return (
    <>
      <section id="top" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeInSection>
            {profileLoading || !profile ? (
              <div className="h-40" />
            ) : (
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
                  {profile.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {profile.location}
                    </span>
                  )}
                  {profile.links?.map((link) => {
                    const Icon = SOCIAL_ICONS[link.label.toLowerCase()] ?? ExternalLink;
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        <Icon size={14} />
                        {link.label}
                      </a>
                    );
                  })}
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      aria-label="Email"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  )}
                </div>
                <h1 className="font-heading text-4xl font-medium leading-tight text-ink md:text-6xl">
                  {profile.name}
                </h1>
                <p className="mt-4 max-w-xl text-lg text-ink-soft md:text-xl">{profile.title}</p>
                <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">{profile.bio}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
                  >
                    View Projects
                    <ArrowRight size={16} />
                  </Link>
                  {resume && (
                    <a
                      href={resume.fileUrl}
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
                    >
                      <Download size={16} />
                      Download Résumé
                    </a>
                  )}
                </div>
              </div>
            )}
          </FadeInSection>

          <FadeInSection delay={STAGGER_STEP}>
            <div className="relative mx-auto max-w-xs lg:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-3xl bg-accent/10" />
              <img
                src={headshot}
                alt={profile?.name ?? "Portrait"}
                width={800}
                height={800}
                loading="eager"
                className="aspect-square w-full rounded-3xl border border-border object-cover"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <StatBlock key={stat.label} {...stat} delay={i * STAGGER_STEP} />
          ))}
        </div>
      </section>

      {teaser.length > 0 && (
        <SectionContainer id="featured-work" title="Featured Projects" bordered>
          <div className="grid items-stretch gap-6 sm:grid-cols-2">
            {teaser.map((project, i) => (
              <FadeInSection key={project.id} delay={i * STAGGER_STEP} className="h-full">
                <ProjectCard project={project} featured={project.id === featured?.id} />
              </FadeInSection>
            ))}
          </div>
          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </SectionContainer>
      )}
    </>
  );
}
