import { useState, useEffect } from "react";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";
const LOCAL_STORAGE_THEME_KEY = "theme";
const META_COLOR_DARK = "#000000";
const META_COLOR_LIGHT = "#e6e4e4";

const saveTheme = (theme: typeof THEME_DARK | typeof THEME_LIGHT) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
};

const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  if (savedTheme) {
    return savedTheme === THEME_DARK;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
  const [isDark, setIsDark] = useState(getInitialTheme());

  useEffect(() => {
    updateMetaColor(isDark);
    updateBodyClass(isDark);
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) return;
      setIsDark(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  });

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    saveTheme(newIsDark ? THEME_DARK : THEME_LIGHT);
  };

  const resetTheme = () => {
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    setIsDark(getInitialTheme());
  };

  return { isDark, toggleTheme, resetTheme };
};
