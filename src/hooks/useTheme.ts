import { useSyncExternalStore } from "react";

import { applyThemeToDocument, resolveThemeState } from "../theme/dom";
import { THEME_OVERRIDE_VALUE, THEME_STORAGE_KEY } from "../theme/storage";

const getSystemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const getStoredTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

const getThemeState = () => resolveThemeState(getStoredTheme(), getSystemDark());

const getThemeSnapshot = () => {
  const { isDark, isOverriding } = getThemeState();
  return `${isDark ? "dark" : "light"}:${isOverriding ? "override" : "system"}`;
};

const getServerThemeSnapshot = () => "light:system";

const notifyThemeChange = () => window.dispatchEvent(new Event("themechange"));

const applyTheme = (isDark: boolean) => applyThemeToDocument(document, isDark);

const applyThemeWithTransition = (isDark: boolean) => {
  if (!document.startViewTransition) {
    applyTheme(isDark);
    return;
  }
  document.startViewTransition(() => applyTheme(isDark));
};

const subscribeTheme = (callback: () => void) => {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const syncTheme = () => {
    const { isDark, isOverriding } = getThemeState();
    if (!isOverriding) {
      applyTheme(isDark);
    }
    callback();
  };

  mq.addEventListener("change", syncTheme);
  window.addEventListener("themechange", callback);

  return () => {
    mq.removeEventListener("change", syncTheme);
    window.removeEventListener("themechange", callback);
  };
};

export const useTheme = () => {
  "use no memo";
  const snapshot = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [theme, source] = snapshot.split(":");
  const isDark = theme === "dark";
  const isOverriding = source === "override";

  const toggle = () => {
    const nextOverriding = !isOverriding;
    const nextDark = nextOverriding ? !getSystemDark() : getSystemDark();
    if (nextOverriding) {
      localStorage.setItem(THEME_STORAGE_KEY, THEME_OVERRIDE_VALUE);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
    applyThemeWithTransition(nextDark);
    notifyThemeChange();
  };

  return { isDark, isOverriding, toggle };
};
