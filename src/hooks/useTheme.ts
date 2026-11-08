import { useSyncExternalStore } from "react";

import { applyThemeToDocument, resolveThemeState } from "../theme/dom";
import { THEME_OVERRIDE_VALUE, THEME_STORAGE_KEY } from "../theme/storage";

const getSystemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const getStoredTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

const getThemeState = () => resolveThemeState(getStoredTheme(), getSystemDark());

/** What the toggle leads to: the other theme, or back to the system one. */
const getNextTheme = (): "dark" | "light" | "system" => {
  const { isDark, isOverriding } = getThemeState();
  return isOverriding ? "system" : isDark ? "light" : "dark";
};
const getServerNextTheme = (): ReturnType<typeof getNextTheme> => "dark";

const notifyThemeChange = () => window.dispatchEvent(new Event("themechange"));

type ThemeState = ReturnType<typeof getThemeState>;

const applyTheme = (state: ThemeState) => applyThemeToDocument(document, state);

/** Reveals the new theme as a circle growing from the toggle. */
const applyThemeWithTransition = (state: ThemeState, origin: Element | null) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || !origin || reduced) {
    applyTheme(state);
    return;
  }

  const { x, y, width, height } = origin.getBoundingClientRect();
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const radius = Math.hypot(
    Math.max(centerX, window.innerWidth - centerX),
    Math.max(centerY, window.innerHeight - centerY),
  );

  void document
    .startViewTransition(() => applyTheme(state))
    .ready.then(() =>
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0 at ${centerX}px ${centerY}px)`,
            `circle(${radius}px at ${centerX}px ${centerY}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.3, 0.7, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ),
    )
    // A newer toggle skips this transition, which rejects `ready`.
    .catch(() => undefined);
};

const subscribeTheme = (callback: () => void) => {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  // A new system theme wins over an override, which only ever means "the other one".
  const syncTheme = () => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    applyTheme({ isDark: getSystemDark(), isOverriding: false });
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
  const nextTheme = useSyncExternalStore(subscribeTheme, getNextTheme, getServerNextTheme);

  const toggle = (origin: Element | null) => {
    if (getThemeState().isOverriding) {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, THEME_OVERRIDE_VALUE);
    }
    applyThemeWithTransition(getThemeState(), origin);
    notifyThemeChange();
  };

  return { nextTheme, toggle };
};
