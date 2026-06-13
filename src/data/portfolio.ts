import rawData from "./projects.json";

export interface TechnologyIcon {
  light: string;
  dark?: string;
}

export interface Technology {
  id: string;
  label: string;
  featured?: boolean;
  icon?: TechnologyIcon;
}

export interface Project {
  name: string;
  image: string;
  date: string | null;
  description: string;
  techs: string[];
  links: { source?: string; url?: string };
  stats?: {
    endpoint: string;
    fields: { field: string; label: string; default: number }[];
  };
}

interface PortfolioData {
  projects: Project[];
  technologies: Technology[];
}

export const portfolioData = rawData as PortfolioData;

export const featuredTechnologies = portfolioData.technologies.filter(
  (technology) => technology.featured,
);

const technologiesById = new Map(
  portfolioData.technologies.map((technology) => [technology.id, technology] as const),
);

const technologiesByLabel = new Map(
  portfolioData.technologies.map(
    (technology) => [technology.label.toLowerCase(), technology] as const,
  ),
);

export const getTechnology = (value: string) =>
  technologiesById.get(value) ?? technologiesByLabel.get(value.toLowerCase());

export const getTechnologyLabel = (value: string) => getTechnology(value)?.label ?? value;

const SVGL_BASE = "https://svgl.app/library/";

export const getTechnologyIconSrc = (icon: Technology["icon"], isDark: boolean) => {
  if (!icon) return undefined;
  const slug = isDark ? (icon.dark ?? icon.light) : icon.light;
  return `${SVGL_BASE}${slug}.svg`;
};
