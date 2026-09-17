import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Layers,
  LayoutGrid,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Skiper96 } from "@/components/ui/skiper96";
import { ConvertoFooter } from "@/components/ui/converto-footer";
import { useHub } from "./context";

const destinations = {
  library: "/pormts",
  collections: "/pormts/collections",
  saved: "/pormts/saved",
  builder: "/pormts/builder",
} as const;

export function HubFrame({
  children,
  notice,
  dismiss,
}: {
  children: ReactNode;
  notice: string;
  dismiss: () => void;
}) {
  const { saved, ready } = useHub();
  const navigate = useNavigate();
  const location = useRouterState({ select: (state) => state.location });
  const urlQuery = (location.search as { q?: string }).q || "";
  const [query, setQuery] = useState(urlQuery);
  const searchRef = useRef<HTMLInputElement>(null);
  const activeTab = location.pathname.includes("/collections")
    ? "collections"
    : location.pathname.includes("/saved")
      ? "saved"
      : location.pathname.includes("/builder")
        ? "builder"
        : "library";
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if (
        event.key === "/" &&
        !(
          event.target instanceof HTMLElement &&
          (event.target.isContentEditable ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))
        )
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <div className="ph min-h-screen w-full bg-[#52606e] text-slate-100 flex flex-col justify-between">
      <a className="ph-skip" href="#hub-main">
        Skip to content
      </a>
      <div className="w-full flex-1 flex flex-col items-center p-3 sm:p-6 lg:p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5e6f80] via-[#4e5c6a] to-[#414d59]">
        <div className="ph-original-shell w-full max-w-[1320px] bg-[#647485]/80 backdrop-blur-3xl rounded-[34px] sm:rounded-[42px] border border-white/20 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.35)] p-6 sm:p-8 lg:p-10 relative overflow-hidden flex-1 flex flex-col">
          <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-white/10 rounded-full blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[100px]" />
          <header className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-5 pb-6 border-b border-white/15">
            <Link
              to="/pormts"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm whitespace-nowrap"
              aria-label="pormts hub home"
            >
              pormts hub
            </Link>
            <Skiper96
              className="ph-original-nav"
              tabs={[
                { id: "library", title: "Library", icon: LayoutGrid },
                { id: "collections", title: "Collections", icon: Layers },
                {
                  id: "saved",
                  title: "Saved",
                  icon: Bookmark,
                  badge: ready && saved.length ? saved.length : undefined,
                },
                { id: "builder", title: "Builder", icon: Sparkles },
              ]}
              activeTab={activeTab}
              onTabChange={(id) =>
                navigate({ to: destinations[id as keyof typeof destinations] })
              }
            >
              <form
                className="ph-nav-search relative flex items-center pl-2 pr-2"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  navigate({
                    to: "/pormts",
                    search: { q: query.trim() || undefined },
                    resetScroll: false,
                  });
                }}
              >
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  maxLength={200}
                  aria-label="Search prompts"
                  placeholder="Search prompts..."
                  className="bg-transparent text-xs sm:text-sm text-white placeholder:text-white/60 focus:outline-none w-24 sm:w-36 lg:w-44 px-2"
                />
                <button
                  type="submit"
                  aria-label="Search library"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 transition shrink-0"
                >
                  <Search size={15} />
                </button>
              </form>
            </Skiper96>
            <a
              href="/"
              title="Return to Main Website"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-semibold text-white transition shadow-sm backdrop-blur-md whitespace-nowrap"
            >
              <ArrowLeft size={14} />
              Main Website
            </a>
          </header>
          <main id="hub-main" tabIndex={-1} className="relative z-10 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <div className="w-full bg-[#0a0c10] py-4">
        <ConvertoFooter
          brandName="pormts hub"
          displayWordmark="PORMTS HUB"
          description="Website-building prompts with complete page plans, real interactions, and a clear path from idea to launch."
          copyrightText="©2026 pormts hub. Built by TechVRS."
          creditText="Find a prompt. Make it yours. Build your website."
          columns={[
            {
              title: "Discover",
              links: [
                { label: "Prompt library", href: "/pormts" },
                { label: "Collections", href: "/pormts/collections" },
              ],
            },
            {
              title: "Your workspace",
              links: [
                { label: "Saved prompts", href: "/pormts/saved" },
                { label: "Prompt builder", href: "/pormts/builder" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "How it works", href: "/pormts/guide" },
                { label: "About & privacy", href: "/pormts/about" },
              ],
            },
            {
              title: "TechVRS",
              links: [
                { label: "Main website", href: "/" },
                { label: "Contact", href: "/contact" },
              ],
            },
          ]}
        />
      </div>
      <div
        className={`ph-toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Check size={17} />
            {notice}
            <button aria-label="Dismiss notification" onClick={dismiss}>
              <X size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
