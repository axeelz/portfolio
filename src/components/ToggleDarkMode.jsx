import React from "react";
import useSound from "use-sound";
import { IoMoon, IoSunny } from "react-icons/io5";
import useKeyPress from "../hooks/useKeyPress";

const ToggleDarkMode = React.forwardRef(({ isDark, setIsDark, IconBtn }, ref) => {
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
    <IconBtn aria-label="Switch theme" onClick={toggleTheme} ref={ref} key={isDark}>
      <div>{isDark ? <IoSunny /> : <IoMoon />}</div>
    </IconBtn>
  );
});

export default ToggleDarkMode;
