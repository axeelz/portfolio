import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { SECTIONS } from "../data/sections";
import useMediaQuery from "../hooks/useMediaQuery";
import { playNavClick } from "../utils/sounds";

const NavContainer = styled.nav<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $isVisible }) => ($isVisible ? "0" : "calc(100% + 4rem)")});
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media (max-width: 768px) {
    bottom: 1rem;
    transform: translateX(-50%) translateY(${({ $isVisible }) => ($isVisible ? "0" : "calc(100% + 3rem)")});
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const NavList = styled.ul<{
  $indicatorLeft: number;
  $indicatorWidth: number;
}>`
  position: relative;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  margin: 0;
  list-style: none;
  background: var(--navbar-color);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1),
    0 0 0 1px var(--border-color);

  /* Indicator background */
  &::before {
    content: "";
    position: absolute;
    background: var(--nav-indicator-color);
    border-radius: var(--radius-md);
    transition:
      left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
    z-index: 0;
    top: 0.5rem;
    bottom: 0.5rem;
    left: ${({ $indicatorLeft }) => $indicatorLeft}px;
    width: ${({ $indicatorWidth }) => $indicatorWidth}px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`;

const NavItem = styled.li`
  position: relative;
  z-index: 1;
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: ${({ $isActive }) => ($isActive ? "var(--text-color)" : "var(--text-secondary)")};
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: color 0.2s ease-in-out;
  white-space: nowrap;
  user-select: none;

  & .lucide {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--text-color);
    }
  }

  &:active {
    transform: scale(0.96);
  }

  /* Show only text on mobile, hide icons */
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;

    & .lucide {
      display: none;
    }
  }
`;

const SegmentedNav = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>("presentation");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number>(0);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const supportsHover = useMediaQuery("(hover: hover)");

  const updateIndicatorPosition = useCallback(() => {
    const targetSection = hoveredSection || activeSection;
    const button = buttonRefs.current.get(targetSection);

    if (button) {
      const rect = button.getBoundingClientRect();
      const parentRect = button.parentElement?.parentElement?.getBoundingClientRect();

      if (parentRect) {
        setIndicatorLeft(rect.left - parentRect.left);
        setIndicatorWidth(rect.width);
      }
    }
  }, [activeSection, hoveredSection]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition, i18n.language]);

  // Show/hide nav based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateIndicatorPosition);
    return () => window.removeEventListener("resize", updateIndicatorPosition);
  }, [updateIndicatorPosition]);

  const handleNavClick = (sectionId: string) => {
    playNavClick();
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
    // Only enable hover on devices with hover capability (not touch screens)
    if (supportsHover) {
      setHoveredSection(id);
    }
  };

  const handleMouseLeave = () => {
    if (supportsHover) {
      setHoveredSection(null);
    }
  };

  return (
    <NavContainer $isVisible={isVisible}>
      <NavList $indicatorLeft={indicatorLeft} $indicatorWidth={indicatorWidth}>
        {SECTIONS.map(({ id, Icon }) => (
          <NavItem
            key={id}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
          >
            <NavButton
              ref={(el) => {
                if (el) {
                  buttonRefs.current.set(id, el);
                } else {
                  buttonRefs.current.delete(id);
                }
              }}
              $isActive={activeSection === id}
              onClick={() => handleNavClick(id)}
              aria-label={t(`navbar.${id}`)}
              aria-current={activeSection === id ? "location" : undefined}
            >
              <Icon />
              <span>{t(`navbar.${id}`)}</span>
            </NavButton>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default SegmentedNav;
