import { createFileRoute } from "@tanstack/react-router";
import { styled } from "styled-system/jsx";

import Contact from "../components/Contact";
import Freelance from "../components/freelance/Freelance";
import Garden from "../components/Garden";
import Presentation from "../components/Presentation";
import Projects from "../components/project/Projects";
import SegmentedNav from "../components/SegmentedNav";
import { portfolioData } from "../data/portfolio";
import { SECTION_IDS } from "../data/sections";
import usePortfolioResponse, { portfolioQueryOptions } from "../hooks/usePortfolioResponse";
import { projectStatsQueryOptions } from "../utils/fetch";

const WorkSheet = styled("div", {
  base: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gap: "clamp(4.5rem, 8vw, 7rem)",
    padding:
      "var(--sheet-padding) var(--gutter) calc(clamp(4.5rem, 8vw, 7rem) + var(--sheet-radius))",
    borderRadius: "var(--sheet-radius) var(--sheet-radius) 0 0",
    backgroundColor: "var(--sheet-color)",
    boxShadow: "0 -1px 0 var(--border-color)",
  },
});

const Section = styled("section", {
  base: { minWidth: 0, scrollMarginTop: "var(--sheet-padding)" },
});

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(portfolioQueryOptions).catch((e: unknown) => {
        console.error("[prerender] portfolio fetch failed:", e);
        return undefined;
      }),
      ...portfolioData.projects.flatMap(({ stats }) =>
        stats ? [context.queryClient.prefetchQuery(projectStatsQueryOptions(stats.endpoint))] : [],
      ),
    ]),
  component: Home,
});

function Home() {
  const { data } = usePortfolioResponse();

  return (
    <>
      <Presentation />
      <main>
        <WorkSheet>
          <Section id={SECTION_IDS.FREELANCE} tabIndex={-1}>
            <Freelance clients={data?.freelance ?? []} />
          </Section>
          <Section id={SECTION_IDS.PROJECTS} tabIndex={-1}>
            <Projects />
          </Section>
        </WorkSheet>
        <Garden />
        <Contact />
      </main>
      <SegmentedNav />
    </>
  );
}
