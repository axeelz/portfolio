import { useCallback, useEffect } from "react";

export default function useKeyPress(key, callback) {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === key) {
        callback();
      }
    },
    [callback, key]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
}
