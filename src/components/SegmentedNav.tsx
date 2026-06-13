import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { styled } from "styled-system/jsx";

import { SECTIONS } from "../data/sections";
import useMediaQuery from "../hooks/useMediaQuery";
import { playNavClick } from "../utils/sounds";

const NavContainer = styled("nav", {
  base: {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    zIndex: 1000,
    transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    mdDown: { bottom: "1rem" },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
  variants: {
    visible: {
      true: {
        transform: "translateX(-50%) translateY(0)",
      },
      false: {
        transform: "translateX(-50%) translateY(calc(100% + 4rem))",
        mdDown: { transform: "translateX(-50%) translateY(calc(100% + 3rem))" },
      },
    },
  },
});

const NavList = styled("ul", {
  base: {
    position: "relative",
    display: "flex",
    gap: "0.5rem",
    padding: "0.5rem",
    margin: 0,
    listStyle: "none",
    background: "var(--navbar-color)",
    backdropFilter: "blur(12px)",
    borderRadius: "var(--radius-lg)",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 1px var(--border-color)",
    _before: {
      content: '""',
      position: "absolute",
      background: "var(--nav-indicator-color)",
      borderRadius: "var(--radius-md)",
      transition:
        "left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      pointerEvents: "none",
      zIndex: 0,
      top: "0.5rem",
      bottom: "0.5rem",
      left: "var(--indicator-left)",
      width: "var(--indicator-width)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      _before: { transition: "none" },
    },
  },
});

const NavItem = styled("li", {
  base: {
    position: "relative",
    zIndex: 1,
  },
});

const NavButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    border: "none",
    background: "transparent",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: "var(--radius-md)",
    transition: "color 0.2s ease, transform 0.16s cubic-bezier(0.23, 1, 0.32, 1)",
    whiteSpace: "nowrap",
    userSelect: "none",
    "& .lucide": {
      width: "20px",
      height: "20px",
      flexShrink: 0,
    },
    "@media (hover: hover)": {
      _hover: { color: "var(--text-color)" },
    },
    _active: { transform: "scale(0.96)" },
    mdDown: {
      "& .lucide": { display: "none" },
    },
  },
  variants: {
    active: {
      true: { color: "var(--text-color)" },
      false: { color: "var(--text-secondary)" },
    },
  },
});

const getScrollVisibility = () => window.scrollY > 100;
const getServerScrollVisibility = () => false;

const subscribeScrollVisibility = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const updateIndicatorPosition = (
  navList: HTMLUListElement | null,
  buttons: Map<string, HTMLButtonElement>,
  sectionId: string,
) => {
  const button = buttons.get(sectionId);

  if (button) {
    const rect = button.getBoundingClientRect();
    const parentRect = button.parentElement?.parentElement?.getBoundingClientRect();

    if (parentRect) {
      navList?.style.setProperty("--indicator-left", `${rect.left - parentRect.left}px`);
      navList?.style.setProperty("--indicator-width", `${rect.width}px`);
    }
  }
};

const SegmentedNav = () => {
  const [activeSection, setActiveSection] = useState<string>("presentation");
  const isVisible = useSyncExternalStore(
    subscribeScrollVisibility,
    getScrollVisibility,
    getServerScrollVisibility,
  );
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number>(0);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const buttonRefsMap = useRef(new Map<string, HTMLButtonElement>());
  const activeSectionRef = useRef(activeSection);
  const supportsHover = useMediaQuery("(hover: hover)");

  useEffect(() => {
    activeSectionRef.current = activeSection;
    updateIndicatorPosition(navListRef.current, buttonRefsMap.current, activeSection);
  }, [activeSection]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () =>
      updateIndicatorPosition(navListRef.current, buttonRefsMap.current, activeSectionRef.current);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (sectionId: string) => {
    void playNavClick();
    setActiveSection(sectionId);

    isScrollingRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (sectionId === "presentation") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleMouseEnter = (id: string) => {
    if (supportsHover) {
      updateIndicatorPosition(navListRef.current, buttonRefsMap.current, id);
    }
  };

  const handleMouseLeave = () => {
    if (supportsHover) {
      updateIndicatorPosition(navListRef.current, buttonRefsMap.current, activeSection);
    }
  };

  return (
    <NavContainer visible={isVisible}>
      <NavList ref={navListRef}>
        {SECTIONS.map(({ id, Icon, label }) => (
          <NavItem
            key={id}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
          >
            <NavButton
              ref={(el: HTMLButtonElement | null) => {
                if (el) {
                  buttonRefsMap.current.set(id, el);
                } else {
                  buttonRefsMap.current.delete(id);
                }
              }}
              active={activeSection === id}
              onClick={() => handleNavClick(id)}
              aria-label={label}
              aria-current={activeSection === id ? "location" : undefined}
            >
              <Icon />
              <span>{label}</span>
            </NavButton>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default SegmentedNav;
