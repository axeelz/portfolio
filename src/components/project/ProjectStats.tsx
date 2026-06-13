import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

const numberFormatter = new Intl.NumberFormat("en");

const StatsContainer = styled("div", {
  base: {
    display: "flex",
    gap: "0.25rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.25rem",
    flexWrap: "wrap",
  },
});

const Badge = styled("span", {
  base: {
    padding: "0.35em 0.45em",
    fontSize: "0.85em",
    fontVariantNumeric: "tabular-nums",
    backgroundColor: "var(--stats-badge-color)",
    backgroundImage: "linear-gradient(to top, transparent, hsl(0 0% 100% / 0.2))",
    color: "white",
    borderRadius: "var(--radius-full)",
    fontWeight: 600,
    whiteSpace: "nowrap",
    md: {
      padding: "0.35em 0.65em",
    },
  },
});

interface ProjectStatsProps {
  stats: Project["stats"];
  fetchResponse: Record<string, unknown> | null;
}

const ProjectStats = ({ stats, fetchResponse }: ProjectStatsProps) => {
  if (!stats) {
    return null;
  }

  return (
    <StatsContainer>
      {stats.fields.map((field) => {
        const label = field.label;
        let stat: number = field.default;
        const value = fetchResponse?.[field.field];
        if (typeof value === "number") {
          stat = value;
        }
        const formattedStat = numberFormatter.format(stat);

        return (
          <Badge key={field.field}>
            {formattedStat} {label}
          </Badge>
        );
      })}
    </StatsContainer>
  );
};

export default ProjectStats;
