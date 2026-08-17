import { contentService } from "../services/contentService";
import { useContent } from "../hooks/useContent";
import { SectionContainer } from "../components/layout/SectionContainer";
import { FadeInSection } from "../components/ui/FadeInSection";
import { getSkillIcon } from "../lib/skillIcons";
import { STAGGER_STEP } from "../lib/animation";

export function SkillsPage() {
  const { data: categories, loading } = useContent(() => contentService.getSkills());

  return (
    <SectionContainer id="skills" title="Skills">
      {loading || !categories ? (
        <div className="h-40" />
      ) : (
        <div className="space-y-12">
          {categories.map((cat, i) => (
            <FadeInSection key={cat.id} delay={i * STAGGER_STEP}>
              <h3 className="font-heading text-lg font-medium text-ink">{cat.category}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {cat.skills.map((skill) => {
                  const Icon = getSkillIcon(skill.name);
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 rounded-xl border border-border bg-paper-dim px-4 py-3"
                    >
                      <Icon size={20} className="shrink-0 text-accent" />
                      <span className="text-sm text-ink-soft">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </FadeInSection>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
