import { useEffect, useEffectEvent } from "react";

export default function useKeyPress(key: string, callback: () => void) {
  const onKeyPress = useEffectEvent(callback);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const hasModifier = event.metaKey || event.ctrlKey || event.altKey;
      if (event.key === key && !event.repeat && !hasModifier) {
        onKeyPress();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [key]);
}
