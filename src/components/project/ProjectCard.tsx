import { styled } from "styled-system/jsx";

import { getTechnologyLabel, type Project } from "../../data/portfolio";
import { squircle } from "../ui/shared";
import ProjectButtons from "./ProjectButtons";
import ProjectDescription from "./ProjectDescription";
import ProjectThumbnail from "./ProjectThumbnail";

const Card = styled("div", {
  base: {
    backgroundColor: "var(--card-background-color)",
    ...squircle("lg"),
    border: "1px solid var(--surface-outline-color)",
    boxShadow: "var(--surface-shadow)",
    padding: "1.5rem",
    maxWidth: "480px",
    wordBreak: "break-word",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    lg: {
      maxWidth: "unset",
      padding: "2rem",
    },
  },
});

const NameDateContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "0.3rem",
  },
});

const ProjectName = styled("h3", {
  base: {
    fontFamily: "var(--font-title)",
    fontWeight: 700,
    fontSize: "1.25rem",
    margin: 0,
  },
});

const ProjectDate = styled("p", {
  base: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
});

const TechStack = styled("p", {
  base: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
    color: "var(--text-secondary)",
    fontWeight: 600,
  },
});

const ProjectCard = ({ project }: { project: Project }) => {
  const { name, date, techs, description } = project;
  let { image } = project;
  if (!image) image = "placeholder.jpeg";
  const techLabels = techs.map(getTechnologyLabel);

  return (
    <Card>
      <div>
        <ProjectThumbnail image={image} name={name} links={project.links} />
        <NameDateContainer>
          <ProjectName>{name}</ProjectName>
          <ProjectDate>{date}</ProjectDate>
        </NameDateContainer>
        <ProjectDescription description={description} stats={project.stats} />
        <TechStack>{techLabels.join(" · ")}</TechStack>
      </div>
      <div>
        <ProjectButtons links={project.links} />
      </div>
    </Card>
  );
};

export default ProjectCard;
