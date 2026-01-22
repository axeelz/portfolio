import { useTranslation } from "react-i18next";
import styled from "styled-components";

import type { Project } from "./Projects";

import { Button } from "../styled/shared";

const TwoButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const StandardButton = styled(Button)`
  flex-grow: 1;
`;

const PrimaryButton = styled(StandardButton)`
  background-color: var(--button-background-color);
  color: var(--button-text-color);
`;

const SecondaryButton = styled(StandardButton)`
  background-color: var(--button-background-secondary);
  color: var(--button-text-secondary);
  border: 1px solid var(--button-background-color);
`;

const FullWidthButton = styled(PrimaryButton)`
  width: 100%;
`;

interface ProjectButtonsProps {
  links: Project["links"];
}

const ProjectButtons = ({ links }: ProjectButtonsProps) => {
  const { t } = useTranslation();
  const { url, source } = links;

  return (
    <>
      {url && source ? (
        <TwoButtonsContainer>
          <SecondaryButton as="a" href={source} target="_blank">
            {t("projects.card.source")}
          </SecondaryButton>
          <PrimaryButton as="a" href={url} target="_blank">
            {t("projects.card.website")}
          </PrimaryButton>
        </TwoButtonsContainer>
      ) : (
        <FullWidthButton as="a" href={url ?? source} target="_blank">
          {url ? t("projects.card.website") : t("projects.card.source")}
        </FullWidthButton>
      )}
    </>
  );
};

export default ProjectButtons;
