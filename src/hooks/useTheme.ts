import { useState, useEffect } from "react";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";
const THEME_SYSTEM = "system";
const LOCAL_STORAGE_THEME_KEY = "theme";
const META_COLOR_DARK = "#000000";
const META_COLOR_LIGHT = "#e6e4e4";

type Theme = typeof THEME_DARK | typeof THEME_LIGHT | typeof THEME_SYSTEM;

const saveTheme = (theme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
};

const getSystemTheme = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const getInitialTheme = (): { theme: Theme; isDark: boolean } => {
  const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;

  if (!savedTheme || savedTheme === THEME_SYSTEM) {
    return { theme: THEME_SYSTEM, isDark: getSystemTheme() };
  }

  return { theme: savedTheme, isDark: savedTheme === THEME_DARK };
};

const updateMetaColor = (isDark: boolean) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) return;
  metaThemeColor.setAttribute("content", isDark ? META_COLOR_DARK : META_COLOR_LIGHT);
};

const updateBodyClass = (isDark: boolean) => {
  if (isDark) {
    document.body.classList.add(THEME_DARK);
  } else {
    document.body.classList.remove(THEME_DARK);
  }
};

export const useTheme = () => {
  const initial = getInitialTheme();
  const [theme, setTheme] = useState<Theme>(initial.theme);
  const [isDark, setIsDark] = useState(initial.isDark);

  useEffect(() => {
    updateMetaColor(isDark);
    updateBodyClass(isDark);
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === THEME_SYSTEM) {
        setIsDark(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  const cycleTheme = () => {
    const cycles: Record<Theme, { theme: Theme; isDark: boolean }> = {
      light: { theme: THEME_DARK, isDark: true },
      dark: { theme: THEME_SYSTEM, isDark: getSystemTheme() },
      system: { theme: THEME_LIGHT, isDark: false },
    };

    const next = cycles[theme];
    setTheme(next.theme);
    setIsDark(next.isDark);
    saveTheme(next.theme);
  };

  const resetTheme = () => {
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    const initial = getInitialTheme();
    setTheme(initial.theme);
    setIsDark(initial.isDark);
  };

  return { isDark, theme, cycleTheme, resetTheme };
};
