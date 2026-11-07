import { copy } from "./copy";

export const SECTION_IDS = {
  FREELANCE: "freelance",
  PROJECTS: "projects",
  GARDEN: "garden",
  CONTACT: "contact",
} as const;

export const SECTIONS = [
  { id: SECTION_IDS.FREELANCE, label: copy.freelance.title },
  { id: SECTION_IDS.PROJECTS, label: copy.projects.title },
  { id: SECTION_IDS.GARDEN, label: copy.garden.title },
  { id: SECTION_IDS.CONTACT, label: copy.contact.navLabel },
] as const;
