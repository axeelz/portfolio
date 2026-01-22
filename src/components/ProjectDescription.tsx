import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import type { Project } from "./Projects";

import { fetchProjectStats, QUERY_KEYS } from "../utils/fetch";
import ProjectStats from "./ProjectStats";

const ProjectDesc = styled.div`
  font-weight: 500;
  line-height: 1.5;
  text-wrap: pretty;
`;

interface ProjectDescriptionProps {
  desc: { fr: Project["desc_fr"]; en: Project["desc_en"] };
  stats: Project["stats"];
}

const ProjectDescription = ({ desc, stats }: ProjectDescriptionProps) => {
  const { i18n } = useTranslation();

  const { fr, en } = desc;
  const description = i18n.languages[0] === "fr" ? fr : en;
  const endpoint = stats?.endpoint;

  const { data: fetchResponse } = useQuery<Record<string, unknown>>({
    queryKey: [QUERY_KEYS.projectStats, endpoint],
    enabled: Boolean(endpoint),
    retry: false,
    queryFn: () => fetchProjectStats(endpoint!),
  });

  return (
    <ProjectDesc>
      <p>{description}</p>
      <ProjectStats stats={stats} fetchResponse={fetchResponse ?? null} />
    </ProjectDesc>
  );
};

export default ProjectDescription;
