import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Project } from "./Projects";
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
  const [fetchResponse, setFetchResponse] = useState<Record<string, unknown> | null>(null);

  const { fr, en } = desc;
  const description = i18n.languages[0] === "fr" ? fr : en;

  useEffect(() => {
    if (stats) {
      const { endpoint } = stats;

      fetch(endpoint)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Unable to fetch " + endpoint);
          }
          return response.json();
        })
        .then((data) => {
          setFetchResponse(data);
        })
        .catch(() => {
          console.warn(`Error fetching ${endpoint}, fallback to default stats`);
        });
    }
  }, []);

  return (
    <ProjectDesc>
      <p>{description}</p>
      <ProjectStats stats={stats} fetchResponse={fetchResponse} />
    </ProjectDesc>
  );
};

export default ProjectDescription;
