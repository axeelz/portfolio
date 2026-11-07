import { useEffect, useRef, useState } from "react";
import { styled } from "styled-system/jsx";

import { SECTIONS } from "../data/sections";
import useMediaQuery from "../hooks/useMediaQuery";
import { scrollToSection } from "../utils/scroll";
import { playNavClick } from "../utils/sounds";
import ToggleDarkMode from "./ToggleDarkMode";

const NavContainer = styled("nav", {
  base: {
    position: "fixed",
    bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
    left: "50%",
    zIndex: 1000,
    transform: "translateX(-50%)",
  },
});

const NavList = styled("ul", {
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "4px",
    borderRadius: "var(--radius-full)",
    backgroundColor: "var(--sheet-color)",
    boxShadow: "var(--nav-shadow), inset 0 0 0 1px var(--border-color)",
    _before: {
      content: '""',
      position: "absolute",
      top: "4px",
      bottom: "4px",
      left: "var(--indicator-left)",
      width: "var(--indicator-width)",
      borderRadius: "var(--radius-full)",
      backgroundColor: "var(--nav-indicator-color)",
      opacity: "var(--indicator-opacity, 0)",
      pointerEvents: "none",
      transition: "left 300ms var(--ease-out), width 300ms var(--ease-out), opacity 200ms ease",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
});

const NavItem = styled("li", {
  base: { position: "relative", zIndex: 1 },
});

const NavLink = styled("a", {
  base: {
    display: "grid",
    placeItems: "center",
    height: "2.5rem",
    padding: "0 0.75rem",
    borderRadius: "var(--radius-full)",
    fontSize: "0.8125rem",
    fontWeight: 500,
    textDecoration: "none",
    whiteSpace: "nowrap",
    userSelect: "none",
    transition: "color 160ms ease, transform 160ms var(--ease-out)",
    _canHover: { _hover: { color: "var(--text-color)" } },
    _active: { transform: "scale(0.96)" },
  },
  variants: {
    active: {
      true: { color: "var(--text-color)" },
      false: { color: "var(--text-secondary)" },
    },
  },
});

const updateIndicator = (
  navList: HTMLUListElement | null,
  links: Map<string, HTMLAnchorElement>,
  sectionId: string | null,
) => {
  const link = sectionId ? links.get(sectionId) : undefined;
  navList?.style.setProperty("--indicator-opacity", link ? "1" : "0");

  const item = link?.parentElement;
  if (item) {
    navList?.style.setProperty("--indicator-left", `${item.offsetLeft}px`);
    navList?.style.setProperty("--indicator-width", `${item.offsetWidth}px`);
  }
};

const SegmentedNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number>(0);
  const navListRef = useRef<HTMLUListElement>(null);
  const linksRef = useRef(new Map<string, HTMLAnchorElement>());
  const supportsHover = useMediaQuery("(hover: hover)");

  useEffect(() => {
    const syncIndicator = () =>
      updateIndicator(navListRef.current, linksRef.current, activeSection);

    syncIndicator();
    window.addEventListener("resize", syncIndicator);
    return () => window.removeEventListener("resize", syncIndicator);
  }, [activeSection]);

  useEffect(() => {
    // The line sits below the middle: the last sheet can be shorter than half a phone screen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach(({ isIntersecting, target: { id } }) => {
          if (isIntersecting) setActiveSection(id);
          else setActiveSection((current) => (current === id ? null : current));
        });
      },
      { rootMargin: "-55% 0px -45% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.clearTimeout(scrollTimeoutRef.current);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    void playNavClick();
    setActiveSection(sectionId);
    scrollToSection(sectionId);

    isScrollingRef.current = true;
    window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <NavContainer aria-label="Sections">
      <NavList ref={navListRef}>
        {SECTIONS.map(({ id, label }) => (
          <NavItem
            key={id}
            onMouseEnter={() => {
              if (supportsHover) updateIndicator(navListRef.current, linksRef.current, id);
            }}
            onMouseLeave={() => {
              if (supportsHover)
                updateIndicator(navListRef.current, linksRef.current, activeSection);
            }}
          >
            <NavLink
              ref={(element: HTMLAnchorElement | null) => {
                if (element) linksRef.current.set(id, element);
                else linksRef.current.delete(id);
              }}
              href={`#${id}`}
              active={activeSection === id}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(id);
              }}
            >
              {label}
            </NavLink>
          </NavItem>
        ))}
        <NavItem>
          <ToggleDarkMode />
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default SegmentedNav;
