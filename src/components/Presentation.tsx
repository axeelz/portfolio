import { styled } from "styled-system/jsx";

import { BodyContainer, Button } from "../components/ui/shared";
import { bioParagraph, copy } from "../data/copy";
import usePortfolioResponse from "../hooks/usePortfolioResponse";
import { playButtonClick } from "../utils/sounds";
import Technologies from "./Technologies";

const TitleContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    animation: "fadeUp 0.35s ease-out both",
    marginBottom: "2rem",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

const Title = styled("h1", {
  base: {
    fontFamily: "var(--font-title)",
    fontSize: "clamp(2.75rem, 7vw, 5rem)",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },
});

const SecondaryTitle = styled("h2", {
  base: {
    padding: 0,
    margin: "0.4rem 0 0 0",
    color: "var(--text-secondary)",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
});

const CardsStack = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

const CallToActionContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "0.75rem",
    flexWrap: "wrap",
    marginTop: "2rem",
    animation: "fadeUp 0.4s ease-out 0.25s both",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

const CallToAction = styled(Button, {
  base: {
    backgroundColor: "var(--button-background-color)",
    color: "var(--button-text-color)",
    padding: "0.75rem 2rem",
    display: "block",
    width: "100%",
    md: {
      width: "fit-content",
      padding: "0.75rem 5rem",
    },
  },
});

const SecondaryCallToAction = styled(CallToAction, {
  base: {
    backgroundColor: "var(--button-background-secondary)",
    color: "var(--button-text-secondary)",
    border: "1px solid var(--secondary-border-color)",
  },
});

const Presentation = () => {
  const { data: portfolioResponse } = usePortfolioResponse();
  const age = portfolioResponse?.age;

  return (
    <div>
      <TitleContainer>
        <Title>Axel Zareb</Title>
        <SecondaryTitle>{copy.presentation.title}</SecondaryTitle>
      </TitleContainer>
      <CardsStack>
        <BodyContainer style={{ animationDelay: "0.1s" }}>
          <span>{copy.presentation.about}</span>
          <p>
            {typeof age === "number" ? (
              <>I'm {age} years old and I live in the Paris area. </>
            ) : (
              <>I live in the Paris area. </>
            )}
            {bioParagraph.map((seg) =>
              "href" in seg ? (
                <a key={seg.href} href={seg.href} target="_blank" rel="noreferrer">
                  {seg.label}
                </a>
              ) : (
                <span key={seg.text}>{seg.text}</span>
              ),
            )}
          </p>
        </BodyContainer>
        <BodyContainer style={{ animationDelay: "0.18s" }}>
          <span>Technologies</span>
          <Technologies showIcons />
        </BodyContainer>
      </CardsStack>
      <CallToActionContainer>
        <CallToAction
          onClick={() => {
            void playButtonClick();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {copy.presentation.seeProjects}
        </CallToAction>
        <SecondaryCallToAction
          onClick={() => {
            void playButtonClick();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {copy.presentation.contactMe}
        </SecondaryCallToAction>
      </CallToActionContainer>
    </div>
  );
};

export default Presentation;
