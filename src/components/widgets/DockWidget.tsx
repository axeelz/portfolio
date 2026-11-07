import type { MouseEvent } from "react";

import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

import type { DockApp } from "../../utils/fetch";

import { playButtonClick } from "../../utils/sounds";
import { TooltipLabel, tooltipHost, tooltipVisible } from "../ui/Tooltip";

const Dock = styled("div", {
  base: {
    "--icon": "clamp(36px, 5.2vw, 68px)",
    display: "flex",
    alignItems: "flex-end",
    gap: "7px",
    width: "fit-content",
    maxWidth: "100%",
    padding: "12px",
    borderRadius: "calc(var(--icon) * 0.42)",
    backgroundColor: "var(--soft-color)",
    mdDown: {
      "--icon": "clamp(30px, 9.4vw, 48px)",
      gap: "4px",
      padding: "8px",
    },
  },
});

const App = styled("button", {
  base: css.raw(tooltipHost, {
    flexShrink: 1,
    minWidth: 0,
    width: "var(--icon)",
    padding: 0,
    border: "none",
    borderRadius: "22%",
    background: "none",
    color: "inherit",
    cursor: "default",
    font: "inherit",
    transition: "margin 220ms var(--ease-out)",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      "& img": { transition: "none" },
    },
    "& img": {
      width: "100%",
      aspectRatio: "1",
      objectFit: "contain",
      transformOrigin: "50% 100%",
      transition: "scale 220ms var(--ease-out)",
    },
    "@media (hover: none)": { "&:hover > [data-tooltip]": tooltipVisible },
    _canHover: {
      _hover: {
        marginInline: "calc(var(--icon) * 0.16)",
        "& img": { scale: 1.38 },
        "& > [data-tooltip]": { translate: "-50% calc(var(--icon) * -0.38)" },
      },
      "&:has(+ button:hover)": {
        marginInline: "calc(var(--icon) * 0.06)",
        "& img": { scale: 1.16 },
      },
      "button:hover + &": {
        marginInline: "calc(var(--icon) * 0.06)",
        "& img": { scale: 1.16 },
      },
    },
  }),
});

const bounce = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
  void playButtonClick();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  currentTarget.animate(
    [
      { transform: "none" },
      { transform: "translateY(-34%)", offset: 0.3 },
      { transform: "none", offset: 0.6 },
      { transform: "translateY(-10%)", offset: 0.78 },
      { transform: "none" },
    ],
    { duration: 600, easing: "ease-out" },
  );
};

const DockWidget = ({ items }: { items: DockApp[] }) => (
  <Dock>
    {items.map((app) => (
      <App key={app.name} type="button" onClick={bounce}>
        <img src={app.image} alt={app.name} loading="lazy" />
        <TooltipLabel>{app.name}</TooltipLabel>
      </App>
    ))}
  </Dock>
);

export default DockWidget;
