import { contentService } from "../services/contentService";
import { useContent } from "../hooks/useContent";
import { SectionContainer } from "../components/layout/SectionContainer";
import { FadeInSection } from "../components/ui/FadeInSection";
import { ProjectCard } from "../components/ui/ProjectCard";
import { STAGGER_STEP } from "../lib/animation";

export function ProjectsPage() {
  const { data: projects, loading } = useContent(() => contentService.getProjects());

  const featured = projects?.find((p) => p.featured);
  const rest = projects?.filter((p) => p.id !== featured?.id) ?? [];

  return (
    <SectionContainer id="projects" title="Projects">
      {loading || !projects ? (
        <div className="h-40" />
      ) : (
        <div className="space-y-6">
          {featured && (
            <FadeInSection className="h-full">
              <ProjectCard project={featured} featured />
            </FadeInSection>
          )}
          <div className="grid items-stretch gap-6 sm:grid-cols-2">
            {rest.map((project, i) => (
              <FadeInSection key={project.id} delay={i * STAGGER_STEP} className="h-full">
                <ProjectCard project={project} />
              </FadeInSection>
            ))}
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
