import { MoonIcon, SunIcon } from "lucide-react";
import { useRef } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import useKeyPress from "../hooks/useKeyPress";
import { useTheme } from "../hooks/useTheme";
import { playThemeSwitch } from "../utils/sounds";
import { IconBtn } from "./ui/shared";
import { TooltipHost, TooltipLabel } from "./ui/Tooltip";

const Kbd = styled("kbd", {
  base: {
    padding: "0 0.35em",
    borderRadius: "var(--radius-xs)",
    backgroundColor: "var(--soft-color)",
    color: "var(--text-secondary)",
    fontFamily: "inherit",
  },
});

/** Shows the theme a click leads to: the moon by day, the sun by night. */
const ThemeBtn = styled(IconBtn, {
  base: {
    position: "relative",
    overflow: "hidden",
    "& svg": {
      position: "absolute",
      transition: "transform 400ms var(--ease-out), opacity 250ms ease",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
    "& [data-icon=sun]": { opacity: 0, transform: "translateY(120%) rotate(-90deg)" },
    ".dark &": {
      "& [data-icon=sun]": { opacity: 1, transform: "none" },
      "& [data-icon=moon]": { opacity: 0, transform: "translateY(120%) rotate(90deg)" },
    },
  },
});

const ToggleDarkMode = () => {
  const { toggle } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    void playThemeSwitch();
    toggle(buttonRef.current);
  };

  useKeyPress("m", handleToggle);

  return (
    <TooltipHost>
      <ThemeBtn ref={buttonRef} aria-label={copy.navbar.switchTheme} onClick={handleToggle}>
        <MoonIcon data-icon="moon" size={18} aria-hidden />
        <SunIcon data-icon="sun" size={18} aria-hidden />
      </ThemeBtn>
      <TooltipLabel>
        {copy.navbar.switchTheme}
        <Kbd>M</Kbd>
      </TooltipLabel>
    </TooltipHost>
  );
};

export default ToggleDarkMode;
