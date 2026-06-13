import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import ToggleDarkMode from "./ToggleDarkMode";
import { Tooltip } from "./ui/Tooltip";

const NavbarContainer = styled("nav", {
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
  },
});

const Kbd = styled("kbd", {
  base: {
    fontFamily: "system-ui",
    border: "1px solid #ccc",
    borderRadius: "var(--radius-sm)",
    padding: "0.1em 0.5em",
    margin: "0 0.2em",
    boxShadow: "0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset",
    backgroundColor: "#f7f7f7",
    color: "black",
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
