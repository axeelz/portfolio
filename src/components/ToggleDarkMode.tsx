import { Dispatch, SetStateAction } from "react";
import useSound from "use-sound";
import { IoMoon, IoSunny } from "react-icons/io5";
import useKeyPress from "../hooks/useKeyPress";
import { IconBtn } from "../styled/shared";

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
      {isDark ? <IoSunny /> : <IoMoon />}
    </IconBtn>
  );
};

export default ToggleDarkMode;
