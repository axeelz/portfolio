import { useEffect, useRef } from "react";

export default function useKeyPress(key: string, callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const hasModifier = event.metaKey || event.ctrlKey || event.altKey;
      if (event.key === key && !event.repeat && !hasModifier) {
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [key]);
}
