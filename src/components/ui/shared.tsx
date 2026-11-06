import type { ComponentProps } from "react";

import { ArrowUpRightIcon } from "lucide-react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

type SquircleSize = "sm" | "md" | "lg";
const squircleSm = css.raw({
  borderRadius: "var(--radius-sm)",
  "@supports (corner-shape: squircle)": {
    cornerShape: "squircle",
    borderRadius: "var(--squircle-sm)",
  },
});

const squircleMd = css.raw({
  borderRadius: "var(--radius-md)",
  "@supports (corner-shape: squircle)": {
    cornerShape: "squircle",
    borderRadius: "var(--squircle-md)",
  },
});

const squircleLg = css.raw({
  borderRadius: "var(--radius-lg)",
  "@supports (corner-shape: squircle)": {
    cornerShape: "squircle",
    borderRadius: "var(--squircle-lg)",
  },
});

export const squircle = (size: SquircleSize) => {
  if (size === "sm") return squircleSm;
  if (size === "md") return squircleMd;
  return squircleLg;
};

const surface = css.raw({
  ...squircle("lg"),
  backgroundColor: "var(--card-background-color)",
  border: "1px solid var(--surface-outline-color)",
  boxShadow: "var(--surface-shadow)",
});

export const Surface = styled("div", { base: surface });

export const SectionTitle = styled("h2", {
  base: {
    fontFamily: "var(--font-title)",
    fontWeight: 700,
    textAlign: "left",
    fontSize: "clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: "0.5rem 0 1.75rem 0",
  },
});

export const Button = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    minHeight: "3rem",
    padding: "0 1.75rem",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    ...squircle("md"),
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 160ms var(--ease-out), opacity 160ms ease",
    _canHover: { _hover: { opacity: 0.85 } },
    _active: { transform: "scale(0.96)" },
  },
  variants: {
    intent: {
      primary: {
        backgroundColor: "var(--button-background-color)",
        color: "var(--button-text-color)",
      },
      secondary: {
        backgroundColor: "transparent",
        color: "var(--text-color)",
        borderColor: "var(--secondary-border-color)",
      },
    },
  },
  defaultVariants: { intent: "primary" },
});

const ExternalAnchor = styled("a", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.2rem",
    minHeight: "2.75rem",
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "color 160ms ease",
    "& svg": { transition: "transform 200ms var(--ease-out)" },
    "& > span": { position: "relative" },
    "& > span::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: "-2px",
      height: "1px",
      backgroundColor: "currentColor",
      transform: "scaleX(0)",
      transformOrigin: "right",
      transition: "transform 280ms var(--ease-out)",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
    _canHover: {
      _hover: {
        color: "var(--text-color)",
        "& svg": { transform: "translate(1.5px, -1.5px)" },
        "& > span::after": { transform: "scaleX(1)", transformOrigin: "left" },
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
    columnGap: "1rem",
  },
});

export const IconBtn = styled("button", {
  base: {
    padding: "8px",
    backgroundColor: "transparent",
    border: "none",
    color: "var(--text-color)",
    cursor: "pointer",
    transition: "transform 160ms var(--ease-out), opacity 160ms var(--ease-out)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-sm)",
    fontSize: "2rem",
    opacity: 0.65,
    _canHover: { _hover: { opacity: 1 } },
    _active: { transform: "scale(0.96)" },
  },
});

export const ImageGlowFrame = styled("div", {
  base: {
    position: "absolute",
    inset: "2%",
    borderRadius: "inherit",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(28px) saturate(1.8)",
    transform: "scale(1.08)",
    pointerEvents: "none",
    zIndex: 0,
    transition: "opacity 180ms ease-out",
  },
});

export const BodyContainer = styled("div", {
  base: {
    ...surface,
    fontWeight: 500,
    fontSize: "1.05rem",
    animation: "fadeUp 0.4s ease-out both",
    padding: "1.25rem",
    mdDown: { fontSize: "0.95rem", padding: "1rem" },
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
    "& > span": {
      color: "var(--text-secondary)",
      fontWeight: 600,
      marginBottom: "0.85rem",
      fontSize: "0.9rem",
      display: "block",
      mdDown: { fontSize: "0.8rem" },
    },
    "& a": {
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      color: "var(--text-color)",
      transition: "opacity 160ms ease",
      _canHover: { _hover: { opacity: 0.7 } },
    },
  },
});
