export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  summary: string;
  highlights: string[];
  tags?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links?: { label: string; url: string }[];
  imageUrl?: string;
  featured?: boolean;
  problem?: string;
  outcome?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: { name: string; level?: number }[];
}

export interface ResumeMeta {
  fileUrl: string;
  updatedAt: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  location?: string;
  bio: string;
  email?: string;
  links?: { label: string; url: string }[];
}
