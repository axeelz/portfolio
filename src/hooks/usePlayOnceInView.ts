import { useEffect, useRef } from "react";

/** Sets `data-play` the first time the element comes into view, until its animation ends. */
export default function usePlayOnceInView<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        element.dataset.play = "";
        element.addEventListener("animationend", () => delete element.dataset.play, {
          once: true,
        });
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
