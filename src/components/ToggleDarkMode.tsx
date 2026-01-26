import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import useKeyPress from "../hooks/useKeyPress";
import { useTheme } from "../hooks/useTheme";
import { IconBtn } from "../styled/shared";
import { playThemeSwitch } from "../utils/sounds";

const ToggleDarkMode = () => {
  const { isDark, theme, cycleTheme, resetTheme } = useTheme();
  const { t } = useTranslation();

  const handleToggle = () => {
    playThemeSwitch();
    cycleTheme();
  };

  useKeyPress("m", handleToggle);
  useKeyPress("p", resetTheme);

  const icon = theme === "system" ? <MonitorIcon /> : isDark ? <SunIcon /> : <MoonIcon />;

  return (
    <>
      <meta name="theme-color" content={isDark ? "#000000" : "#e6e4e4"} />
      <IconBtn aria-label={t("navbar.switchTheme")} onClick={handleToggle}>
        {icon}
      </IconBtn>
    </>
  );
};

export default ToggleDarkMode;
