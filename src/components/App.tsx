import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";
import styled from "styled-components";

import { fadeBgColor, fadeUp } from "../styled/animations";
import { squircle } from "../styled/shared";
import About from "./About";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Presentation from "./Presentation";
import Projects from "./Projects";

const queryClient = new QueryClient();

const Section = styled.section`
  padding: 2rem;
  ${squircle("lg")}
  background-color: var(--section-background-color);
  margin-bottom: 2rem;
  scroll-margin-top: 5rem;

  &#presentation {
    @media (prefers-reduced-motion: no-preference) {
      animation: ${fadeBgColor} 0.6s ease-in;
    }
  }

  &#projects {
    @media (prefers-reduced-motion: no-preference) {
      animation: ${fadeUp} 0.8s ease;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navbar />
        <main>
          <Section id="presentation">
            <Presentation />
          </Section>
          <Section id="projects">
            <Projects />
          </Section>
          <Section id="about">
            <About />
          </Section>
        </main>
        <Footer />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
