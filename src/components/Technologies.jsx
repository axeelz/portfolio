import styled from "styled-components";
import projects from "../data/projects.json";
import { showAfter } from "../styled/animations";

const Chip = styled.div`
  background-color: var(--card-background-color);
  padding: 5px;
  border-radius: 10px;
  display: inline-block;
  font-size: 0.9rem;
  cursor: crosshair;
  animation: ${showAfter} ${(props) => props.index * 0.15 + 0.5}s ease-in-out;

  &:hover {
    scale: 1.03;
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TechsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Technologies = () => {
  const getTechs = () => {
    const data = projects.projects;
    // Get techs with how many times they appear
    const techsCount = data
      .map((project) => project.techs)
      .flat()
      .reduce((acc, tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
        return acc;
      }, {});
    // Sort techs by how many times they appear
    const techs = Object.entries(techsCount).sort((a, b) => b[1] - a[1]);
    const additionalTechs = ["Git", "Mapbox", "Firebase", "Linux", "Java"];
    // Add additional techs to beginning of techs array
    techs.push(...additionalTechs.map((tech) => [tech, 0]));
    return techs.map((tech) => tech[0]);
  };
  const techs = getTechs();

  return (
    <TechsContainer>
      {techs.map((tech, i) => (
        <Chip key={tech} index={i}>
          {tech}
        </Chip>
      ))}
    </TechsContainer>
  );
};

export default Technologies;
