import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
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

const shownIcon = { opacity: 1, transform: "none" };

/** Shows what a click leads to: the other theme, or back to the system one. CSS reads the
 * classes the boot script sets, so the right icon shows before hydration. */
const ThemeBtn = styled(IconBtn, {
  base: {
    position: "relative",
    overflow: "hidden",
    "& svg": {
      position: "absolute",
      opacity: 0,
      transform: "translateY(120%) rotate(90deg)",
      transition: "transform 400ms var(--ease-out), opacity 250ms ease",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
    ":root:not(.dark, .theme-override) &": { "& [data-icon=moon]": shownIcon },
    ":root.dark:not(.theme-override) &": { "& [data-icon=sun]": shownIcon },
    ":root.theme-override &": { "& [data-icon=system]": shownIcon },
  },
});

const ToggleDarkMode = () => {
  const { nextTheme, toggle } = useTheme();
  const label = copy.navbar.theme[nextTheme];
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    void playThemeSwitch();
    toggle(buttonRef.current);
  };

  useKeyPress("m", handleToggle);

  return (
    <TooltipHost>
      <ThemeBtn ref={buttonRef} aria-label={label} onClick={handleToggle}>
        <MoonIcon data-icon="moon" size={18} aria-hidden />
        <SunIcon data-icon="sun" size={18} aria-hidden />
        <MonitorIcon data-icon="system" size={18} aria-hidden />
      </ThemeBtn>
      <TooltipLabel>
        {label}
        <Kbd>M</Kbd>
      </TooltipLabel>
    </TooltipHost>
  );
};

export default ToggleDarkMode;
