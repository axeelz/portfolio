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

export interface DockApp {
  name: string;
  image: string;
}
export interface PortfolioResponse {
  tools?: PortfolioTool[];
  dock?: DockApp[];
}

export async function fetchPortfolioResponse(): Promise<PortfolioResponse> {
  const response = await fetch("https://static.axlz.me/api/portfolio");

  if (!response.ok) {
    throw new Error("Unable to fetch portfolio data");
  }

  return (await response.json()) as PortfolioResponse;
}
