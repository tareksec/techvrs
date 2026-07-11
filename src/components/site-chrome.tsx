import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme";

export function StatusPulse({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="pulse-dot" aria-hidden />
        <span className="text-foreground">SYSTEM: SECURE</span>
      </span>
      <span className="text-hairline">|</span>
      <span className="flex items-center gap-2">
        <span className="pulse-dot amber" aria-hidden />
        MONITORING: ACTIVE
      </span>
      {!compact && (
        <>
          <span className="text-hairline">|</span>
          <span>STATUS: OPERATIONAL</span>
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
  { to: "/about",   label: "About"    },
  { to: "/services",label: "Services" },
  { to: "/work",    label: "Work"     },
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
            SOC analyst and security-first engineer. Detection, hardened deployments,
            technical SEO, and secure AI automation — built to last under attack.
          </p>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            techvrs is a personal branding project — my full resume and portfolio live
            at{" "}
            <a
              href="https://tareksec.dev"
              target="_blank"
              rel="noreferrer"
              className="text-signal hover:underline"
            >
              tareksec.dev ↗
            </a>
            .
          </p>
          <StatusPulse />

          {/* Mini CTA */}
          <Link
            to="/contact"
            className="mono text-[10px] uppercase tracking-widest border border-signal/50 text-signal px-4 py-2.5 hover:bg-signal hover:text-signal-foreground transition-colors inline-flex items-center gap-2 w-fit mt-2"
          >
            Open a channel →
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
              { label: "Portfolio — tareksec.dev", href: "https://tareksec.dev"                    },
              { label: "Email",                    href: "mailto:hello@techvrs.com"                },
              { label: "LinkedIn",                 href: "https://www.linkedin.com/in/mdtarek404/" },
              { label: "GitHub",                   href: "https://github.com/tareksec"             },
              { label: "Medium",                   href: "https://medium.com/@mdtareksec"          },
              { label: "ArtX Studio — design, dev & SEO", href: "https://artx.techvrs.com"         },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") && !l.href.includes("artx.techvrs.com") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-signal transition-colors flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-signal text-xs">↗</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Cert badges mini */}
          <div className="mt-6">
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              Certified
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Security+", "CySA+", "THM Top 1%", "AWS CCP"].map((c) => (
                <span
                  key={c}
                  className="mono text-[9px] uppercase tracking-widest px-2 py-1 border border-hairline text-muted-foreground"
                  style={{ background: "rgba(2,132,199,0.05)" }}
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
            © {year} techvrs.com —{" "}
            <span className="text-signal">Secure by Design.</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="live-dot" aria-hidden style={{ width: 6, height: 6 }} />
              System: Operational
            </span>
            <span className="text-hairline" aria-hidden>
              |
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono text-[11px] uppercase tracking-[0.25em] text-signal mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-signal/60" />
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
    <Tag className={`panel brackets hover-lift p-6 ${className}`}>
      <span className="b-tr" />
      <span className="b-bl" />
      {children}
    </Tag>
  );
}
