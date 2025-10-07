import styled from "styled-components";
import projects from "../data/projects.json";
import { showAfter } from "../styled/animations";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const Chip = styled.div<{ $clickable?: boolean; $additional?: boolean; $index: number }>`
  background-color: var(--card-background-color);
  background-image: ${(props) => (props.$clickable ? "var(--gradient-techs)" : "none")};
  padding: ${(props) => (props.$clickable ? "5px 8px" : "5px")};
  border-radius: 10px;
  border: ${(props) => (props.$clickable ? "none" : "1px solid var(--border-color)")};
  display: inline-block;
  font-size: 0.9rem;
  cursor: ${(props) => (props.$clickable ? "pointer" : "auto")};
  animation: ${showAfter} ${(props) => (props.$additional ? 0 : props.$index * 0.15 + 0.5)}s ease-in-out;

  &:hover {
    scale: ${(props) => (props.$clickable ? 1.03 : 1)};
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TechsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Technologies = ({ items }: { items?: string[] }) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { t } = useTranslation();

  const getTechsFromProjects = () => {
    const data = projects.projects;
    const techsCount: { [key: string]: number } = data
      .map((project) => project.techs)
      .flat()
      .reduce((acc: { [key: string]: number }, tech: string) => {
        acc[tech] = acc[tech] ? acc[tech] + 1 : 1;
        return acc;
      }, {});
    const techs = Object.entries(techsCount).sort((a, b) => b[1] - a[1]);
    const additionalTechs: string[] = projects.additionalTechs;
    const addedTechs: [string, number][] = additionalTechs.map((tech) => [tech, 1]);
    techs.push(...addedTechs);
    return techs.map((tech) => tech[0]);
  };

  const techs = items ?? getTechsFromProjects();

  const maxVisible = isSmallScreen ? 7 : 15;
  const hasMore = techs.length > maxVisible;
  const displayedTechs = showAll || !hasMore ? techs : techs.slice(0, maxVisible);

  return (
    <TechsContainer>
      {displayedTechs.map((tech, i) => (
        <Chip key={`${tech}-${i}`} $index={i} $additional={i > maxVisible - 1}>
          {tech}
        </Chip>
      ))}
      {hasMore && (
        <Chip $clickable onClick={() => setShowAll(!showAll)} $index={displayedTechs.length}>
          {showAll ? t("presentation.less") : `+${techs.length - displayedTechs.length} ${t("presentation.others")}`}
        </Chip>
      )}
    </TechsContainer>
  );
};

export default Technologies;
