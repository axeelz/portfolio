import { ArrowRightIcon } from "lucide-react";
import { styled } from "styled-system/jsx";

import { copy } from "../../data/copy";
import { portfolioData } from "../../data/portfolio";
import { GITHUB_USERNAME } from "../../utils/fetch";
import { SectionTitle } from "../ui/shared";
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

const GitHubCTA = styled("p", {
  base: {
    marginTop: "2rem",
    textAlign: "center",
    color: "var(--text-secondary)",
    fontWeight: 600,
    fontSize: "1.15rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    "& a": {
      color: "inherit",
      fontWeight: 700,
    },
  },
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
      <GitHubCTA>
        <ArrowRightIcon />
        {copy.projects.moreProjectsOn}{" "}
        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </GitHubCTA>
    </>
  );
};

export default Projects;
