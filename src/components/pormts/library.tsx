import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Code2,
  Flame,
  Globe,
  Layers,
  Palette,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import {
  categories,
  collections,
  filterPrompts,
  makePrompt,
  prompts,
  type LibraryFilters,
} from "@/content/pormts";
import { Route } from "@/routes/pormts.index";
import { CopyButton, EmptyState } from "./hub";
import { PromptCard, PromptCover, PromptDialog } from "./poster";

const categoryIcons = [
  Globe,
  Sparkles,
  ShoppingBag,
  Palette,
  BarChart3,
  Briefcase,
  BookOpen,
  Code2,
];
const featured = [
  {
    prompt: prompts[0],
    title: "Your next\nwebsite starts\nwith a prompt",
    image: "photo-1578632767115-351597cf2477",
    label: "FEATURED · SAAS WEBSITE",
  },
  {
    prompt: prompts[1],
    title: "Give your\ncreative work\na home of its own",
    image: "photo-1534447677768-be436bb09401",
    label: "FEATURED · CREATIVE PORTFOLIO",
  },
];

export function Library() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [limit, setLimit] = useState(12);
  const results = filterPrompts(filters);
  const collection = collections.find((c) => c.slug === filters.collection);
  useEffect(() => {
    setLimit(12);
  }, [
    filters.q,
    filters.category,
    filters.level,
    filters.sort,
    filters.collection,
  ]);
  const change = (patch: LibraryFilters) =>
    navigate({
      search: (previous) => ({ ...previous, ...patch }),
      resetScroll: false,
    });
  return (
    <>
      <section
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 my-6 sm:my-7"
        aria-label="Featured website prompts"
      >
        {featured.map(({ prompt, title, image, label }) => (
          <article
            key={prompt.slug}
            className="ph-featured relative h-[270px] sm:h-[300px] rounded-[26px] overflow-hidden border border-white/15 shadow-xl group"
          >
            <PromptCover prompt={prompt} heroImage={image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
              <div className="max-w-md">
                <span className="ph-featured-label">{label}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-sm whitespace-pre-line tracking-tight">
                  {title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <PromptDialog prompt={prompt}>
                  <button className="ph-featured-button flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-black/85 hover:bg-black backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all shadow-lg active:scale-95">
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                      <Code2 size={11} className="text-slate-950" />
                    </span>
                    Explore prompt
                  </button>
                </PromptDialog>
                <CopyButton compact iconOnly text={makePrompt(prompt)} />
              </div>
            </div>
          </article>
        ))}
      </section>
      <div
        className="ph-category-row relative z-10 flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-5"
        role="group"
        aria-label="Prompt categories"
      >
        {[
          { label: "All prompts", value: undefined, icon: Flame },
          ...categories.map((category, i) => ({
            label: category,
            value: category,
            icon: categoryIcons[i],
          })),
        ].map(({ label, value, icon: Icon }) => (
          <button
            key={label}
            aria-pressed={filters.category === value}
            onClick={() => change({ category: value })}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-[18px] text-xs sm:text-sm whitespace-nowrap transition-all duration-200 border ${filters.category === value ? "bg-white/35 text-white border-white/50 shadow-md font-semibold backdrop-blur-xl" : "bg-white/12 text-white/90 border-white/15 hover:bg-white/20 hover:text-white backdrop-blur-md font-medium"}`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <section aria-labelledby="library-title" id="library">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-1 pb-4">
          <div className="flex items-center gap-3">
            <h1
              id="library-title"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              {collection?.title ||
                (filters.category
                  ? `${filters.category} prompts`
                  : "Website building prompts")}
            </h1>
            <span
              className="ph-result-count px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/10"
              aria-live="polite"
            >
              {results.length} prompts
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/pormts/guide" className="ph-guide-link">
              How to use <ArrowUpRight size={13} />
            </Link>
            <div className="flex items-center bg-black/55 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 gap-2.5 text-white/90">
              <button
                aria-label="Filter options"
                aria-expanded={showFilters}
                aria-controls="prompt-filters"
                onClick={() => setShowFilters(!showFilters)}
                className="ph-filter-toggle"
              >
                <SlidersHorizontal size={15} />
              </button>
              <span className="w-px h-3 bg-white/20" />
              <label className="ph-sort-label">
                <span className="ph-sr-only">Sort prompts</span>
                <select
                  aria-label="Sort prompts"
                  value={filters.sort || "featured"}
                  onChange={(event) =>
                    change({
                      sort:
                        event.target.value === "featured"
                          ? undefined
                          : event.target.value,
                    })
                  }
                >
                  <option value="featured">Featured</option>
                  <option value="az">A–Z</option>
                  <option value="starter">Starter first</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        {showFilters && (
          <div id="prompt-filters" className="ph-filter-panel">
            <label className="ph-field">
              Difficulty
              <select
                value={filters.level || ""}
                onChange={(e) => change({ level: e.target.value || undefined })}
              >
                <option value="">All levels</option>
                <option>Starter</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label className="ph-field">
              Collection
              <select
                value={filters.collection || ""}
                onChange={(e) =>
                  change({ collection: e.target.value || undefined })
                }
              >
                <option value="">All collections</option>
                {collections.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </label>
            <p>
              Complete page plans and working interactions.
              <br />
              Copy a brief into your website-building assistant.
            </p>
          </div>
        )}
        {(filters.q ||
          filters.category ||
          filters.level ||
          filters.collection) && (
          <div className="ph-active-filters">
            <span>
              {[
                filters.q && `Search: “${filters.q}”`,
                filters.category,
                filters.level,
                collection?.title,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
            <button
              onClick={() => navigate({ search: {}, resetScroll: false })}
            >
              Clear filters <X size={13} />
            </button>
          </div>
        )}
        {results.length ? (
          <div className="ph-poster-grid relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {results.slice(0, limit).map((prompt) => (
              <PromptCard prompt={prompt} key={prompt.slug} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No prompts found"
            description="Try another keyword or clear your filters to explore the website prompt library."
          >
            <button
              className="ph-btn ph-btn-dark"
              onClick={() => navigate({ search: {}, resetScroll: false })}
            >
              Clear all filters
            </button>
          </EmptyState>
        )}
        {results.length > limit && (
          <div className="ph-load-more">
            <button
              className="ph-btn ph-btn-outline"
              onClick={() => setLimit(limit + 12)}
            >
              Show more prompts <ArrowRight size={15} />
            </button>
            <span>
              {Math.min(limit, results.length)} of {results.length} prompts
            </span>
          </div>
        )}
      </section>
      <div className="ph-library-footnote">
        <span>
          <Layers size={14} />
          {prompts.length} free website briefs · {categories.length} categories
        </span>
        <Link to="/pormts/builder">
          Customize your own prompt <Sparkles size={14} />
        </Link>
      </div>
    </>
  );
}
