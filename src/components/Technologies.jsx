import styled from "styled-components";
import projects from "../data/projects.json";
import { showAfter } from "../styled/animations";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const Chip = styled.div`
  background-color: var(--card-background-color);
  background-image: ${(props) =>
    props.$clickable ? "linear-gradient(to top, transparent, hsl(0 0% 100% / 0.2))" : "none"};
  padding: ${(props) => (props.$clickable ? "5px 8px" : "5px")};
  border-radius: 10px;
  display: inline-block;
  font-size: 0.9rem;
  cursor: ${(props) => (props.$clickable ? "pointer" : "crosshair")};
  animation: ${showAfter} ${(props) => (props.$additional ? 0 : props.index * 0.15 + 0.5)}s ease-in-out;

  &:hover {
    scale: ${(props) => (props.$clickable ? 1.03 : 1)};
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
  const [showAll, setShowAll] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

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
    // Add additional techs to the list
    techs.push(...additionalTechs.map((tech) => [tech, 1]));
    return techs.map((tech) => tech[0]);
  };

  const techs = getTechs();
  const maxTechs = isSmallScreen ? 7 : 15;
  const displayedTechs = showAll ? techs : techs.slice(0, maxTechs);
  const remainingTechsCount = techs.length - displayedTechs.length;

  return (
    <TechsContainer>
      {displayedTechs.map((tech, i) => (
        <Chip key={tech} index={i} $additional={i > maxTechs - 1}>
          {tech}
        </Chip>
      ))}
      <Chip $clickable onClick={() => setShowAll(!showAll)} index={displayedTechs.length}>
        {showAll ? "Moins" : `+${remainingTechsCount} autres`}
      </Chip>
    </TechsContainer>
  );
};

export default Technologies;
