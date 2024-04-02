import React, { Dispatch, SetStateAction } from "react";
// @ts-ignore: Library is not typed
import useSound from "use-sound";
import { IoMoon, IoSunny } from "react-icons/io5";
import useKeyPress from "../hooks/useKeyPress";
import { IconBtn } from "../styled/shared";

interface ToggleDarkModeProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const ToggleDarkMode = React.forwardRef<HTMLButtonElement, ToggleDarkModeProps>(({ isDark, setIsDark }, ref) => {
  // ref is required when nesting this component inside a Tippy tooltip
  const [playOn] = useSound("/sounds/switch-on.mp3", { volume: 0.5 });
  const [playOff] = useSound("/sounds/switch-off.mp3", { volume: 0.5 });

  const toggleTheme = () => {
    setIsDark(!isDark);
    isDark ? playOn() : playOff();
  };

  useKeyPress("m", () => {
    toggleTheme();
  });

  return (
    <IconBtn aria-label="Switch theme" onClick={toggleTheme} ref={ref} key={isDark.toString()}>
      {isDark ? <IoSunny /> : <IoMoon />}
    </IconBtn>
  );
});

export default ToggleDarkMode;
