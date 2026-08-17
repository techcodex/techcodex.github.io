import type { IconType } from "react-icons";
import { Code2 } from "lucide-react";
import {
  SiPhp,
  SiPython,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiLaravel,
  SiVuedotjs,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiCloudflare,
  SiFirebase,
  SiJest,
  SiBitbucket,
} from "react-icons/si";
// Java has no Simple Icons logo (Oracle trademark); AWS's Simple Icons entry
// was removed for the same reason — both fall back to Devicons instead.
import { DiJava, DiAws } from "react-icons/di";

const SKILL_ICONS: Record<string, IconType> = {
  PHP: SiPhp,
  Python: SiPython,
  Java: DiJava,
  TypeScript: SiTypescript,
  HTML: SiHtml5,
  CSS: SiCss,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Laravel: SiLaravel,
  "Vue.js": SiVuedotjs,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Git: SiGit,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: DiAws,
  Cloudflare: SiCloudflare,
  Firebase: SiFirebase,
  Jest: SiJest,
  Bitbucket: SiBitbucket,
  // Playwright has no icon in Simple Icons or Devicons — falls through to
  // the generic Code2 fallback below.
};

export function getSkillIcon(name: string): IconType {
  return SKILL_ICONS[name] ?? Code2;
}
