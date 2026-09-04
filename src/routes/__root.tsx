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
      <div className="max-w-lg text-center glass-card p-10 md:p-12 rounded-3xl border border-hairline/80 shadow-xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-signal mb-4">
          PAGE NOT FOUND
        </div>
        <h1 className="text-6xl md:text-7xl font-display font-bold text-foreground">404</h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          The page you are looking for doesn't exist or has been moved to a new address.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 bg-signal text-signal-foreground px-6 py-3.5 rounded-xl hover:shadow-[0_0_30px_-4px_rgba(0,217,255,0.5)] transition-all"
          >
            ← Back to Homepage
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
      <div className="max-w-md text-center glass-card p-10 rounded-3xl border border-hairline/80 shadow-xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-critical mb-4">
          AN ERROR OCCURRED
        </div>
        <h1 className="text-xl font-display font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Please try refreshing the page or navigating back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="text-xs font-semibold uppercase tracking-wider bg-signal text-signal-foreground px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="text-xs font-semibold uppercase tracking-wider border border-hairline px-5 py-2.5 rounded-xl hover:border-foreground/40 transition-colors"
          >
            Go Home
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
      { title: "TechVRS — Modern Digital Agency | Web, Design, SEO & Secure AI" },
      {
        name: "description",
        content:
          "TechVRS is a modern digital agency helping businesses build high-performance web applications, design conversion-focused experiences, grow through technical SEO, and deploy secure AI solutions.",
      },
      { name: "author", content: "TechVRS" },
      { name: "theme-color", content: "#0D1117" },
      // ── Open Graph ─────────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/" },
      { property: "og:title", content: "TechVRS — Modern Digital Agency | Web, Design, SEO & Secure AI" },
      {
        property: "og:description",
        content:
          "Build. Grow. Secure. We engineer high-performance websites, conversion-focused UI/UX, technical SEO, and enterprise-grade AI solutions.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS — Digital Experiences Built to Perform." },
      // ── Twitter / X ────────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TechVRS — Modern Digital Agency | Web, Design, SEO & Secure AI" },
      {
        name: "twitter:description",
        content:
          "Build. Grow. Secure. We engineer high-performance websites, conversion-focused UI/UX, technical SEO, and enterprise-grade AI solutions.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "TechVRS — Digital Experiences Built to Perform." },
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
  name: "TechVRS",
  url: "https://techvrs.com/",
  description:
    "A modern digital agency helping businesses build, grow, secure, and optimize their digital presence.",
});

const SCHEMA_ORGANIZATION = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TechVRS",
  url: "https://techvrs.com/",
  logo: "https://techvrs.com/logo.png",
  image: "https://techvrs.com/hero-main.png",
  description:
    "TechVRS is a modern digital agency specializing in Web Development, Web Design, Secure SEO, On-Page & Off-Page SEO, and AI Security & Solutions.",
  serviceType: [
    "Web Development",
    "Web Design",
    "Secure SEO",
    "On-Page & Off-Page SEO",
    "AI Security & AI Solutions",
  ],
  sameAs: [
    "https://github.com/tareksec",
    "https://www.linkedin.com/in/mdtarek404/",
    "https://medium.com/@mdtareksec",
  ],
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* JSON-LD structured data — placed in <body> rather than <head> to
            avoid Replit devtools injecting a <script> into <head> client-side
            only, which shifts DOM node order and causes React 19 hydration crash.
            Google Search fully supports JSON-LD in <body>. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA_WEBSITE }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA_ORGANIZATION }}
        />
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
