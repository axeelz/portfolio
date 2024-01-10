import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const ProjectDesc = styled.p`
  font-weight: 500;
`;

const Badge = styled.span`
  padding: 0.35em 0.65em;
  font-size: 0.85em;
  background-color: var(--cdfs-color);
  color: white;
  border-radius: 5rem;
  font-weight: 600;
  white-space: nowrap;
`;

const ProjectDescription = ({ desc, stats }) => {
  const { t, i18n } = useTranslation();
  const [stat, setStat] = useState(30000);

  const { fr, en } = desc;
  const description = i18n.language === "fr" ? fr : en;

  useEffect(() => {
    if (stats) {
      const { endpoint, field } = stats;

      fetch(endpoint)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Unable to fetch " + endpoint);
          }
          return response.json();
        })
        .then((data) => {
          const stat = data[field];
          const rounded = Math.floor(stat / 100) * 100;
          setStat(rounded);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <ProjectDesc>
      {description}{" "}
      {stats && (
        <Badge>
          {stat}+ {t("projects.card.users")}
        </Badge>
      )}
    </ProjectDesc>
  );
};

export default ProjectDescription;
