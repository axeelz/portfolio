import type { ComponentProps } from "react";

import { ArrowUpRightIcon } from "lucide-react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

export const squircle = css.raw({
  borderRadius: "var(--radius-md)",
  "@supports (corner-shape: squircle)": {
    cornerShape: "squircle",
    borderRadius: "var(--squircle-md)",
  },
});

/** Fades an element in as it enters the viewport. CSS only, skipped where unsupported. */
export const reveal = css.raw({
  "@supports (animation-timeline: view())": {
    "@media (prefers-reduced-motion: no-preference)": {
      animationName: "rise",
      animationTimingFunction: "linear",
      animationFillMode: "both",
      animationTimeline: "view()",
      animationRange: "entry 0% entry 35%",
    },
  },
});

/** A sheet stacked over the previous one, overlapping its rounded corners. */
export const stackedSheet = css.raw({
  position: "relative",
  marginTop: "calc(-1 * var(--sheet-radius))",
  borderRadius: "var(--sheet-radius) var(--sheet-radius) 0 0",
  paddingInline: "var(--gutter)",
  paddingTop: "var(--sheet-padding)",
});

/** Text sized so it fills its container: pass the text's width in em as `--fit`. */
export const FitBox = styled("div", { base: { containerType: "inline-size" } });

export const fitText = css.raw({
  display: "block",
  width: "max-content",
  fontSize: "calc(100cqi / var(--fit))",
  letterSpacing: "-0.03em",
  lineHeight: 0.86,
  whiteSpace: "nowrap",
});

export const SectionHead = styled("div", {
  base: {
    display: "grid",
    gap: "0.9rem",
    paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
  },
});

export const SectionTitle = styled("h2", {
  base: { fontSize: "var(--text-h2)" },
});

export const Lead = styled("p", {
  base: {
    maxWidth: "34ch",
    color: "var(--text-secondary)",
    fontSize: "var(--text-lead)",
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
});

export const Block = styled("div", {
  base: {
    ...reveal,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    alignContent: "start",
    gap: "1rem",
    minWidth: 0,
  },
});

export const BlockLabel = styled("h3", {
  base: {
    color: "var(--text-secondary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 1.4,
  },
});

/** A list of large text links. Set `--link-size` to resize them. */
export const TextLinks = styled("ul", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.1rem 1rem",
    _canHover: { _hover: { "& a:not(:hover)": { color: "var(--text-secondary)" } } },
    "& a": {
      color: "inherit",
      fontFamily: "var(--font-title)",
      fontSize: "var(--link-size, clamp(1.25rem, 1.9vw, 1.5rem))",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
      textDecoration: "none",
      transition: "color 200ms ease",
    },
  },
});

export const CardGrid = styled("div", {
  base: {
    display: "grid",
    alignItems: "start",
  },
  variants: {
    size: {
      featured: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "clamp(2rem, 3vw, 2.5rem)",
        mdDown: { gridTemplateColumns: "minmax(0, 1fr)" },
      },
      compact: {
        "--card-gap": "1rem",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "clamp(1.5rem, 2.5vw, 2rem)",
        marginTop: "clamp(2rem, 3vw, 2.5rem)",
        mdDown: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
      },
    },
  },
  defaultVariants: { size: "featured" },
});

export const Card = styled("article", {
  base: {
    ...reveal,
    position: "relative",
    display: "grid",
    gap: "var(--card-gap, 1.25rem)",
    minWidth: 0,
  },
});

export const CardMedia = styled("div", {
  base: {
    ...squircle,
    position: "relative",
    aspectRatio: "16/9",
    overflow: "hidden",
    backgroundColor: "var(--soft-color)",
    _after: {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      cornerShape: "inherit",
      boxShadow: "inset 0 0 0 1px var(--border-color)",
      pointerEvents: "none",
    },
  },
});

export const CardBody = styled("div", {
  base: {
    display: "grid",
    justifyItems: "start",
    gap: "0.55rem",
  },
});

export const CardTitle = styled("h3", {
  base: { fontSize: "var(--text-h3)" },
  variants: {
    size: {
      compact: { fontSize: "1.25rem", letterSpacing: "-0.015em" },
    },
  },
});

export const CardDescription = styled("p", {
  base: {
    maxWidth: "52ch",
    color: "var(--text-secondary)",
  },
  variants: {
    size: {
      compact: { fontSize: "0.9375rem", mdDown: { fontSize: "0.875rem", lineHeight: 1.45 } },
    },
  },
});

const ExternalAnchor = styled("a", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    color: "inherit",
    fontWeight: 500,
    textDecoration: "none",
    "& svg": {
      transition: "transform 200ms var(--ease-out)",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
    "& > span": { position: "relative" },
    "& > span::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: "-1px",
      height: "1px",
      backgroundColor: "currentColor",
      opacity: 0.25,
      transition: "opacity 200ms ease",
    },
    _canHover: {
      _hover: {
        "& svg": { transform: "translate(1.5px, -1.5px)" },
        "& > span::after": { opacity: 1 },
      },
    },
  },
});

export const ExternalLink = ({ children, ...props }: ComponentProps<typeof ExternalAnchor>) => (
  <ExternalAnchor target="_blank" rel="noreferrer" {...props}>
    <span>{children}</span>
    <ArrowUpRightIcon size={14} strokeWidth={2.25} aria-hidden />
  </ExternalAnchor>
);

export const LinkRow = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem 1.25rem",
  },
});

export const IconBtn = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    padding: 0,
    border: "none",
    borderRadius: "var(--radius-md)",
    backgroundColor: "transparent",
    color: "var(--text-color)",
    cursor: "pointer",
    transition: "transform 160ms var(--ease-out)",
    _active: { transform: "scale(0.96)" },
  },
});
