import { styled } from "styled-system/jsx";

import { copy } from "../../data/copy";
import { portfolioData } from "../../data/portfolio";
import { GITHUB_USERNAME } from "../../utils/fetch";
import { ExternalLink, LinkRow, SectionTitle } from "../ui/shared";
import ProjectCard from "./ProjectCard";

const Grid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "1.5rem",
    justifyItems: "center",
    md: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});

const MoreProjects = styled(LinkRow, {
  base: { justifyContent: "center", marginTop: "1rem" },
});

const Projects = () => {
  return (
    <>
      <SectionTitle>{copy.projects.title}</SectionTitle>
      <Grid>
        {portfolioData.projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </Grid>
      <MoreProjects>
        <ExternalLink href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}>
          {copy.projects.moreProjectsOn} GitHub
        </ExternalLink>
      </MoreProjects>
    </>
  );
};

export default Projects;
