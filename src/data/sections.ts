import { HomeIcon, FolderIcon, UserIcon } from "lucide-react";

export const SECTION_IDS = {
  PRESENTATION: "presentation",
  PROJECTS: "projects",
  ABOUT: "about",
} as const;

export const SECTIONS = [
  { id: SECTION_IDS.PRESENTATION, Icon: HomeIcon },
  { id: SECTION_IDS.PROJECTS, Icon: FolderIcon },
  { id: SECTION_IDS.ABOUT, Icon: UserIcon },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
