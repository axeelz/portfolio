import type { ReactNode } from "react";

import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

export const tooltipVisible = { opacity: 1, translate: "-50% 0" };

/** Reveals a child TooltipLabel on hover or keyboard focus. CSS only. */
export const tooltipHost = css.raw({
  position: "relative",
  _canHover: { _hover: { "& > [data-tooltip]": tooltipVisible } },
  "&:focus-visible > [data-tooltip], &:has(:focus-visible) > [data-tooltip]": tooltipVisible,
});

export const TooltipHost = styled("span", {
  base: { ...tooltipHost, display: "inline-flex" },
});

const Label = styled("span", {
  base: {
    position: "absolute",
    left: "50%",
    bottom: "calc(100% + 8px)",
    zIndex: 2,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.25rem 0.6rem",
    borderRadius: "var(--radius-full)",
    backgroundColor: "var(--sheet-color)",
    boxShadow: "var(--surface-shadow), inset 0 0 0 1px var(--border-color)",
    color: "var(--text-color)",
    fontFamily: "var(--font-body)",
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    opacity: 0,
    pointerEvents: "none",
    translate: "-50% 4px",
    transformOrigin: "50% 100%",
    transition: "opacity 150ms ease, translate 200ms var(--ease-out)",
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const TooltipLabel = ({ children }: { children: ReactNode }) => (
  <Label data-tooltip aria-hidden>
    {children}
  </Label>
);
