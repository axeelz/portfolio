import Navbar from "./Navbar";
import Projects from "./Projects";
import Footer from "./Footer";
import Contact from "./Contact";
import Presentation from "./Presentation";
import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { fadeBgColor, fadeUp } from "../styled/animations";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";

const Section = styled.section`
  padding: 2rem;
  border-radius: var(--card-border-radius);
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
    <TooltipProvider>
      <Navbar />
      <main>
        <Section id="presentation">
          <Presentation />
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="contact">
          <Contact />
        </Section>
      </main>
      <Footer />
      <Toaster />
    </TooltipProvider>
  );
};

export default App;
