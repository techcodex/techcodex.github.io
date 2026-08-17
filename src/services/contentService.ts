import type { Experience, Project, SkillCategory, ResumeMeta, ProfileInfo } from "../types/content";

import experiencesData from "../data/experiences.json";
import projectsData from "../data/projects.json";
import skillsData from "../data/skills.json";
import resumeData from "../data/resume.json";
import profileData from "../data/profile.json";

export interface ContentService {
  getProfile(): Promise<ProfileInfo>;
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<SkillCategory[]>;
  getResumeMeta(): Promise<ResumeMeta>;
}

/**
 * Phase 1 implementation: reads local JSON bundled with the app.
 * Phase 2 swaps this for an ApiContentService that calls fetch('/api/...'),
 * matching the same interface — no component ever imports the JSON files
 * or this class directly. See decisions/0007-backend-readiness-seam.md.
 */
class LocalJsonContentService implements ContentService {
  async getProfile(): Promise<ProfileInfo> {
    return profileData as ProfileInfo;
  }

  async getExperiences(): Promise<Experience[]> {
    return experiencesData as Experience[];
  }

  async getProjects(): Promise<Project[]> {
    return projectsData as Project[];
  }

  async getSkills(): Promise<SkillCategory[]> {
    return skillsData as SkillCategory[];
  }

  async getResumeMeta(): Promise<ResumeMeta> {
    return resumeData as ResumeMeta;
  }
}

export const contentService: ContentService = new LocalJsonContentService();
