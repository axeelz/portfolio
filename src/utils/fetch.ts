export const GITHUB_USERNAME = "axeelz";

export const QUERY_KEYS = {
  portfolioResponse: "portfolio-response",
  randomTrack: "random-track",
  projectStats: "project-stats",
  githubUser: "github-user",
};

export interface GithubUser {
  avatar_url: string;
  name: string;
}

export async function fetchGithubData(username: string): Promise<GithubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()) as GithubUser;
}

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
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Unable to fetch ${endpoint}`);
  }

  return (await response.json()) as Record<string, unknown>;
}

interface PortfolioTool {
  name: string;
  link: string;
}

export interface PortfolioItem {
  name: string;
  link: string;
  description: string;
  repoLink?: string;
}

export interface PortfolioHost extends PortfolioItem {
  subdomains?: PortfolioItem[];
}

export interface DockApp {
  name: string;
  image: string;
}

interface PortfolioFeatures {
  musicWidget?: boolean;
}

export interface PortfolioResponse {
  age?: number;
  features?: PortfolioFeatures;
  hosts?: PortfolioHost[];
  tools?: PortfolioTool[];
  dock?: DockApp[];
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
