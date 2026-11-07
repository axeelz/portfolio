import { useSyncExternalStore } from "react";

import { applyThemeToDocument, resolveThemeState } from "../theme/dom";
import { THEME_OVERRIDE_VALUE, THEME_STORAGE_KEY } from "../theme/storage";

const getSystemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const getStoredTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

const getThemeState = () => resolveThemeState(getStoredTheme(), getSystemDark());

const getIsOverriding = () => getThemeState().isOverriding;
const getServerIsOverriding = () => false;

const notifyThemeChange = () => window.dispatchEvent(new Event("themechange"));

const applyTheme = (isDark: boolean) => applyThemeToDocument(document, isDark);

/** Reveals the new theme as a circle growing from the toggle. */
const applyThemeWithTransition = (isDark: boolean, origin: Element | null) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || !origin || reduced) {
    applyTheme(isDark);
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
    .startViewTransition(() => applyTheme(isDark))
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
  const isOverriding = useSyncExternalStore(subscribeTheme, getIsOverriding, getServerIsOverriding);

  const toggle = (origin: Element | null) => {
    const nextOverriding = !isOverriding;
    const nextDark = nextOverriding ? !getSystemDark() : getSystemDark();
    if (nextOverriding) {
      localStorage.setItem(THEME_STORAGE_KEY, THEME_OVERRIDE_VALUE);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
    applyThemeWithTransition(nextDark, origin);
    notifyThemeChange();
  };

  return { toggle };
};
