import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import { copy } from "../../data/copy";
import { buttonBase } from "../ui/shared";

const TwoButtonsContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
});

const StandardLink = styled("a", {
  base: {
    ...buttonBase,
    flexGrow: 1,
  },
});

const PrimaryLink = styled(StandardLink, {
  base: {
    backgroundColor: "var(--button-background-color)",
    color: "var(--button-text-color)",
  },
});

const SecondaryLink = styled(StandardLink, {
  base: {
    backgroundColor: "var(--button-background-secondary)",
    color: "var(--button-text-secondary)",
    border: "1px solid var(--button-background-color)",
  },
});

const FullWidthLink = styled(PrimaryLink, {
  base: {
    width: "100%",
  },
});

interface ProjectButtonsProps {
  links: Project["links"];
}

const ProjectButtons = ({ links }: ProjectButtonsProps) => {
  const { url, source } = links;

  return (
    <>
      {url && source ? (
        <TwoButtonsContainer>
          <PrimaryLink href={url} target="_blank">
            {copy.projects.card.website}
          </PrimaryLink>
          <SecondaryLink href={source} target="_blank">
            {copy.projects.card.source}
          </SecondaryLink>
        </TwoButtonsContainer>
      ) : (
        <FullWidthLink href={url ?? source} target="_blank">
          {url ? copy.projects.card.website : copy.projects.card.source}
        </FullWidthLink>
      )}
    </>
  );
};

export default ProjectButtons;
