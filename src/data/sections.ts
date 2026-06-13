import { HomeIcon, FolderIcon, UserIcon } from "lucide-react";

import { copy } from "../data/copy";

export const SECTION_IDS = {
  PRESENTATION: "presentation",
  PROJECTS: "projects",
  ABOUT: "about",
} as const;

export const SECTIONS = [
  { id: SECTION_IDS.PRESENTATION, Icon: HomeIcon, label: copy.navbar.presentation },
  { id: SECTION_IDS.PROJECTS, Icon: FolderIcon, label: copy.navbar.projects },
  { id: SECTION_IDS.ABOUT, Icon: UserIcon, label: copy.navbar.about },
] as const;
