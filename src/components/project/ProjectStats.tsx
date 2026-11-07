import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import usePlayOnceInView from "../../hooks/usePlayOnceInView";
import { projectStatsQueryOptions } from "../../utils/fetch";
import RollingNumber, { rollOnPlay } from "../ui/RollingNumber";

const StatsContainer = styled("div", {
  base: {
    ...rollOnPlay,
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem 1.75rem",
  },
});

const Stat = styled("div", {
  base: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
  },
});

const Value = styled("b", {
  base: {
    color: "var(--text-color)",
    fontFamily: "var(--font-title)",
    fontSize: "1.25rem",
    letterSpacing: "-0.02em",
  },
});

const ProjectStats = ({ stats }: { stats: NonNullable<Project["stats"]> }) => {
  const { data } = useQuery(projectStatsQueryOptions(stats.endpoint));
  const containerRef = usePlayOnceInView<HTMLDivElement>(0.1);

  return (
    <StatsContainer ref={containerRef}>
      {stats.fields.map(({ field, label, default: fallback }) => {
        const value = data?.[field];

        return (
          <Stat key={field}>
            <Value>
              <RollingNumber value={typeof value === "number" ? value : fallback} />
            </Value>
            {label}
          </Stat>
        );
      })}
    </StatsContainer>
  );
};

export default ProjectStats;
