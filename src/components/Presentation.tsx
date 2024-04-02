import styled from "styled-components";
import { Button } from "../styled/shared";
import { Trans, useTranslation } from "react-i18next";
import { showAfter, trackingInExpand } from "../styled/animations";
import Technologies from "./Technologies";
// @ts-ignore: Library is not typed
import useSound from "use-sound";

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
    text-underline-offset: 4px;
    color: var(--text-color);
    margin: 0 0.1rem;
    padding: 5px;
    border-radius: 10px;
    transition: all 0.2s;

    @media (min-width: 768px) {
      &:hover {
        background-color: var(--card-background-color);
        text-decoration: none;
      }
    }

    @media (max-width: 768px) {
      padding: 0;
    }
  }
`;

const CallToActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
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

const SecondaryCallToAction = styled(CallToAction)`
  background-color: var(--button-background-secondary);
  color: var(--button-text-secondary);
  border: 1px solid var(--secondary-border-color);
`;

const LineBreakHiddenOnMobile = styled.br`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Presentation = () => {
  const { t } = useTranslation();
  const [playSound] = useSound("/sounds/pop.mp3", { volume: 0.2 });

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
          <LineBreakHiddenOnMobile />{" "}
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
      <CallToActionContainer>
        <CallToAction
          onClick={() => {
            playSound();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}>
          {t("presentation.seeProjects")}
        </CallToAction>
        <SecondaryCallToAction
          onClick={() => {
            playSound();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}>
          {t("presentation.contactMe")}
        </SecondaryCallToAction>
      </CallToActionContainer>
    </div>
  );
};

export default Presentation;
