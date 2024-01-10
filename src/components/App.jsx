import Navbar from "./Navbar";
import Projects from "./Projects";
import Footer from "./Footer";
import Contact from "./Contact";
import Presentation from "./Presentation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { fadeBgColor, fadeUp } from "../styled/animations";

const Section = styled.section`
  padding: 2rem;
  border-radius: var(--card-border-radius);
  background-color: var(--section-background-color);
  margin-bottom: 2rem;
  scroll-margin-top: 5rem;

  &#presentation {
    animation: ${fadeBgColor} 0.6s ease-in;
  }

  &#projects {
    animation: ${fadeUp} 0.8s ease;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const App = () => {
  const getTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getTheme);

  const saveTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (isDark) {
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "#000000");
      document.body.classList.add("dark");
      saveTheme("dark");
    } else {
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "#FAF8FF");
      document.body.classList.remove("dark");
      saveTheme("light");
    }
  }, [isDark]);

  useEffect(() => {
    AOS.init();
  }, []);

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <main>
        <Section id="presentation">
          <Presentation />
        </Section>
        <Section id="projects">
          <Projects />
        </Section>
        <Section id="contact" data-aos="fade-up">
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default App;
