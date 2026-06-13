import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "./colors";
import { THEME_OVERRIDE_VALUE, THEME_STORAGE_KEY } from "./storage";

const THEME_META_SELECTOR = 'meta[name="theme-color"]';

export const getThemeColor = (isDark: boolean) => (isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);

export const resolveThemeState = (storedTheme: string | null, systemDark: boolean) => {
  const isOverriding = storedTheme === THEME_OVERRIDE_VALUE;

  return {
    isDark: isOverriding ? !systemDark : systemDark,
    isOverriding,
  };
};

export const applyThemeToDocument = (
  doc: Pick<Document, "documentElement" | "querySelector">,
  isDark: boolean,
) => {
  doc.documentElement.classList.toggle("dark", isDark);
  doc
    .querySelector<HTMLMetaElement>(THEME_META_SELECTOR)
    ?.setAttribute("content", getThemeColor(isDark));
};

export const CRITICAL_THEME_CSS = `:root{--background-color:${LIGHT_THEME_COLOR};color-scheme:light}:root.dark{--background-color:${DARK_THEME_COLOR};color-scheme:dark}html{background-color:var(--background-color)}`;

export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=matchMedia('(prefers-color-scheme: dark)').matches;var dark=s==='${THEME_OVERRIDE_VALUE}'?!d:d;var r=document.documentElement;var m=document.querySelector('${THEME_META_SELECTOR}');r.classList.toggle('dark',dark);if(m)m.setAttribute('content',dark?'${DARK_THEME_COLOR}':'${LIGHT_THEME_COLOR}');}catch(e){}})();history.scrollRestoration='manual';`;
