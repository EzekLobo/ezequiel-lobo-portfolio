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
  visual?: "go-board";
  featured?: boolean;
};

export type JourneyItem = {
  title: string;
  context: string;
  description: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export type CertificationItem = {
  title: string;
  institution: string;
  period: string;
};
