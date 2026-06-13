import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";

import { IconBtn } from "../components/ui/shared";
import { copy } from "../data/copy";
import useKeyPress from "../hooks/useKeyPress";
import { useTheme } from "../hooks/useTheme";
import { playThemeSwitch } from "../utils/sounds";

const ToggleDarkMode = () => {
  const { isDark, isOverriding, toggle } = useTheme();

  const handleToggle = () => {
    void playThemeSwitch();
    toggle();
  };

  useKeyPress("m", handleToggle);

  const icon = isOverriding ? isDark ? <MoonIcon /> : <SunIcon /> : <MonitorIcon />;

  return (
    <IconBtn aria-label={copy.navbar.switchTheme} onClick={handleToggle}>
      {icon}
    </IconBtn>
  );
};

export default ToggleDarkMode;
