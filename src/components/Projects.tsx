import data from "../data/projects.json";
import { memo } from "react";
import { SectionTitle } from "../styled/shared";
import ProjectCard from "./ProjectCard";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 1.5rem;
  justify-items: center;

  @media (min-width: 768px) {
    padding-top: 2rem;
  }

  @media (min-width: 830px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

const Projects = memo(() => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle>{t("projects.title")}</SectionTitle>
      <Grid>
        {data.projects.map((project: Project, i: number) => (
          <ProjectCard key={i} project={project} />
        ))}
      </Grid>
    </>
  );
});

export default Projects;
