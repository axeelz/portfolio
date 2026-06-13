import { TooltipProvider } from "@radix-ui/react-tooltip";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { styled } from "styled-system/jsx";

import About from "../components/About";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Presentation from "../components/Presentation";
import Projects from "../components/project/Projects";
import SegmentedNav from "../components/SegmentedNav";
import { squircle } from "../components/ui/shared";
import { SECTION_IDS } from "../data/sections";
import { portfolioQueryOptions } from "../hooks/usePortfolioResponse";

const Section = styled("section", {
  base: {
    padding: "2rem",
    ...squircle("lg"),
    backgroundColor: "var(--section-background-color)",
    marginBottom: "2rem",
    scrollMarginTop: "1rem",
    mdDown: { padding: "2rem 1rem" },
  },
  variants: {
    section: {
      projects: {
        "@media (prefers-reduced-motion: no-preference)": {
          animation: "fadeUp 0.5s ease-out both",
        },
      },
    },
  },
});

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(portfolioQueryOptions).catch((e: unknown) => {
      console.error("[prerender] portfolio fetch failed:", e);
      return undefined;
    }),
  component: Home,
});

function Home() {
  return (
    <TooltipProvider>
      <Navbar />
      <main>
        <Section id={SECTION_IDS.PRESENTATION}>
          <Presentation />
        </Section>
        <Section id={SECTION_IDS.PROJECTS} section="projects">
          <Projects />
        </Section>
        <Section id={SECTION_IDS.ABOUT}>
          <About />
        </Section>
      </main>
      <Footer />
      <SegmentedNav />
      <Toaster />
    </TooltipProvider>
  );
}
