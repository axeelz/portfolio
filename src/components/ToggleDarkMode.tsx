import { ContrastIcon } from "lucide-react";
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
      <IconBtn ref={buttonRef} aria-label={copy.navbar.switchTheme} onClick={handleToggle}>
        <ContrastIcon size={18} aria-hidden />
      </IconBtn>
      <TooltipLabel>
        {copy.navbar.switchTheme}
        <Kbd>M</Kbd>
      </TooltipLabel>
    </TooltipHost>
  );
};

export default ToggleDarkMode;
