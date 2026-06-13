import type { QueryClient } from "@tanstack/react-query";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../index.css?url";
import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "../theme/colors";
import { THEME_OVERRIDE_VALUE, THEME_STORAGE_KEY } from "../theme/storage";

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=matchMedia('(prefers-color-scheme: dark)').matches;var dark=s==='${THEME_OVERRIDE_VALUE}'?!d:d;var r=document.documentElement;var m=document.querySelector('meta[name="theme-color"]');r.classList.toggle('dark',dark);r.style.colorScheme=dark?'dark':'light';if(m)m.setAttribute('content',dark?'${DARK_THEME_COLOR}':'${LIGHT_THEME_COLOR}');}catch(e){}})();history.scrollRestoration='manual';`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "axel zareb" },
      {
        name: "description",
        content: "Axel Zareb, software engineer based in the Paris area.",
      },
      { name: "theme-color", content: LIGHT_THEME_COLOR },
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
      { rel: "shortcut icon", href: "/favicon/favicon.ico" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
