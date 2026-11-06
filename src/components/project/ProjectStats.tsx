import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import { projectStatsQueryOptions } from "../../utils/fetch";

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
    padding: "0.25em 0.6em",
    fontSize: "0.85em",
    fontVariantNumeric: "tabular-nums",
    border: "1px solid var(--secondary-border-color)",
    borderRadius: "var(--radius-full)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
});

const ProjectStats = ({ stats }: { stats: NonNullable<Project["stats"]> }) => {
  const { data } = useQuery(projectStatsQueryOptions(stats.endpoint));

  return (
    <StatsContainer>
      {stats.fields.map((field) => {
        const label = field.label;
        let stat: number = field.default;
        const value = data?.[field.field];
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
