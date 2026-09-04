import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback } from "react";
import { SectionLabel } from "@/components/site-chrome";
import { getCategories, getDemos } from "@/lib/supabase";
import type {
  DemoCategory,
  DemoItem,
  BreadcrumbItem,
  DemoViewMode,
  DemoQuickFilter,
} from "@/types/demos";
import { FinderWindow } from "@/components/demos/finder-window";
import { DemoSidebar } from "@/components/demos/demo-sidebar";
import { FolderCard } from "@/components/demos/folder-card";
import { DemoCard } from "@/components/demos/demo-card";
import { DemoListItem } from "@/components/demos/demo-list-item";
import { DemoModal } from "@/components/demos/demo-modal";
import { Folder, Sparkles, Layers, ArrowLeft } from "lucide-react";

interface DemosSearchParams {
  category?: string;
  sub?: string;
  q?: string;
  view?: DemoViewMode;
  filter?: DemoQuickFilter;
}

interface UpdateParamsInput {
  category?: string | null;
  sub?: string | null;
  q?: string | null;
  view?: DemoViewMode | null;
  filter?: DemoQuickFilter | null;
}

export const Route = createFileRoute("/demos")({
  validateSearch: (search: Record<string, unknown>): DemosSearchParams => {
    return {
      category: typeof search.category === "string" ? search.category : undefined,
      sub: typeof search.sub === "string" ? search.sub : undefined,
      q: typeof search.q === "string" ? search.q : undefined,
      view:
        search.view === "list" || search.view === "grid"
          ? (search.view as DemoViewMode)
          : undefined,
      filter: typeof search.filter === "string" ? (search.filter as DemoQuickFilter) : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Demo Library & Website Showcase — TechVRS" },
      {
        name: "description",
        content:
          "Explore TechVRS website templates, design concepts, and development work. Browse high-conversion WordPress websites and custom Next.js web applications in our Finder-style showcase.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/demos" },
      { property: "og:title", content: "Demo Library & Website Showcase — TechVRS" },
      {
        property: "og:description",
        content:
          "Explore TechVRS website templates, design concepts, and custom web applications. Browse high-performance WordPress themes and bespoke platforms.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS Website Demos & Templates Showcase" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Demo Library & Website Showcase — TechVRS" },
      {
        name: "twitter:description",
        content:
          "Explore TechVRS website templates, design concepts, and custom web applications in our interactive showcase.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "TechVRS Website Demos & Templates Showcase" },
    ],
  }),
  component: DemosPage,
});

function DemosPage() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const [categories, setCategories] = useState<DemoCategory[]>([]);
  const [demos, setDemos] = useState<DemoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // URL-driven navigation state
  const selectedCategorySlug = searchParams.category || null;
  const selectedSubcategorySlug = searchParams.sub || null;
  const searchQuery = searchParams.q || "";
  const viewMode: DemoViewMode = searchParams.view || "grid";
  const activeFilter: DemoQuickFilter = searchParams.filter || "all";

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [previewDemo, setPreviewDemo] = useState<DemoItem | null>(null);

  // Synchronize state with URL parameters for native browser history
  const updateParams = useCallback(
    (newParams: UpdateParamsInput, replace = false) => {
      navigate({
        resetScroll: false,
        replace,
        search: (prev) => {
          const next: DemosSearchParams = { ...prev };
          if (newParams.category !== undefined) {
            if (newParams.category) next.category = newParams.category;
            else delete next.category;
          }
          if (newParams.sub !== undefined) {
            if (newParams.sub) next.sub = newParams.sub;
            else delete next.sub;
          }
          if (newParams.q !== undefined) {
            if (newParams.q) next.q = newParams.q;
            else delete next.q;
          }
          if (newParams.view !== undefined) {
            if (newParams.view && newParams.view !== "grid") next.view = newParams.view;
            else delete next.view;
          }
          if (newParams.filter !== undefined) {
            if (newParams.filter && newParams.filter !== "all") next.filter = newParams.filter;
            else delete next.filter;
          }
          return next;
        },
      });
    },
    [navigate]
  );

  // Fetch data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [cats, items] = await Promise.all([getCategories(), getDemos()]);
        setCategories(cats);
        setDemos(items);
      } catch (err) {
        console.error("[demos] failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Organize hierarchy
  const topCategories = useMemo(
    () => categories.filter((c) => !c.parent_id),
    [categories]
  );
  const subcategories = useMemo(
    () => categories.filter((c) => !!c.parent_id),
    [categories]
  );

  const selectedCategory = useMemo(
    () => categories.find((c) => c.slug === selectedCategorySlug) ?? null,
    [categories, selectedCategorySlug]
  );

  const selectedSubcategory = useMemo(
    () => categories.find((c) => c.slug === selectedSubcategorySlug) ?? null,
    [categories, selectedSubcategorySlug]
  );

  // Dynamic counts calculation
  const counts = useMemo(() => {
    const byCategory: Record<string, number> = {};

    demos.forEach((d) => {
      byCategory[d.category_id] = (byCategory[d.category_id] || 0) + 1;

      const cat = categories.find((c) => c.id === d.category_id);
      if (cat?.parent_id) {
        byCategory[cat.parent_id] = (byCategory[cat.parent_id] || 0) + 1;
      }
    });

    const wpCat = topCategories.find((c) => c.slug === "wordpress-websites");
    const customCat = topCategories.find((c) => c.slug === "custom-websites");

    return {
      total: demos.length,
      wordpress: wpCat ? byCategory[wpCat.id] || 0 : 0,
      custom: customCat ? byCategory[customCat.id] || 0 : 0,
      featured: demos.filter((d) => d.featured).length,
      byCategory,
    };
  }, [demos, categories, topCategories]);

  // Current subcategories for the selected category
  const activeSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    return subcategories.filter((s) => s.parent_id === selectedCategory.id);
  }, [selectedCategory, subcategories]);

  // Filtered Demos calculation
  const filteredDemos = useMemo(() => {
    let result = [...demos];

    // Search query matches across all metadata
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return result.filter((d) => {
        const titleMatch = d.title.toLowerCase().includes(q);
        const descMatch = d.description.toLowerCase().includes(q);
        const techMatch = d.technology.toLowerCase().includes(q);
        const stackMatch = d.stack.some((s) => s.toLowerCase().includes(q));
        const cat = categories.find((c) => c.id === d.category_id);
        const catMatch = cat ? cat.name.toLowerCase().includes(q) : false;

        return titleMatch || descMatch || techMatch || stackMatch || catMatch;
      });
    }

    // Subcategory filter
    if (selectedSubcategory) {
      return result.filter((d) => d.category_id === selectedSubcategory.id);
    }

    // Top Category filter
    if (selectedCategory) {
      const validCategoryIds = new Set<string>([
        selectedCategory.id,
        ...subcategories
          .filter((s) => s.parent_id === selectedCategory.id)
          .map((s) => s.id),
      ]);
      return result.filter((d) => validCategoryIds.has(d.category_id));
    }

    // Quick filter
    if (activeFilter === "featured") {
      result = result.filter((d) => d.featured);
    } else if (activeFilter === "wordpress") {
      result = result.filter((d) =>
        d.technology.toLowerCase().includes("wordpress")
      );
    } else if (activeFilter === "custom") {
      result = result.filter(
        (d) => !d.technology.toLowerCase().includes("wordpress")
      );
    } else if (activeFilter === "recent") {
      result = [...result].reverse();
    }

    return result;
  }, [
    demos,
    categories,
    selectedCategory,
    selectedSubcategory,
    activeFilter,
    searchQuery,
    subcategories,
  ]);

  // Breadcrumbs
  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const list: BreadcrumbItem[] = [
      { id: "root", label: "Demos", type: "root" },
    ];

    if (searchQuery.trim()) {
      list.push({
        id: "search",
        label: `Search "${searchQuery}"`,
        type: "subcategory",
      });
      return list;
    }

    if (selectedCategory) {
      list.push({
        id: selectedCategory.id,
        label: selectedCategory.name,
        slug: selectedCategory.slug,
        type: "category",
      });
    }

    if (selectedSubcategory) {
      list.push({
        id: selectedSubcategory.id,
        label: selectedSubcategory.name,
        slug: selectedSubcategory.slug,
        type: "subcategory",
      });
    } else if (!selectedCategory && activeFilter === "featured") {
      list.push({
        id: "featured",
        label: "Featured Work",
        type: "subcategory",
      });
    } else if (!selectedCategory && activeFilter === "recent") {
      list.push({
        id: "recent",
        label: "Recently Added",
        type: "subcategory",
      });
    }

    return list;
  }, [selectedCategory, selectedSubcategory, activeFilter, searchQuery]);

  // Current and parent folder names for the mobile app bar
  const currentFolderTitle = selectedSubcategory
    ? selectedSubcategory.name
    : selectedCategory
    ? selectedCategory.name
    : activeFilter === "featured"
    ? "Featured Work"
    : activeFilter === "recent"
    ? "Recently Added"
    : searchQuery
    ? `Search "${searchQuery}"`
    : "Demo Library";

  const parentFolderTitle = selectedSubcategory
    ? selectedCategory?.name || "Category"
    : selectedCategory
    ? "Demos"
    : undefined;

  // Navigation handlers
  function handleBreadcrumbNavigate(item: BreadcrumbItem, index: number) {
    if (index === 0) {
      updateParams({ category: null, sub: null, q: undefined, filter: "all" });
    } else if (index === 1 && selectedCategory && item.type === "category") {
      updateParams({ sub: null, q: undefined });
    }
  }

  function handleGoBack() {
    if (searchQuery) {
      updateParams({ q: undefined });
      return;
    }
    if (selectedSubcategorySlug) {
      updateParams({ sub: null });
      return;
    }
    if (selectedCategorySlug) {
      updateParams({ category: null, filter: "all" });
      return;
    }
    if (activeFilter !== "all") {
      updateParams({ filter: "all" });
    }
  }

  const canGoBack = Boolean(
    searchQuery ||
      selectedSubcategorySlug ||
      selectedCategorySlug ||
      activeFilter !== "all"
  );

  function getCategoryName(categoryId: string): string {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Website";
  }

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-14 sm:py-16 md:py-24">
      {/* ── Mobile Compact Header (< md) ── */}
      <div className="md:hidden mb-4 px-1 flex items-center justify-between">
        <div>
          <span className="mono text-[10px] uppercase tracking-widest text-signal">
            TechVRS // Showcase
          </span>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Demo Library
          </h1>
        </div>
        <span className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-hairline bg-panel text-muted-foreground">
          {counts.total} Demos
        </span>
      </div>

      {/* ── Desktop Page Header (>= md) ── */}
      <div className="hidden md:block mb-10 md:mb-14">
        <SectionLabel>WEBSITE SHOWCASE // DEMO LIBRARY</SectionLabel>
        <h1 className="flip-fade-text font-display text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl tracking-tight leading-[1.08]">
          Explore our website templates,{" "}
          <span className="accent-shift">design concepts &amp; builds.</span>
        </h1>
        <p className="flip-text mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          A dedicated directory of high-conversion WordPress solutions and bespoke
          React/Next.js web applications. Browse like a file manager, inspect the
          architectural stack, and test live staging previews.
        </p>

        {/* Quick Stacks Banner */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Architecture Stacks:
          </span>
          {["WordPress", "WooCommerce", "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"].map((tag) => (
            <span
              key={tag}
              className="mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-hairline bg-panel/40 text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Responsive Application Window ── */}
      <FinderWindow
        title={
          selectedSubcategory
            ? `TechVRS // ${selectedSubcategory.name}`
            : selectedCategory
            ? `TechVRS // ${selectedCategory.name}`
            : "TechVRS // Demo Library"
        }
        currentFolderTitle={currentFolderTitle}
        parentFolderTitle={parentFolderTitle}
        searchQuery={searchQuery}
        onSearchChange={(q) => updateParams({ q: q || undefined }, true)}
        viewMode={viewMode}
        onViewModeChange={(mode) => updateParams({ view: mode }, true)}
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleBreadcrumbNavigate}
        canGoBack={canGoBack}
        onGoBack={handleGoBack}
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        itemCount={filteredDemos.length}
        sidebar={
          <DemoSidebar
            categories={categories}
            activeFilter={activeFilter}
            selectedCategorySlug={selectedCategorySlug}
            selectedSubcategorySlug={selectedSubcategorySlug}
            counts={counts}
            onSelectFilter={(f) => {
              updateParams({ filter: f, category: null, sub: null, q: undefined });
            }}
            onSelectCategory={(slug) => {
              updateParams({ category: slug, sub: null, q: undefined, filter: "all" });
            }}
            onSelectSubcategory={(subSlug) => {
              updateParams({ sub: subSlug, q: undefined });
            }}
            isOpenMobile={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
        }
      >
        {/* ── Hierarchical Content View ── */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <span className="live-dot" />
            <span className="mono text-xs text-muted-foreground uppercase tracking-widest">
              Initializing Demo Showcase…
            </span>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-10">
            {/* 1. ROOT VIEW: 2 Prominent Platform Folders (WordPress & Custom) */}
            {!selectedCategorySlug && !searchQuery && activeFilter === "all" && (
              <div className="space-y-8">
                <div>
                  <div className="mono text-[10px] sm:text-[11px] uppercase tracking-widest text-signal mb-3 sm:mb-4 flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    SELECT A PLATFORM FOLDER TO BROWSE
                  </div>

                  {/* 2-Column Responsive Folder Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
                    {topCategories.map((top) => (
                      <FolderCard
                        key={top.id}
                        title={top.name}
                        count={counts.byCategory[top.id] || 0}
                        description={top.description}
                        slug={top.slug}
                        onClick={() =>
                          updateParams({
                            category: top.slug,
                            sub: null,
                            filter: "all",
                          })
                        }
                        variant="primary"
                      />
                    ))}
                  </div>
                </div>

                {/* Featured Demos highlight section */}
                <div className="pt-6 sm:pt-8 border-t border-hairline/40">
                  <div className="mono text-[10px] sm:text-[11px] uppercase tracking-widest text-amber mb-4 sm:mb-5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    FEATURED CLIENT BUILDS &amp; CONCEPTS
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {demos
                      .filter((d) => d.featured)
                      .slice(0, 3)
                      .map((demo) => (
                        <DemoCard
                          key={demo.id}
                          demo={demo}
                          categoryName={getCategoryName(demo.category_id)}
                          onPreview={setPreviewDemo}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. CATEGORY LEVEL VIEW: Subcategory Folders + Demos */}
            {selectedCategory && !selectedSubcategory && !searchQuery && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-hairline/40">
                  <div>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                      {selectedCategory.name}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                      {selectedCategory.description}
                    </p>
                  </div>

                  <button
                    onClick={handleGoBack}
                    className="mono text-xs uppercase tracking-wider text-muted-foreground hover:text-signal transition-colors flex items-center gap-1.5 min-h-[44px] px-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Parent Folder</span>
                    <span className="sm:hidden">Back</span>
                  </button>
                </div>

                {/* Subcategory Folders in 2-column mobile grid */}
                {activeSubcategories.length > 0 && (
                  <div>
                    <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-signal" />
                      Browse by Subcategory
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {activeSubcategories.map((sub) => (
                        <FolderCard
                          key={sub.id}
                          title={sub.name}
                          count={counts.byCategory[sub.id] || 0}
                          description={sub.description}
                          slug={sub.slug}
                          onClick={() => updateParams({ sub: sub.slug })}
                          variant="sub"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Demos in this category */}
                <div className="pt-4 sm:pt-6">
                  <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4">
                    All {selectedCategory.name} Demos ({filteredDemos.length})
                  </div>

                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                      {filteredDemos.map((demo) => (
                        <DemoCard
                          key={demo.id}
                          demo={demo}
                          categoryName={getCategoryName(demo.category_id)}
                          onPreview={setPreviewDemo}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {filteredDemos.map((demo) => (
                        <DemoListItem
                          key={demo.id}
                          demo={demo}
                          categoryName={getCategoryName(demo.category_id)}
                          onPreview={setPreviewDemo}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SUBCATEGORY OR FILTERED VIEW: Individual Demos */}
            {(selectedSubcategory ||
              searchQuery ||
              (activeFilter !== "all" && !selectedCategory)) && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-hairline/40">
                  <div>
                    <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                      {selectedSubcategory
                        ? selectedSubcategory.name
                        : searchQuery
                        ? `Search Results for "${searchQuery}"`
                        : activeFilter === "featured"
                        ? "Featured Demos"
                        : activeFilter === "recent"
                        ? "Recently Added Demos"
                        : "Showcase Demos"}
                    </h2>
                    {selectedSubcategory?.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                        {selectedSubcategory.description}
                      </p>
                    )}
                  </div>

                  {canGoBack && (
                    <button
                      onClick={handleGoBack}
                      className="mono text-xs uppercase tracking-wider text-muted-foreground hover:text-signal transition-colors flex items-center gap-1.5 min-h-[44px] px-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  )}
                </div>

                {filteredDemos.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <p className="font-display text-lg text-foreground">
                      No demos matched your query.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your keywords or clearing the search filter.
                    </p>
                    <button
                      onClick={() => {
                        updateParams({
                          category: null,
                          sub: null,
                          q: undefined,
                          filter: "all",
                        });
                      }}
                      className="mono text-xs uppercase tracking-widest text-signal border border-signal/40 px-4 py-2.5 rounded-lg hover:bg-signal/10 transition-colors min-h-[44px]"
                    >
                      Reset File Browser
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                    {filteredDemos.map((demo) => (
                      <DemoCard
                        key={demo.id}
                        demo={demo}
                        categoryName={getCategoryName(demo.category_id)}
                        onPreview={setPreviewDemo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredDemos.map((demo) => (
                      <DemoListItem
                        key={demo.id}
                        demo={demo}
                        categoryName={getCategoryName(demo.category_id)}
                        onPreview={setPreviewDemo}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </FinderWindow>

      {/* ── Conversion Bottom CTA ── */}
      <div className="mt-14 sm:mt-20 glass-cta p-6 sm:p-8 md:p-12 relative overflow-hidden rounded-3xl border border-hairline/80 shadow-xl">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-2">
              BESPOKE BUILDS &amp; ARCHITECTURE
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-2 sm:mb-3">
              Need a custom website engineered for your brand?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We design and develop high-speed WordPress themes and bespoke
              React/Next.js platforms tailored to your conversion goals, Core
              Web Vitals, and search rankings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact"
              className="text-xs uppercase tracking-wider px-7 py-4 bg-signal text-signal-foreground font-semibold rounded-xl text-center hover:shadow-[0_0_30px_-4px_rgba(0,217,255,0.5)] min-h-[48px] flex items-center justify-center transition-all"
            >
              Start a Project →
            </Link>
            <Link
              to="/services"
              className="text-xs uppercase tracking-wider px-6 py-4 border border-hairline text-foreground/80 font-semibold rounded-xl text-center hover:border-signal/50 hover:text-signal min-h-[48px] flex items-center justify-center transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* ── Demo Detail Preview Modal ── */}
      <DemoModal
        demo={previewDemo}
        categoryName={previewDemo ? getCategoryName(previewDemo.category_id) : undefined}
        onClose={() => setPreviewDemo(null)}
      />
    </div>
  );
}
