import { ExternalLink } from "lucide-react";
import { contentService } from "../services/contentService";
import { useContent } from "../hooks/useContent";
import { SectionContainer } from "../components/layout/SectionContainer";
import { FadeInSection } from "../components/ui/FadeInSection";
import { Timeline, TimelineItem } from "../components/ui/Timeline";
import { Badge } from "../components/ui/Badge";
import { STAGGER_STEP } from "../lib/animation";

function formatRange(start: string | undefined, end: string | undefined) {
  if (!start) return undefined;
  return `${start} — ${end ?? "Present"}`;
}

export function ExperiencePage() {
  const { data: experiences, loading } = useContent(() => contentService.getExperiences());

  return (
    <SectionContainer id="experience" title="Experience">
      {loading || !experiences ? (
        <div className="h-40" />
      ) : (
        <Timeline>
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id}>
              <FadeInSection delay={i * STAGGER_STEP}>
                <div className="rounded-2xl border border-border bg-paper-dim/40 p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-heading text-xl font-medium text-ink">
                      {exp.role} |{" "}
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {exp.company}
                          <ExternalLink size={14} className="shrink-0" />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h3>
                    {formatRange(exp.startDate, exp.endDate) && (
                      <span className="text-sm text-ink-soft">
                        {formatRange(exp.startDate, exp.endDate)}
                      </span>
                    )}
                  </div>
                  {exp.location && <p className="mt-1 text-sm text-ink-soft">{exp.location}</p>}
                  <p className="mt-3 leading-relaxed text-ink-soft">{exp.summary}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft">
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </FadeInSection>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </SectionContainer>
  );
}
