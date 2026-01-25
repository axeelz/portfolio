import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";

import { showAfter, trackingInExpand } from "../styled/animations";
import { BodyContainer, Button } from "../styled/shared";
import { playButtonClick } from "../utils/sounds";
import Technologies from "./Technologies";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  animation: ${trackingInExpand} 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s both;
  margin-bottom: 2rem;
  text-align: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SecondaryTitle = styled.h2`
  padding: 0;
  margin: -0.7rem 0 0 0;
  color: var(--text-secondary);
  font-size: 1.75rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-top: 0;
  }
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const CallToAction = styled(Button)`
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  padding: 0.75rem 2rem;
  display: block;
  width: 100%;
  animation: ${showAfter} 1.5s ease-in-out;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 60px -10px var(--button-background-color);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    width: fit-content;
    padding: 0.75rem 5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SecondaryCallToAction = styled(CallToAction)`
  background-color: var(--button-background-secondary);
  color: var(--button-text-secondary);
  border: 1px solid var(--secondary-border-color);
`;

const Presentation = () => {
  const { t } = useTranslation();

  return (
    <div>
      <TitleContainer>
        <Title>Axel Zareb</Title>
        <SecondaryTitle>{t("presentation.title")}</SecondaryTitle>
      </TitleContainer>
      <BodyContainer>
        <span>{t("presentation.about")}</span>
        <p>
          {t("presentation.part1")}{" "}
          <Trans
            i18nKey="presentation.part2"
            components={{
              sct: (
                <a
                  key="sct"
                  href="https://www.sncf-connect-tech.fr/"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
              upc: <a key="upc" href="https://u-paris.fr/" target="_blank" rel="noreferrer" />,
            }}
          />
        </p>
      </BodyContainer>
      <BodyContainer>
        <span>Technologies</span>
        <Technologies />
      </BodyContainer>
      <CallToActionContainer>
        <CallToAction
          onClick={() => {
            playButtonClick();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("presentation.seeProjects")}
        </CallToAction>
        <SecondaryCallToAction
          onClick={() => {
            playButtonClick();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("presentation.contactMe")}
        </SecondaryCallToAction>
      </CallToActionContainer>
    </div>
  );
};

export default Presentation;
