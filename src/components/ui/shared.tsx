import type { CSSProperties } from "react";

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

export const SectionTitle = styled("h2", {
  base: {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    textAlign: "left",
    fontSize: "calc(1.325rem + 0.9vw)",
    margin: "1rem 0 2rem 0",
    textWrap: "balance",
  },
});

export const buttonBase = css.raw({
  fontFamily: "var(--font-body)",
  lineHeight: 1,
  border: "none",
  ...squircle("md"),
  padding: "0.75rem",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  userSelect: "none",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  "@media (hover: hover)": {
    _hover: { transform: "scale(1.03) translateY(-1px)" },
  },
  _active: {
    transform: "scale(0.98)",
    transition: "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
  },
});

export const Button = styled("button", {
  base: buttonBase,
});

export const IconBtn = styled("button", {
  base: {
    padding: "8px",
    backgroundColor: "transparent",
    border: "none",
    color: "var(--text-color)",
    cursor: "pointer",
    transition:
      "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-sm)",
    fontSize: "2rem",
    opacity: 0.65,
    "@media (hover: hover)": {
      _hover: { opacity: 1 },
    },
    _active: {
      transform: "scale(0.96)",
      transition: "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
    },
  },
});

export const WidgetContainer = styled("div", {
  base: {
    fontWeight: 500,
    ...squircle("lg"),
    backgroundColor: "var(--card-background-color)",
    border: "1px solid var(--surface-outline-color)",
    boxShadow: "var(--surface-shadow)",
  },
});

export const createImageGlowStyle = (imageUrl: string, opacity = 0.5) =>
  ({
    backgroundImage: `url(${imageUrl})`,
    opacity,
  }) as CSSProperties;

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
    fontWeight: 500,
    fontSize: "1.15rem",
    animation: "fadeUp 0.4s ease-out both",
    backgroundColor: "var(--card-background-color)",
    border: "1px solid var(--surface-outline-color)",
    boxShadow: "var(--surface-shadow)",
    padding: "1rem",
    ...squircle("lg"),
    mdDown: { fontSize: "0.9rem" },
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
      margin: "0 0.1rem",
      padding: "5px",
      borderRadius: "var(--radius-sm)",
      transition: "background-color 0.2s cubic-bezier(0.23, 1, 0.32, 1), text-decoration 0.2s",
      md: {
        _hover: {
          backgroundColor: "var(--surface-hover-color)",
          textDecoration: "none",
        },
      },
      mdDown: { padding: 0 },
    },
  },
});
