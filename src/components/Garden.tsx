import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import { portfolioData } from "../data/portfolio";
import { SECTION_IDS } from "../data/sections";
import usePortfolioResponse from "../hooks/usePortfolioResponse";
import {
  Block,
  BlockLabel,
  Lead,
  SectionHead,
  SectionTitle,
  stackedSheet,
  TextLinks,
} from "./ui/shared";
import DockWidget from "./widgets/DockWidget";
import MusicWidget from "./widgets/MusicWidget";

const Sheet = styled("section", {
  base: {
    ...stackedSheet,
    "--text-color": "var(--garden-text)",
    "--text-secondary": "var(--garden-secondary)",
    "--soft-color": "var(--garden-soft)",
    "--border-color": "var(--garden-border)",
    "--sheet-color": "var(--garden-background)",
    zIndex: 2,
    paddingBottom: "calc(clamp(4rem, 7vw, 6rem) + var(--sheet-radius))",
    backgroundColor: "var(--garden-background)",
    color: "var(--text-color)",
    _before: {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      backgroundImage: "radial-gradient(var(--border-color) 1.3px, transparent 1.3px)",
      backgroundSize: "18px 18px",
      maskImage: "linear-gradient(#000, transparent 340px)",
      pointerEvents: "none",
    },
    "& > *": { position: "relative" },
  },
});

const Layout = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
    gap: "clamp(3rem, 5vw, 4.5rem) clamp(2rem, 5vw, 5rem)",
    mdDown: { gridTemplateColumns: "minmax(0, 1fr)" },
  },
});

const Side = styled("div", {
  base: {
    display: "grid",
    alignContent: "start",
    gap: "clamp(2rem, 4vw, 3rem)",
  },
});

const Chips = styled("ul", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    "& li": {
      padding: "0.2rem 0.65rem",
      borderRadius: "var(--radius-full)",
      backgroundColor: "var(--soft-color)",
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
});

const DockBlock = styled(Block, {
  base: {
    gridColumn: "1 / -1",
    justifyItems: "center",
    textAlign: "center",
    "& > h3": { transition: "opacity 150ms ease" },
    // The app's name appears right over this label, so the label steps aside.
    "&:has(button:hover) > h3, &:has(button:focus-visible) > h3": { opacity: 0 },
  },
});

const Garden = () => {
  const { data } = usePortfolioResponse();
  const tools = data?.tools ?? [];
  const dockItems = data?.dock ?? [];

  return (
    <Sheet id={SECTION_IDS.GARDEN} tabIndex={-1}>
      <SectionHead>
        <SectionTitle>{copy.garden.title}</SectionTitle>
        <Lead>{copy.garden.pitch}</Lead>
      </SectionHead>

      <Layout>
        <MusicWidget />

        <Side>
          {tools.length > 0 && (
            <Block>
              <BlockLabel>{copy.garden.tools}</BlockLabel>
              <TextLinks>
                {tools.map(({ name, link }) => (
                  <li key={name}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {name}
                    </a>
                  </li>
                ))}
              </TextLinks>
            </Block>
          )}
          <Block>
            <BlockLabel>{copy.garden.builtWith}</BlockLabel>
            <Chips>
              {portfolioData.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </Chips>
          </Block>
        </Side>

        {dockItems.length > 0 && (
          <DockBlock>
            <BlockLabel>{copy.garden.dock}</BlockLabel>
            <DockWidget items={dockItems} />
          </DockBlock>
        )}
      </Layout>
    </Sheet>
  );
};

export default Garden;
