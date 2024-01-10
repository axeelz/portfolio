import data from "../data/projects.json";
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

const Projects = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle>{t("projects.title")}</SectionTitle>
      <Grid>
        {data.projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </Grid>
    </>
  );
};

export default Projects;
