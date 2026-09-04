import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme";

export function StatusPulse({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-wide text-muted-foreground">
      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" aria-hidden />
        <span>Accepting New Projects</span>
      </span>
      {!compact && (
        <>
          <span className="text-hairline">/</span>
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">Q2 2026 Availability</span>
        </>
      )}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [iconKey, setIconKey] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const isDark = theme === "dark";

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    /* Spawn mercury-drop ripple at click position */
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.className = "liquid-metal-ripple";
      ripple.style.cssText = `left:${x}px;top:${y}px;width:${rect.width}px;height:${rect.width}px;`;
      /* Remove any previous ripple */
      rippleRef.current?.remove();
      rippleRef.current = ripple;
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    }
    /* Re-key icon to re-trigger the morph animation */
    setIconKey((k) => k + 1);
    toggle();
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="liquid-metal-btn flex items-center gap-2 px-4 py-2"
    >
      {/* SVG icon — re-mounted on each toggle via key to replay morph animation */}
      <span key={iconKey} className="liquid-metal-icon">
        {isDark ? (
          /* Sun */
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="rgba(10,25,45,0.75)" strokeWidth="2.2"
               strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2"  x2="12" y2="5"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
            <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"/>
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
            <line x1="2"  y1="12" x2="5"  y2="12"/>
            <line x1="19" y1="12" x2="22" y2="12"/>
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
            <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          /* Moon */
          <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(10,25,45,0.65)"
               stroke="rgba(10,25,45,0.75)" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </span>

      {/* Label */}
      <span className="liquid-metal-label hidden sm:inline">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}

const nav = [
  { to: "/",        label: "Home"     },
  { to: "/services",label: "Services" },
  { to: "/work",    label: "Work"     },
  { to: "/demos",   label: "Demos"    },
  { to: "/about",   label: "About"    },
  { to: "/blog",    label: "Blog"     },
  { to: "/contact", label: "Contact"  },
] as const;

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="absolute bottom-0 left-0 h-[1.5px] transition-[width] duration-150 ease-linear"
      style={{
        width: `${pct}%`,
        background: "linear-gradient(90deg, var(--signal), #22d3ee)",
        boxShadow: "0 0 8px 1px rgba(2,132,199,0.5)",
      }}
    />
  );
}

export function SiteNav() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const href = theme === "dark" ? "/logo-light.png" : "/logo-dark.png";
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = href;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-background/85 border-b border-hairline shadow-sm"
          : "bg-transparent"
      }`}
      style={{ position: "sticky" }}
    >
      {/* Scroll progress line */}
      <ScrollProgress />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3 shrink-0">
          <img
            src={theme === "dark" ? "/logo-dark.webp" : "/logo-light.webp"}
            alt="techvrs shield logo"
            width={48}
            height={48}
            className="shrink-0 transition-all group-hover:scale-110"
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-sm tracking-tight">techvrs</span>{" "}
            <span className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
              secure by design
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nav-pill-hover mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all relative"
              activeProps={{
                className:
                  "!text-signal nav-pill-hover mono text-[11px] uppercase tracking-widest relative",
                style: { background: "rgba(2,132,199,0.08)" } as React.CSSProperties,
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://artx.techvrs.com"
            className="nav-pill-hover mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all relative"
          >
            ArtX Studio ↗
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <StatusPulse compact />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="mono text-[11px] uppercase tracking-widest text-foreground border border-hairline px-3 py-2 hover:border-signal/60 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div
          className="md:hidden border-t border-hairline backdrop-blur-xl"
          style={{ background: "rgba(240,246,255,0.96)" }}
        >
          <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="mono text-[12px] uppercase tracking-widest py-3 border-b border-hairline/50 text-muted-foreground hover:text-signal transition-colors flex items-center justify-between"
                activeProps={{ className: "!text-signal" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
                <span className="opacity-40">→</span>
              </Link>
            ))}
            <a
              href="https://artx.techvrs.com"
              onClick={() => setOpen(false)}
              className="mono text-[12px] uppercase tracking-widest py-3 border-b border-hairline/50 text-muted-foreground hover:text-signal transition-colors flex items-center justify-between"
            >
              ArtX Studio
              <span className="opacity-40">↗</span>
            </a>
            <div className="pt-4">
              <StatusPulse compact />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { theme } = useTheme();
  return (
    <footer className="border-t border-hairline mt-32 relative overflow-hidden">
      {/* Subtle footer glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(2,132,199,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Brand col */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <Link to="/" className="group flex items-center gap-3 w-fit">
            <img
              src={theme === "dark" ? "/logo-dark.webp" : "/logo-light.webp"}
              alt="techvrs shield logo"
              width={34}
              height={34}
              className="shrink-0 transition-all group-hover:scale-110 drop-shadow-sm"
              style={{ objectFit: "contain" }}
            />
            <span className="font-display font-bold text-base">techvrs</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            A modern digital agency helping businesses build high-performance web applications,
            craft conversion-driven designs, grow organic visibility through technical SEO,
            and deploy secure AI solutions.
          </p>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            From the first pixel to search dominance and secure automation, we build digital
            systems engineered for measurable business growth.
          </p>
          <StatusPulse />

          {/* Mini CTA */}
          <Link
            to="/contact"
            className="text-xs font-semibold uppercase tracking-wider bg-signal text-signal-foreground px-5 py-2.5 rounded-xl hover:opacity-90 transition-all inline-flex items-center gap-2 w-fit mt-2 shadow-sm"
          >
            Start a project →
          </Link>
        </div>

        {/* Sitemap */}
        <div>
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-hairline">
            Sitemap
          </div>
          <ul className="flex flex-col gap-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-muted-foreground hover:text-signal transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-signal text-xs">›</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Channels */}
        <div>
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-hairline">
            Channels
          </div>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { label: "Email — hello@techvrs.com", href: "mailto:hello@techvrs.com"                },
              { label: "LinkedIn",                 href: "https://www.linkedin.com/in/mdtarek404/" },
              { label: "GitHub",                   href: "https://github.com/tareksec"             },
              { label: "Medium Insights",          href: "https://medium.com/@mdtareksec"          },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-signal transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-signal text-xs">↗</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Capabilities badges mini */}
          <div className="mt-6">
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              Capabilities
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Web Development",
                "Web Design & UI/UX",
                "Secure SEO",
                "On-Page & Off-Page SEO",
                "AI Solutions",
              ].map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-md border border-hairline text-muted-foreground bg-signal/5"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-4 mono text-[10px] uppercase tracking-widest text-muted-foreground flex flex-wrap justify-between gap-2 items-center">
          <span>
            © {year} TechVRS —{" "}
            <span className="text-signal">Modern Digital Technology Agency.</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="live-dot" aria-hidden style={{ width: 6, height: 6 }} />
              Performance: 98+
            </span>
            <span className="text-hairline" aria-hidden>
              |
            </span>
            <span>All Systems Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal mb-4 flex items-center gap-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {children}
    </div>
  );
}

export function Panel({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={`panel hover-lift p-6 rounded-2xl ${className}`}>
      {children}
    </Tag>
  );
}
