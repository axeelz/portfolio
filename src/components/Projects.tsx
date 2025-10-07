import data from "../data/projects.json";
import { SectionTitle } from "../styled/shared";
import ProjectCard from "./ProjectCard";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "lucide-react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 1.5rem;
  justify-items: center;

  @media (min-width: 830px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const GitHubCTA = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & a {
    color: inherit;
    font-weight: 700;
  }
`;

export interface Project {
  name: string; // Project name
  image: string; // Image URL
  date: string; // YYYY
  desc_fr: string; // Description in French
  desc_en: string; // Description in English
  techs: string[]; // List of technologies used
  links: { source?: string; url?: string }; // URLs
  stats?: {
    endpoint: string; // API endpoint
    /* Fields to display in the project stats */
    fields: { field: string; label_fr: string; label_en: string; default: number }[];
  };
}

const Projects = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle>{t("projects.title")}</SectionTitle>
      <Grid>
        {data.projects.map((project: Project, i: number) => (
          <ProjectCard key={i} project={project} />
        ))}
      </Grid>
      <GitHubCTA>
        <ArrowRightIcon />
        {t("projects.moreProjectsOn")}{" "}
        <a href="https://github.com/axeelz?tab=repositories" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </GitHubCTA>
    </>
  );
};

export default Projects;
