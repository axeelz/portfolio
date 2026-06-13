export const copy = {
  presentation: {
    title: "software engineer",
    about: "About me",
    others: "others",
    less: "Show less",
    enjoyedRecently: "Tools I enjoyed using recently",
    seeProjects: "See my projects",
    contactMe: "Contact me",
  },
  navbar: {
    switchTheme: "Switch theme",
    presentation: "Home",
    projects: "Projects",
    about: "About",
  },
  projects: {
    title: "Some projects",
    card: {
      website: "Visit website",
      source: "See on GitHub",
    },
    moreProjectsOn: "More projects on",
  },
  about: {
    title: "More about me",
    domains: "A few domains I host",
    appsInDock: "Cool apps in my dock",
  },
  contact: {
    currently: "it is",
    forMe: "local time",
    randomSong: "Random song from my playlist",
    getRandomSong: "Get a random song",
    copyEmail: "Copy email address",
    copied: "Copied",
    errorFetchTrack: "Failed to load track. Please try again.",
  },
  footer: {
    createdBy: "Created by",
    views: "views",
  },
} as const;

type Segment = { text: string } | { label: string; href: string };

export const bioParagraph: Segment[] = [
  { text: "Currently working at " },
  { label: "SNCF Connect & Tech", href: "https://www.sncf-connect-tech.fr/" },
  { text: " and pursuing a Master's in Computer Engineering at " },
  { label: "Université Paris Cité", href: "https://u-paris.fr/" },
];
