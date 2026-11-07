import { ArrowUpRightIcon } from "lucide-react";
import { useRef } from "react";
import { styled } from "styled-system/jsx";

import { bioParagraph, copy } from "../data/copy";
import { scrollToSection } from "../utils/scroll";
import ParisTime from "./ParisTime";
import Sky from "./Sky";
import { FitBox, fitText } from "./ui/shared";

const Hero = styled("header", {
  base: {
    position: "sticky",
    top: 0,
    isolation: "isolate",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    // Leaves the top of the next sheet showing, as an invitation to scroll.
    minHeight: "calc(100svh - 2.25rem)",
    padding: "1rem var(--gutter) 4.75rem",
    transformOrigin: "50% 45%",
    "@supports (animation-timeline: scroll())": {
      "@media (prefers-reduced-motion: no-preference) and (min-height: 560px)": {
        animationName: "recede",
        animationTimingFunction: "linear",
        animationFillMode: "both",
        animationTimeline: "scroll(root)",
        animationRange: "0 100svh",
      },
    },
  },
});

const Top = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    "& > :last-child": { color: "var(--text-secondary)" },
  },
});

const Bio = styled("p", {
  base: {
    marginTop: "auto",
    maxWidth: "36ch",
    fontSize: "var(--text-lead)",
    letterSpacing: "-0.01em",
    lineHeight: 1.34,
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "fadeIn 700ms ease-out 200ms both",
    },
    "& a": {
      color: "inherit",
      textDecorationColor: "var(--border-color)",
      textDecorationThickness: "1px",
      textUnderlineOffset: "0.2em",
      transition: "text-decoration-color 200ms ease",
      _canHover: {
        _hover: {
          textDecorationColor: "currentColor",
          "& svg": { translate: "1.5px -1.5px" },
        },
      },
    },
    "& svg": {
      display: "inline-block",
      marginLeft: "0.08em",
      verticalAlign: "0.02em",
      transition: "translate 200ms var(--ease-out)",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
});

const NameBox = styled(FitBox, { base: { marginTop: "-0.4rem" } });

const Name = styled("h1", {
  base: {
    ...fitText,
    "--fit": "4.73",
    mdDown: { "--fit": "2.56" },
    "& > span": {
      display: "inline-block",
      mdDown: { display: "block" },
      "@media (prefers-reduced-motion: no-preference)": {
        animation: "nameUp 900ms var(--ease-out) both",
      },
    },
    "& > span + span": { animationDelay: "70ms" },
  },
});

const Presentation = () => {
  const bioRef = useRef<HTMLParagraphElement>(null);

  return (
    <Hero>
      <Sky until={bioRef} />
      <Top>
        <span>{copy.presentation.role}</span>
        <ParisTime />
      </Top>
      <Bio ref={bioRef}>
        {bioParagraph.map((segment) => {
          if ("text" in segment) return <span key={segment.text}>{segment.text}</span>;

          if ("section" in segment) {
            return (
              <a
                key={segment.section}
                href={`#${segment.section}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(segment.section);
                }}
              >
                {segment.label}
              </a>
            );
          }

          return (
            <a key={segment.href} href={segment.href} target="_blank" rel="noreferrer">
              {segment.label}
              <ArrowUpRightIcon size="0.7em" strokeWidth={2.5} aria-hidden />
            </a>
          );
        })}
      </Bio>
      <NameBox>
        <Name>
          <span>Axel</span> <span>Zareb</span>
        </Name>
      </NameBox>
    </Hero>
  );
};

export default Presentation;
