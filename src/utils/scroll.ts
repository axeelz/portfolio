export const CONTACT_ID = "contact";
const SPOTLIGHT_MS = 1600;

export const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: getScrollBehavior() });

/** Brings the contact row into view, then points at the email button. */
export function scrollToContact() {
  const contact = document.getElementById(CONTACT_ID);
  if (!contact) return;

  contact.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      contact.querySelector("button")?.focus({ preventScroll: true });
      contact.dataset.spotlight = "";
      window.setTimeout(() => delete contact.dataset.spotlight, SPOTLIGHT_MS);
    },
    { rootMargin: "-25% 0px" },
  );
  observer.observe(contact);
}
