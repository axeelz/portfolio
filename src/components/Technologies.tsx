import styled from "styled-components";
import projects from "../data/projects.json";
import { showAfter } from "../styled/animations";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const Chip = styled.div<{ $clickable?: boolean; $additional?: boolean; index: number }>`
  background-color: var(--card-background-color);
  background-image: ${(props) => (props.$clickable ? "var(--gradient-techs)" : "none")};
  padding: ${(props) => (props.$clickable ? "5px 8px" : "5px")};
  border-radius: 10px;
  border: ${(props) => (props.$clickable ? "none" : "1px solid var(--border-color)")};
  display: inline-block;
  font-size: 0.9rem;
  cursor: ${(props) => (props.$clickable ? "pointer" : "auto")};
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
  const [showAll, setShowAll] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { t } = useTranslation();

  const getTechs = () => {
    const data = projects.projects;
    // Get techs with how many times they appear
    const techsCount: { [key: string]: number } = data
      .map((project) => project.techs)
      .flat()
      .reduce((acc: { [key: string]: number }, tech: string) => {
        acc[tech] = acc[tech] ? acc[tech] + 1 : 1;
        return acc;
      }, {});
    // Sort techs by how many times they appear
    const techs = Object.entries(techsCount).sort((a, b) => b[1] - a[1]);
    // Additional techs to add to the list
    const additionalTechs: string[] = projects.additionalTechs;
    const addedTechs: [string, number][] = additionalTechs.map((tech) => [tech, 1]);
    techs.push(...addedTechs);
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
        {showAll ? t("presentation.less") : `+${remainingTechsCount} ${t("presentation.others")}`}
      </Chip>
    </TechsContainer>
  );
};

export default Technologies;
