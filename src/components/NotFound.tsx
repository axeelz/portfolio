import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import ParisTime from "./ParisTime";
import { Bio, Hero, Name, NameBox, Top } from "./Presentation";
import Sky from "./Sky";

const Page = styled(Hero, {
  base: { minHeight: "100svh", paddingBottom: "1.5rem" },
});

const Title = styled(Name, {
  base: { "--fit": "4.28", mdDown: { "--fit": "2.5" } },
});

// Matches what the sky draws: clouds by day, stars in dark mode.
const DayWord = styled("span", { base: { _dark: { display: "none" } } });
const NightWord = styled("span", { base: { display: "none", _dark: { display: "inline" } } });

const NotFound = () => {
  const leadRef = useRef<HTMLParagraphElement>(null);

  return (
    <Page as="main">
      <title>{copy.notFound.title}</title>
      <meta name="robots" content="noindex" />
      <Sky until={leadRef} />
      <Top>
        <span>{copy.notFound.label}</span>
        <ParisTime />
      </Top>
      <Bio ref={leadRef}>
        {copy.notFound.lead} <DayWord>{copy.notFound.clouds}</DayWord>
        <NightWord>{copy.notFound.stars}</NightWord>. <Link to="/">{copy.notFound.home}</Link>.
      </Bio>
      <NameBox>
        <Title>
          <span>Not</span> <span>found</span>
        </Title>
      </NameBox>
    </Page>
  );
};

export default NotFound;
