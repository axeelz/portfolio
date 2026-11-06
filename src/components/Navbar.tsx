import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import ToggleDarkMode from "./ToggleDarkMode";
import { Tooltip } from "./ui/Tooltip";

const NavbarContainer = styled("header", {
  base: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "1rem",
    "& .lucide": {
      width: "24px",
      height: "24px",
    },
  },
});

const ButtonsContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    height: "100%",
    opacity: 0,
    animation: "fadeIn 0.3s ease-out 0.2s forwards",
    "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
  },
});

const Kbd = styled("kbd", {
  base: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.85em",
    border: "1px solid rgb(255 255 255 / 0.25)",
    borderRadius: "var(--radius-xs)",
    padding: "0 0.4em",
    marginLeft: "0.25em",
    display: "inline-block",
    "@media (hover: none)": {
      display: "none",
    },
  },
});

const Navbar = () => {
  return (
    <NavbarContainer>
      <ButtonsContainer>
        <Tooltip
          content={
            <span>
              {copy.navbar.switchTheme} <Kbd>M</Kbd>
            </span>
          }
        >
          <ToggleDarkMode />
        </Tooltip>
      </ButtonsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
