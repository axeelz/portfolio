import rawData from "./projects.json";

export interface Project {
  name: string;
  image: string;
  description: string;
  links: { source?: string; url?: string };
  stats?: {
    endpoint: string;
    fields: { field: string; label: string; default: number }[];
  };
}

interface PortfolioData {
  projects: Project[];
  technologies: string[];
}

export const portfolioData: PortfolioData = rawData;
