import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/site-nav";
import { SiteFooter } from "../components/site-footer";
import { ScrollProgress } from "../components/reveal";
import { WaitlistBand } from "../components/sections/waitlist-band";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="tnum font-display text-7xl tracking-tight text-accent">404</p>
        <h1 className="t-h3 mt-4">This page isn't here.</h1>
        <p className="mt-3 text-muted-foreground">
          The link may be old, or the page may have moved. The home page has everything.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn btn-primary">
            Back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-primary btn-sm"
          >
            Try again
          </button>
          <a href="/" className="btn btn-quiet btn-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Google tags, both supplied at build time.
 *
 * These carry the VITE_ prefix on purpose, which is what makes Vite inline
 * them into the browser bundle. That is the opposite of the rule for the
 * Supabase keys: a Measurement ID and a Search Console token are public by
 * design, printed in the page for Google to read, and neither grants access
 * to anything. Leave either unset and the corresponding tag is simply not
 * rendered, which is why local dev and preview builds report nothing.
 */
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CuspAI: know what's moving, build what's next" },
      {
        name: "description",
        content:
          "A two-minute daily brief on the fields you follow, and a step-by-step plan for whatever you want to build. Coming soon to iPhone and Android.",
      },
      { name: "theme-color", content: "#051319" },
      { name: "author", content: "CuspAI" },
      { property: "og:site_name", content: "CuspAI" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(GOOGLE_SITE_VERIFICATION
        ? [{ name: "google-site-verification", content: GOOGLE_SITE_VERIFICATION }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // SVG first for browsers that take it — it re-colours itself for a light
      // or dark tab strip. The PNG is the fallback for those that don't.
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400..700&family=Outfit:wght@400..600&display=swap",
      },
    ],
    scripts: [
      {
        // The page is served dark. Only a visitor who chose light is switched,
        // and it happens here, before the first paint, so nothing flashes.
        children: `try{if(localStorage.getItem("cusp-theme")==="light")document.documentElement.classList.remove("dark");}catch(e){}`,
      },
      // Google Analytics 4. Route changes after the first load are counted by
      // GA4's own enhanced measurement, which listens for History API pushes;
      // TanStack Router navigates that way, so no manual page_view is needed.
      ...(GA_MEASUREMENT_ID
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // `dark` is the default look. The head script may remove the class before
    // React hydrates, which is expected, so the mismatch warning is silenced.
    <html lang="en-IN" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // The admin dashboard is a tool, so it gets the page without the marketing chrome.
  const admin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-action focus:px-4 focus:py-2 focus:text-action-foreground"
      >
        Skip to the content
      </a>
      {admin ? null : <ScrollProgress />}
      <SiteNav />
      <div id="main">
        <Outlet />
      </div>
      {admin ? null : <WaitlistBand />}
      <SiteFooter />
    </QueryClientProvider>
  );
}
