import type { ComponentProps } from "react";

import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { styled } from "styled-system/jsx";

import { CardDescription, reveal, squircle } from "./shared";

const Link = styled("a", {
  base: {
    ...reveal,
    ...squircle,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5rem",
    marginTop: "clamp(2rem, 3vw, 2.5rem)",
    padding: "clamp(1.25rem, 2.5vw, 2rem)",
    overflow: "hidden",
    backgroundColor: "var(--soft-color)",
    color: "inherit",
    textDecoration: "none",
    transition: "scale 160ms var(--ease-out)",
    _active: { scale: 0.99 },
    _before: {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(var(--border-color) 1.3px, transparent 1.3px)",
      backgroundSize: "14px 14px",
      maskImage: "linear-gradient(90deg, transparent 45%, #000)",
      opacity: 0,
      transition: "opacity 350ms ease",
    },
    "& > *": { position: "relative" },
    "& h3": { fontSize: "var(--text-h3)" },
    "& p": { marginTop: "0.3rem", maxWidth: "none" },
    "& svg + svg": { translate: "var(--arrow-from)" },
    _canHover: {
      _hover: {
        _before: { opacity: 1 },
        "& [data-orb]": { scale: 1.1 },
        "& svg": { translate: "var(--arrow-to)" },
        "& svg + svg": { translate: "0 0" },
      },
    },
  },
  variants: {
    direction: {
      down: { "--arrow-from": "0 -48px", "--arrow-to": "0 48px" },
      external: { "--arrow-from": "-48px 48px", "--arrow-to": "48px -48px" },
    },
  },
});

const Orb = styled("span", {
  base: {
    position: "relative",
    display: "block",
    flexShrink: 0,
    width: "3rem",
    height: "3rem",
    overflow: "hidden",
    borderRadius: "50%",
    backgroundColor: "var(--text-color)",
    color: "var(--sheet-color)",
    transition: "scale 350ms var(--ease-out)",
    "& svg": {
      position: "absolute",
      inset: "calc(50% - 9px)",
      width: "18px",
      height: "18px",
      transition: "translate 350ms var(--ease-out)",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      "& svg": { transition: "none" },
    },
  },
});

type CtaProps = ComponentProps<typeof Link> & {
  title: string;
  description: string;
};

/** The one call to action of a section: a calm surface with a single solid button shape. */
const Cta = ({ title, description, direction = "down", ...props }: CtaProps) => {
  const Arrow = direction === "down" ? ArrowDownIcon : ArrowUpRightIcon;

  return (
    <Link direction={direction} {...props}>
      <div>
        <h3>{title}</h3>
        <CardDescription>{description}</CardDescription>
      </div>
      <Orb data-orb aria-hidden>
        <Arrow />
        <Arrow />
      </Orb>
    </Link>
  );
};

export default Cta;
