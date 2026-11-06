import type { QueryClient } from "@tanstack/react-query";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../index.css?url";
import { CRITICAL_THEME_CSS, THEME_INIT_SCRIPT, getThemeColor } from "../theme/dom";

const SITE_URL = "https://axeelz.com/";
const DESCRIPTION =
  "Axel Zareb, software engineer based in the Paris area. I build websites, apps and tools for small teams.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "axel zareb" },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Axel Zareb" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}og.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: getThemeColor(false) },
    ],
    links: [
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/BrittiSansTrial-Bold.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/PlusJakartaSans-VariableFont_wght.woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "shortcut icon", href: "/favicon/favicon.ico" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_THEME_CSS }} />
        <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <script
          defer
          src="https://umami.axeelz.com/entrypoint"
          data-website-id="e3a7c970-e060-4ef5-9656-90cdd5e33b67"
          data-domains="axeelz.com"
        />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
