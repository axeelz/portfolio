import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import { fetchProjectStats, QUERY_KEYS } from "../../utils/fetch";
import ProjectStats from "./ProjectStats";

const ProjectDesc = styled("div", {
  base: {
    fontWeight: 500,
    lineHeight: 1.5,
    textWrap: "pretty",
  },
});

type ProjectDescriptionProps = Pick<Project, "description" | "stats">;

const ProjectDescription = ({ description, stats }: ProjectDescriptionProps) => {
  const endpoint = stats?.endpoint;

  const { data: fetchResponse } = useQuery<Record<string, unknown>>({
    queryKey: [QUERY_KEYS.projectStats, endpoint],
    enabled: Boolean(endpoint),
    retry: false,
    queryFn: async () => {
      if (!endpoint) {
        throw new Error("Missing project stats endpoint");
      }

      return fetchProjectStats(endpoint);
    },
  });

  return (
    <ProjectDesc>
      <p>{description}</p>
      <ProjectStats stats={stats} fetchResponse={fetchResponse ?? null} />
    </ProjectDesc>
  );
};

export default ProjectDescription;
