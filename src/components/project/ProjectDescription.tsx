import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import ProjectStats from "./ProjectStats";

const ProjectDesc = styled("div", {
  base: {
    fontWeight: 500,
    lineHeight: 1.5,
  },
});

const ProjectDescription = ({ description, stats }: Pick<Project, "description" | "stats">) => (
  <ProjectDesc>
    <p>{description}</p>
    {stats && <ProjectStats stats={stats} />}
  </ProjectDesc>
);

export default ProjectDescription;
