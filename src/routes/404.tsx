import { createFileRoute } from "@tanstack/react-router";

import NotFound from "../components/NotFound";

// Prerendered to /404/index.html, which Caddy serves for every missing page.
export const Route = createFileRoute("/404")({
  // Not split: on an unknown URL the client never matches /404, so a preload for its chunk would break hydration.
  codeSplitGroupings: [],
  component: NotFound,
});
