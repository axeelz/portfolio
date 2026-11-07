export const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/** Scrolls to a section and moves focus there, so keyboard users continue from it. */
export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: getScrollBehavior() });
  section?.focus({ preventScroll: true });
};
