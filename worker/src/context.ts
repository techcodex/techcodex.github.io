// Builds the chatbot's system prompt from the SAME content JSON the React
// app reads via contentService — one source of truth, no content duplicated
// here. If you edit src/data/*.json, the chatbot's knowledge updates too on
// the next Worker deploy.
import profile from "../../src/data/profile.json";
import experiences from "../../src/data/experiences.json";
import projects from "../../src/data/projects.json";
import skills from "../../src/data/skills.json";
import type { Experience, Project, SkillCategory, ProfileInfo } from "../../src/types/content";

function formatExperience(exp: Experience): string {
  const range = exp.startDate ? `${exp.startDate} – ${exp.endDate ?? "Present"}` : "";
  const lines = [
    `- ${exp.role} at ${exp.company}${range ? ` (${range})` : ""}${exp.location ? `, ${exp.location}` : ""}`,
    `  ${exp.summary}`,
  ];
  if (exp.highlights.length > 0) {
    lines.push(`  Highlights: ${exp.highlights.join(" | ")}`);
  }
  if (exp.tags && exp.tags.length > 0) {
    lines.push(`  Tech: ${exp.tags.join(", ")}`);
  }
  return lines.join("\n");
}

function formatProject(project: Project): string {
  const lines = [`- ${project.title}: ${project.description}`];
  if (project.problem) lines.push(`  Problem: ${project.problem}`);
  if (project.outcome) lines.push(`  Outcome: ${project.outcome}`);
  if (project.tags.length > 0) lines.push(`  Tech: ${project.tags.join(", ")}`);
  if (project.liveUrl) lines.push(`  Live site: ${project.liveUrl}`);
  if (project.githubUrl) lines.push(`  GitHub: ${project.githubUrl}`);
  return lines.join("\n");
}

function formatSkillCategory(category: SkillCategory): string {
  return `- ${category.category}: ${category.skills.map((s) => s.name).join(", ")}`;
}

function formatProfile(p: ProfileInfo): string {
  const lines = [`Name: ${p.name}`, `Title: ${p.title}`];
  if (p.location) lines.push(`Location: ${p.location}`);
  lines.push(`Bio: ${p.bio}`);
  if (p.email) lines.push(`Email: ${p.email}`);
  if (p.links && p.links.length > 0) {
    lines.push(`Links: ${p.links.map((l) => `${l.label} (${l.url})`).join(", ")}`);
  }
  return lines.join("\n");
}

export const SYSTEM_PROMPT = `You are the assistant embedded in ${
  (profile as ProfileInfo).name
}'s personal portfolio website. Visitors ask you questions instead of reading
the whole site themselves.

Answer ONLY using the information below — it is everything about this
person's background, skills, and projects. Do not invent employers, dates,
or projects that aren't listed. If something is asked that isn't covered
here, say you don't have that information and suggest reaching out directly
via the email address above. Keep answers concise and conversational
(a few sentences, not an essay), and speak about this person in the third
person (e.g. "He worked at...", not "I worked at...").

## Profile
${formatProfile(profile as ProfileInfo)}

## Experience
${(experiences as Experience[]).map(formatExperience).join("\n\n")}

## Projects
${(projects as Project[]).map(formatProject).join("\n\n")}

## Skills
${(skills as SkillCategory[]).map(formatSkillCategory).join("\n")}

A downloadable résumé is also available on the site if a visitor wants the
full written version.`;
