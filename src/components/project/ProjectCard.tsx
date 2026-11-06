import { styled } from "styled-system/jsx";

import { getTechnologyLabel, type Project } from "../../data/portfolio";
import { Surface } from "../ui/shared";
import ProjectDescription from "./ProjectDescription";
import ProjectLinks from "./ProjectLinks";
import ProjectThumbnail from "./ProjectThumbnail";

const Card = styled(Surface, {
  base: {
    padding: "1.25rem",
    maxWidth: "480px",
    wordBreak: "break-word",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    lg: { maxWidth: "unset", padding: "1.5rem" },
  },
});

const ProjectName = styled("h3", {
  base: {
    fontFamily: "var(--font-title)",
    fontWeight: 700,
    fontSize: "1.25rem",
    margin: "1rem 0 0.3rem 0",
  },
});

const TechStack = styled("p", {
  base: {
    marginTop: "0.5rem",
    marginBottom: "0.25rem",
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
});

const ProjectCard = ({ project }: { project: Project }) => {
  const { name, techs, description } = project;
  let { image } = project;
  if (!image) image = "placeholder.jpeg";
  const techLabels = techs.map(getTechnologyLabel);

  return (
    <Card>
      <div>
        <ProjectThumbnail image={image} name={name} links={project.links} />
        <ProjectName>{name}</ProjectName>
        <ProjectDescription description={description} stats={project.stats} />
        <TechStack>{techLabels.join(" · ")}</TechStack>
      </div>
      <ProjectLinks links={project.links} />
    </Card>
  );
};

export default ProjectCard;
