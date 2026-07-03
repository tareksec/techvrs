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
import { SiteFooter } from "../components/site-chrome";
import { FloatingNav } from "../components/floating-nav";
import { AiAssistant } from "../components/AiAssistant";
import {
  CursorGlow,
  PageTransition,
  ScrollRevealManager,
} from "../components/micro-interactions";
import { ThemeProvider } from "../lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex items-center justify-center px-6 py-32">
      <div className="max-w-lg text-center panel brackets p-10">
        <span className="b-tr" />
        <span className="b-bl" />
        <div className="mono text-[11px] uppercase tracking-widest text-critical mb-4">
          ERR_404 // ACCESS DENIED
        </div>
        <h1 className="text-6xl font-display font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground mono">
          The resource you requested is not indexed on this perimeter.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="mono text-[11px] uppercase tracking-widest inline-flex items-center gap-2 border border-signal/60 text-signal px-5 py-3 hover:bg-signal hover:text-signal-foreground transition-colors"
          >
            ← Return to base
          </Link>
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center panel brackets p-10">
        <span className="b-tr" />
        <span className="b-bl" />
        <div className="mono text-[11px] uppercase tracking-widest text-critical mb-4">
          ERR // UNCAUGHT_EXCEPTION
        </div>
        <h1 className="text-xl font-display font-semibold text-foreground">
          This page did not load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Retry the request or return to base.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-4 py-2 hover:bg-signal hover:text-signal-foreground transition-colors"
          >
            Retry
          </button>
          <a
            href="/"
            className="mono text-[11px] uppercase tracking-widest border border-hairline px-4 py-2 hover:border-foreground/40 transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "techvrs · Tarek — SOC Analyst & Security Engineer" },
      {
        name: "description",
        content:
          "Production-level security engineering from a SOC analyst — threat detection, hardened deployments, secure AI automation, and technical SEO. Available for roles and engagements.",
      },
      { name: "author", content: "Tarek — techvrs" },
      { name: "theme-color", content: "#0D1117" },
      // ── Open Graph ─────────────────────────────────────────────────────────
      { property: "og:site_name", content: "techvrs" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/" },
      { property: "og:title", content: "techvrs · Tarek — SOC Analyst & Security Engineer" },
      {
        property: "og:description",
        content:
          "Production-level security engineering — threat detection, hardened deployments, and secure AI automation. Available for SOC roles and security engagements.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "techvrs — Secure by Design. Built to Withstand What Others Miss." },
      // ── Twitter / X ────────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "techvrs · Tarek — SOC Analyst & Security Engineer" },
      {
        name: "twitter:description",
        content:
          "Production-level security engineering — threat detection, hardened deployments, and secure AI automation. Available for SOC roles and security engagements.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "techvrs — Secure by Design. Built to Withstand What Others Miss." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Preload the font stylesheet so it's fetched before render-blocking kicks in
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Faculty+Glyphic&family=Outfit:wght@400;500;600;700;800;900&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Faculty+Glyphic&family=Outfit:wght@400;500;600;700;800;900&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Stable JSON-LD strings — defined outside the component so the reference never
// changes between server and client renders, preventing any hydration mismatch.
const SCHEMA_WEBSITE = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "techvrs",
  url: "https://techvrs.com/",
  description:
    "SOC analyst and security-first engineer portfolio — threat detection, hardened deployments, secure AI automation, and technical SEO.",
});

const SCHEMA_PROFILE = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://techvrs.com/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://techvrs.com/" }],
  },
  mainEntity: {
    "@type": "Person",
    name: "Tarek",
    jobTitle: "SOC Analyst & Security Engineer",
    description:
      "SOC analyst candidate with production-level security engineering skills — practical threat detection, hardened infrastructure, and secure AI automation.",
    url: "https://techvrs.com/",
    image: "https://techvrs.com/logo.png",
    knowsAbout: [
      "SOC Analysis",
      "Threat Detection",
      "Detection Engineering",
      "SIEM",
      "MITRE ATT&CK",
      "Cybersecurity",
      "Secure Web Deployment",
      "Technical SEO",
      "AI Agent Development",
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "CompTIA Security+" },
      { "@type": "EducationalOccupationalCredential", name: "CompTIA CySA+" },
    ],
    sameAs: [
      "https://github.com/tareksec",
      "https://www.linkedin.com/in/mdtarek404/",
      "https://medium.com/@mdtareksec",
    ],
  },
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* JSON-LD structured data — rendered directly here rather than via
            head() scripts[] to avoid TanStack Start's Script component
            producing a server/client mismatch that crashes React 19. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA_WEBSITE }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA_PROFILE }}
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
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <ScrollRevealManager />
          <CursorGlow />
          <FloatingNav />
          {/* Top padding offsets the fixed floating dock */}
          <main className="flex-1 pt-24 md:pt-28">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
          <SiteFooter />
          <AiAssistant />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
