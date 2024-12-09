import { Dispatch, SetStateAction } from "react";
import useSound from "use-sound";
import useKeyPress from "../hooks/useKeyPress";
import { IconBtn } from "../styled/shared";
import { MoonIcon, SunIcon } from "lucide-react";

interface ToggleDarkModeProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const ToggleDarkMode = ({ isDark, setIsDark }: ToggleDarkModeProps) => {
  const [playOn] = useSound("/sounds/switch-on.mp3", { volume: 0.5 });
  const [playOff] = useSound("/sounds/switch-off.mp3", { volume: 0.5 });

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      playOn();
    } else {
      playOff();
    }
  };

  useKeyPress("m", () => {
    toggleTheme();
  });

  return (
    <IconBtn aria-label="Switch theme" onClick={toggleTheme} key={isDark.toString()}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconBtn>
  );
};

export default ToggleDarkMode;
