import { queryOptions } from "@tanstack/react-query";

export const GITHUB_USERNAME = "axeelz";

export const QUERY_KEYS = {
  portfolioResponse: "portfolio-response",
  randomTrack: "random-track",
  projectStats: "project-stats",
};

export interface RandomTrack {
  uri: string;
  title: string;
  artist: string;
  isExplicit: boolean;
  previewUrl: string | null;
  coverUrl: string;
}

export async function fetchRandomTrack(): Promise<RandomTrack> {
  const response = await fetch("https://music.axeelz.com/", { credentials: "include" });

  if (!response.ok) {
    throw new Error(`Error, status: ${response.status}`);
  }

  return (await response.json()) as RandomTrack;
}

export async function fetchProjectStats(endpoint: string): Promise<Record<string, unknown>> {
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(5000) });

  if (!response.ok) {
    throw new Error(`Unable to fetch ${endpoint}`);
  }

  return (await response.json()) as Record<string, unknown>;
}

export const projectStatsQueryOptions = (endpoint: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.projectStats, endpoint],
    queryFn: () => fetchProjectStats(endpoint),
    retry: false,
  });

interface PortfolioTool {
  name: string;
  link: string;
}

export interface DockApp {
  name: string;
  image: string;
}

interface FreelanceLink {
  label: string;
  url: string;
  image?: string;
}

export interface FreelanceWork {
  id: string;
  name: string;
  description: string;
  links: FreelanceLink[];
}

interface PortfolioFeatures {
  musicWidget?: boolean;
}

export interface PortfolioResponse {
  features?: PortfolioFeatures;
  tools?: PortfolioTool[];
  dock?: DockApp[];
  freelance?: FreelanceWork[];
}

export async function fetchPortfolioResponse(): Promise<PortfolioResponse> {
  const response = await fetch("https://static.axlz.me/api/portfolio");

  if (!response.ok) {
    throw new Error(`Unable to fetch portfolio data: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as PortfolioResponse;
}

export async function incrementViewCount(): Promise<number | null> {
  try {
    const response = await fetch("https://static.axlz.me/api/portfolio/views", {
      method: "POST",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { views?: number };
    return typeof data.views === "number" ? data.views : null;
  } catch (error) {
    console.warn("Error updating pageviews:", error);
    return null;
  }
}
