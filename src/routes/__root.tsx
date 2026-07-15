import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CogniLauncher } from "@/components/site/CogniLauncher";

const SITE_URL = "https://cognivantalabs.com";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cognivantalabs.com/#organization",
      name: "Cognivanta Labs",
      alternateName: "Cognivanta Labs Pvt. Ltd.",
      url: "https://cognivantalabs.com/",
      logo: "https://cognivantalabs.com/logos/cognivanta-favicon.png",
      sameAs: [
        "https://www.linkedin.com/in/cognivanta-labs-42757b400/",
        "https://x.com/cognivantalabs",
        "https://www.facebook.com/profile.php?id=61586747050803",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://cognivantalabs.com/#website",
      name: "Cognivanta Labs",
      url: "https://cognivantalabs.com/",
      publisher: { "@id": "https://cognivantalabs.com/#organization" },
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl font-black text-gradient-aurora">404</h1>
          <h2 className="mt-4 font-display text-xl font-semibold">Signal lost</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This route isn't part of the cognitive core. Let's get you home.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="btn-electric inline-flex rounded-md px-5 py-2.5 text-sm font-medium"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <h1 className="font-display text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-electric rounded-md px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost-glow rounded-md px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    const pathname = matches.at(-1)?.pathname ?? "/";

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Cognivanta Labs — Cognitive AI beyond generation" },
        {
          name: "description",
          content:
            "Cognivanta Labs builds CINTENT™, the sovereign Cognitive Intent Platform powering a multi-domain ecosystem of reasoning-first AI products. Human + AI, India-built for the world.",
        },
        { name: "author", content: "Cognivanta Labs" },
        { property: "og:site_name", content: "Cognivanta Labs" },
        { property: "og:title", content: "Cognivanta Labs — Cognitive AI beyond generation" },
        {
          property: "og:description",
          content:
            "The future won't be generated. It will be understood. Explore CINTENT™ and the Cognivanta ecosystem.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: `${SITE_URL}${pathname === "/" ? "/" : pathname}`,
        },
        {
          property: "og:image",
          content: "https://cognivantalabs.com/hero/hero-poster-clean.png",
        },
        { property: "og:image:alt", content: "Cognivanta Labs cognitive AI platform" },
        { property: "og:image:width", content: "1840" },
        { property: "og:image:height", content: "1095" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Cognivanta Labs - Building the future beyond AI" },
        {
          name: "twitter:description",
          content:
            "The future will not be generated. It will be understood. Explore CINTENT and the Cognivanta ecosystem.",
        },
        {
          name: "twitter:image",
          content: "https://cognivantalabs.com/hero/hero-poster-clean.png",
        },
        { name: "theme-color", content: "#04060d" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/manifest.webmanifest" },
        {
          rel: "icon",
          href: "/logos/cognivanta-favicon.png",
          type: "image/png",
        },
        {
          rel: "apple-touch-icon",
          href: "/logos/cognivanta-favicon.png",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "preload", href: "/hero/hero-poster-clean.png", as: "image", fetchPriority: "high" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
        <Footer />
        <CogniLauncher />
      </div>
    </QueryClientProvider>
  );
}
