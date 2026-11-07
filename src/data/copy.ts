export const copy = {
  presentation: {
    location: "Paris, France",
  },
  navbar: {
    switchTheme: "Switch theme",
  },
  freelance: {
    title: "Freelance",
    pitch:
      "I build websites, apps and tools for small teams. You talk directly to the person writing the code.",
    yourProject: "Your project?",
    yourProjectDescription:
      "A small website, an app, a tool. I take on a few projects on evenings and weekends.",
  },
  projects: {
    title: "Projects",
    visit: "Visit website",
    source: "See on GitHub",
    more: "More projects on GitHub",
    moreDescription: "Smaller tools and experiments.",
  },
  garden: {
    title: "Garden",
    pitch: "Music, tools and apps I'm enjoying right now.",
    song: "Random song from my playlist",
    tools: "Tools I enjoyed recently",
    builtWith: "What I usually build with",
    dock: "Cool apps in my dock",
    play: "Play",
    pause: "Pause",
    anotherSong: "Another one",
    songError: "Could not load a song. Please try again.",
    playError: "Could not play this preview.",
  },
  contact: {
    navLabel: "Contact",
    title: "Got a project?",
    pitch: "A small website, an app, a tool. Tell me what you need.",
    copyEmail: "Copy email address",
    copied: "Copied",
    elsewhere: "Elsewhere",
    views: "views",
  },
} as const;

type Segment =
  | { text: string }
  | { label: string; section: string }
  | { label: string; href: string };

export const bioParagraph: Segment[] = [
  { text: "I'm a software engineer at " },
  { label: "SNCF Connect & Tech", href: "https://www.sncf-connect-tech.fr/en/" },
  { text: " and on the side I build " },
  { label: "my own apps", section: "projects" },
  { text: " and " },
  { label: "freelance", section: "freelance" },
  { text: " for small teams." },
];
