import { useCallback, useEffect } from "react";

export default function useKeyPress(key: string, callback: () => void) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    },
    [callback, key],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
}
