import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import useSound from "use-sound";

import useKeyPress from "../hooks/useKeyPress";
import { useTheme } from "../hooks/useTheme";
import { IconBtn } from "../styled/shared";

const ToggleDarkMode = () => {
  const { isDark, toggleTheme, resetTheme } = useTheme();
  const { t } = useTranslation();
  const [playOn] = useSound("/sounds/switch-on.mp3", { volume: 0.5 });
  const [playOff] = useSound("/sounds/switch-off.mp3", { volume: 0.5 });

  const handleToggle = () => {
    if (isDark) {
      playOn();
    } else {
      playOff();
    }
    toggleTheme();
  };

  useKeyPress("m", handleToggle);
  useKeyPress("p", resetTheme);

  return (
    <IconBtn aria-label={t("navbar.switchTheme")} onClick={handleToggle}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconBtn>
  );
};

export default ToggleDarkMode;
