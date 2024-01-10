import styled from "styled-components";
import { Button } from "../styled/shared";
import { Trans, useTranslation } from "react-i18next";
import { showAfter, trackingInExpand } from "../styled/animations";
import Technologies from "./Technologies";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  animation: ${trackingInExpand} 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s both;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: var(--font-title);
  font-size: 2.25rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SecondaryTitle = styled.h2`
  padding: 0;
  margin: -0.7rem 0 0 0;
  color: var(--text-secondary);
  font-size: 1.75rem;
  font-weight: 500;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-top: 0;
  }
`;

const BodyContainer = styled.div`
  font-weight: 500;
  font-size: 1.15rem;
  animation: ${showAfter} 1s ease-in-out;

  border: var(--border-color) 2px solid;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: var(--card-border-radius);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  & > span {
    color: var(--text-secondary);
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    display: block;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  & a {
    text-decoration: underline;
    color: var(--text-color);
    margin: 0 0.1rem;
    padding: 5px;
    border-radius: 10px;
    transition: all 0.2s;

    &:hover {
      background-color: var(--card-background-color);
      text-decoration: none;
    }
  }
`;

const CallToAction = styled(Button)`
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  margin: 1.5rem auto 0 auto;
  padding: 0.75rem 2rem;
  display: block;
  width: 100%;

  animation: ${showAfter} 1.5s ease-in-out;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 80px -10px var(--button-background-color);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    width: fit-content;
    padding: 0.75rem 5rem;
  }
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
          {t("presentation.part1")}
          <br />
          <Trans i18nKey="presentation.part2">
            Je suis en troisième année de licence d'informatique à
            <a href="https://www.sorbonne-universite.fr/" target="_blank">
              Sorbonne&nbsp;Université
            </a>
            à Paris.
          </Trans>
        </p>
      </BodyContainer>
      <BodyContainer>
        <span>Technologies</span>
        <Technologies />
      </BodyContainer>
      <CallToAction onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
        {t("presentation.seeProjects")}
      </CallToAction>
    </div>
  );
};

export default Presentation;
