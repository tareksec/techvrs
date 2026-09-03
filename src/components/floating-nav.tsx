import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme";
import { StatusPulse, ThemeToggle } from "@/components/site-chrome";

/* ── Route map for the dock ── */
const NAV_ITEMS = [
  { to: "/",         label: "Home"     },
  { to: "/services", label: "Services" },
  { to: "/work",     label: "Work"     },
  { to: "/demos",    label: "Demos"    },
  { to: "/about",    label: "About"    },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
] as const;

/* ── External properties surfaced in the "Elsewhere" overflow menu ── */
const ELSEWHERE_LINKS = [
  {
    label: "GitHub — Open Source",
    href: "https://github.com/tareksec",
    external: true,
  },
  {
    label: "ArtX Studio — Design & Build",
    href: "https://artx.techvrs.com",
    external: false,
  },
] as const;

/* ── Desktop overflow dropdown for external properties ──
   Sharp-cornered, dark terminal panel — click-toggled with
   outside-click / Escape dismissal for reliable a11y (not
   hover-only). */
function ElsewhereMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`mono flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest transition-all duration-300 ease-out hover:bg-signal/10 ${
          open ? "text-signal bg-signal/10" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Elsewhere
        <span
          className={`transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
          aria-hidden
        >
          ↓
        </span>
      </button>

      {/* Dropdown panel — dark terminal card, sharp corners */}
      <div
        role="menu"
        className={`absolute right-0 top-[calc(100%+0.5rem)] w-64 origin-top-right border border-[#1f2a3a] bg-[#0D1117] shadow-2xl shadow-black/50 transition-all duration-150 ease-out ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="mono px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-[#5b6b82] border-b border-[#1f2a3a]">
          External // Elsewhere
        </div>
        <ul className="py-1">
          {ELSEWHERE_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="mono flex items-center justify-between gap-3 px-3 py-2.5 text-[11px] uppercase tracking-widest text-[#9fb0c3] transition-colors hover:bg-[#131b28] hover:text-signal"
              >
                {l.label}
                <span className="opacity-60">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ── Scroll progress — thin signal strip along the capsule's bottom edge ── */
function DockScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
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

/* ═════════════════════════════════════════════════════════════
   FloatingNav — Copyfolio-style floating glass dock.

   - NOT full-width: a fixed capsule centered at the top of the
     viewport (max-w-5xl, rounded-2xl)
   - Glassmorphism: translucent theme-aware background +
     backdrop-blur-xl + saturate boost, hairline border, layered
     shadow for depth
   - Docking micro-interaction: capsule tightens toward the top
     edge and gains depth once the page is scrolled
   - Theme compatible: all surfaces derive from CSS vars
     (--background / --hairline / --signal), so light & dark
     modes work automatically
   ═════════════════════════════════════════════════════════════ */
export function FloatingNav() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Keep the favicon in sync with the active theme */
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

  /* Docking effect trigger */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Full-width fixed rail that only centers the capsule —
       pointer-events pass through the empty sides */
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6">
      <nav
        /* The glass capsule. transform-gpu avoids Safari blur flicker;
           overflow-hidden clips the progress strip + mobile dropdown
           to the rounded corners. */
        className={`pointer-events-auto relative w-full max-w-5xl transform-gpu overflow-visible rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out ${
          scrolled
            ? "mt-2.5 border-hairline bg-background/80 shadow-xl shadow-black/10 dark:shadow-black/40"
            : "mt-4 border-hairline/70 bg-background/60 shadow-lg shadow-black/5 dark:shadow-black/25"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-4">
          {/* ── Brand ── */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <img
              src={theme === "dark" ? "/logo-dark.webp" : "/logo-light.webp"}
              alt="techvrs shield logo"
              width={34}
              height={34}
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ objectFit: "contain" }}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold tracking-tight">techvrs</span>{" "}
              <span className="mono text-[8px] uppercase tracking-widest text-muted-foreground">
                secure by design
              </span>
            </div>
          </Link>

          {/* ── Desktop links: soft pill hover, persistent signal pill on active ── */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.slice(1).map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  activeOptions={{ exact: to === "/" }}
                  className="mono block rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground transition-all duration-300 ease-out hover:bg-signal/10 hover:text-foreground"
                  activeProps={{ className: "!text-signal bg-signal/10" }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <ElsewhereMenu />
          </ul>

          {/* ── Right cluster: status pulse, theme toggle, mobile burger ── */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden xl:block">
              <StatusPulse compact />
            </div>
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="floating-nav-mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:border-signal/60 md:hidden"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown: expands the capsule itself (grid-rows trick),
              inherits the theme-aware glass instead of a hardcoded color ── */}
        <div
          id="floating-nav-mobile-menu"
          aria-hidden={!open}
          className={`grid transition-all duration-300 ease-out md:hidden ${
            open
              ? "visible grid-rows-[1fr] opacity-100"
              : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-hairline/60 px-4 py-3">
              {NAV_ITEMS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: to === "/" }}
                  className="mono flex items-center justify-between border-b border-hairline/40 py-3 text-[12px] uppercase tracking-widest text-muted-foreground transition-colors last:border-b-0 hover:text-signal"
                  activeProps={{ className: "!text-signal" }}
                >
                  {label}
                  <span className="opacity-40">→</span>
                </Link>
              ))}
              <div className="mono mt-1 pt-3 pb-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70 border-t border-hairline/40">
                Elsewhere
              </div>
              {ELSEWHERE_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="mono flex items-center justify-between border-b border-hairline/40 py-3 text-[12px] uppercase tracking-widest text-muted-foreground transition-colors last:border-b-0 hover:text-signal"
                >
                  {l.label}
                  <span className="opacity-40">↗</span>
                </a>
              ))}
              <div className="pb-1 pt-4">
                <StatusPulse compact />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress strip inside the capsule's bottom edge */}
        <DockScrollProgress />
      </nav>
    </header>
  );
}
