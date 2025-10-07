import styled from "styled-components";
import ProjectButtons from "./ProjectButtons";
import ProjectThumbnail from "./ProjectThumbnail";
import ProjectDescription from "./ProjectDescription";
import type { Project } from "./Projects";

const Card = styled.div`
  background-color: var(--card-background-color);
  border-radius: var(--card-border-radius);
  border: 2px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  max-width: 480px;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 830px) {
    max-width: unset;
    padding: 2rem;
  }
`;

const NameDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
`;

const ProjectName = styled.h3`
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
`;

const ProjectDate = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
  white-space: nowrap;
`;

const TechStack = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-weight: 600;
`;

const ProjectCard = ({ project }: { project: Project }) => {
  const { name, date, techs, desc_fr, desc_en } = project;
  let { image } = project;
  if (!image) image = "placeholder.jpeg";

  return (
    <Card>
      <div>
        <ProjectThumbnail image={image} name={name} links={project.links} />
        <NameDateContainer>
          <ProjectName>{name}</ProjectName>
          <ProjectDate>{date}</ProjectDate>
        </NameDateContainer>
        <ProjectDescription desc={{ fr: desc_fr, en: desc_en }} stats={project.stats} />
        <TechStack>{techs.join(" · ")}</TechStack>
      </div>
      <div>
        <ProjectButtons links={project.links} />
      </div>
    </Card>
  );
};

export default ProjectCard;
