import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme";
import { StatusPulse, ThemeToggle } from "@/components/site-chrome";

/* ── Route map for the dock ── */
const NAV_ITEMS = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/services", label: "Services" },
  { to: "/work",     label: "Work"     },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
] as const;

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
        className={`pointer-events-auto relative w-full max-w-5xl transform-gpu overflow-hidden rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out ${
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
            <li>
              <a
                href="https://tareksec.dev"
                target="_blank"
                rel="noreferrer"
                className="mono block rounded-full px-3 py-1.5 text-[11px] uppercase tracking-widest text-signal transition-all duration-300 ease-out hover:bg-signal/10"
              >
                Portfolio ↗
              </a>
            </li>
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
