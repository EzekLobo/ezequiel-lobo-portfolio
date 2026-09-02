export type Project = {
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  contribution: string;
  evidence: string[];
  technologies: string[];
  repository: string;
  demo?: string;
  image?: string;
  imageAlt?: string;
  presentation?: "desktop" | "mobile";
  featured?: boolean;
};
