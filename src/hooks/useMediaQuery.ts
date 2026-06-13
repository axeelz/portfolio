import { useCallback, useSyncExternalStore } from "react";

export default function useMediaQuery(mediaQuery: string, serverSnapshot = false): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const list = window.matchMedia(mediaQuery);
      list.addEventListener("change", callback);
      return () => list.removeEventListener("change", callback);
    },
    [mediaQuery],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mediaQuery).matches,
    () => serverSnapshot,
  );
}
