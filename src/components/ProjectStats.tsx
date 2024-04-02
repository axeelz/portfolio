import styled from "styled-components";
import type { Project } from "./Projects";
import { useTranslation } from "react-i18next";

const StatsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 0.35em 0.65em;
  font-size: 0.85em;
  background-color: var(--cdfs-color);
  background-image: linear-gradient(to top, transparent, hsl(0 0% 100% / 0.2));
  color: white;
  border-radius: 5rem;
  font-weight: 600;
  white-space: nowrap;
`;

interface ProjectStatsProps {
  stats: Project["stats"];
  fetchResponse: any;
}

const ProjectStats = ({ stats, fetchResponse }: ProjectStatsProps) => {
  const { i18n } = useTranslation();

  if (!stats) {
    return null;
  }

  return (
    <StatsContainer>
      {stats.fields.map((field, index) => {
        const label = i18n.languages[0] === "fr" ? field.label_fr : field.label_en;
        let stat: number = field.default;
        if (fetchResponse && fetchResponse[field.field]) {
          stat = fetchResponse[field.field];
        }
        // const roundedStat = Math.floor(stat / 100) * 100;
        const fomattedStat = new Intl.NumberFormat().format(stat);

        return (
          <Badge key={index}>
            {fomattedStat} {label}
          </Badge>
        );
      })}
    </StatsContainer>
  );
};

export default ProjectStats;
