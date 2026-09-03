import React from "react";
import type { DemoCategory, DemoQuickFilter } from "@/types/demos";
import {
  Folder,
  LayoutGrid,
  Star,
  Clock,
  ChevronRight,
  Code,
  Globe,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface DemoSidebarProps {
  categories: DemoCategory[];
  activeFilter: DemoQuickFilter;
  selectedCategorySlug: string | null;
  selectedSubcategorySlug: string | null;
  counts: {
    total: number;
    wordpress: number;
    custom: number;
    featured: number;
    byCategory: Record<string, number>;
  };
  onSelectFilter: (filter: DemoQuickFilter) => void;
  onSelectCategory: (categorySlug: string | null) => void;
  onSelectSubcategory: (subcategorySlug: string | null) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function DemoSidebar({
  categories,
  activeFilter,
  selectedCategorySlug,
  selectedSubcategorySlug,
  counts,
  onSelectFilter,
  onSelectCategory,
  onSelectSubcategory,
  isOpenMobile,
  onCloseMobile,
}: DemoSidebarProps) {
  const topCategories = categories.filter((c) => !c.parent_id);
  const subcategories = categories.filter((c) => !!c.parent_id);

  const content = (
    <div className="flex flex-col h-full select-none">
      {/* ── Mobile Header ── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-hairline/60">
        <div className="flex items-center gap-2 mono text-xs font-semibold text-signal uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4" />
          Showcase Categories
        </div>
        <button
          onClick={onCloseMobile}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 rounded-lg text-muted-foreground hover:text-foreground active:bg-muted/40 transition-colors"
          aria-label="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto flex-1 text-sm">
        {/* Quick Views */}
        <div>
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 px-2">
            Showcase Views
          </div>
          <div className="space-y-1">
            <SidebarItem
              active={activeFilter === "all" && !selectedCategorySlug}
              onClick={() => {
                onSelectFilter("all");
                onSelectCategory(null);
                onSelectSubcategory(null);
                onCloseMobile();
              }}
              icon={<LayoutGrid className="w-4 h-4" />}
              label="All Demos"
              badge={counts.total}
            />
            <SidebarItem
              active={activeFilter === "featured"}
              onClick={() => {
                onSelectFilter("featured");
                onSelectCategory(null);
                onSelectSubcategory(null);
                onCloseMobile();
              }}
              icon={<Star className="w-4 h-4 text-amber" />}
              label="Featured Work"
              badge={counts.featured}
            />
            <SidebarItem
              active={activeFilter === "recent"}
              onClick={() => {
                onSelectFilter("recent");
                onSelectCategory(null);
                onSelectSubcategory(null);
                onCloseMobile();
              }}
              icon={<Clock className="w-4 h-4 text-signal" />}
              label="Recently Added"
            />
          </div>
        </div>

        {/* Primary Categories & Folders */}
        <div>
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 px-2">
            Categories &amp; Stacks
          </div>
          <div className="space-y-3">
            {topCategories.map((top) => {
              const isSelected = selectedCategorySlug === top.slug;
              const childSubs = subcategories.filter((s) => s.parent_id === top.id);
              const topCount = counts.byCategory[top.id] ?? 0;
              const isWp = top.slug === "wordpress-websites";

              return (
                <div key={top.id} className="space-y-1">
                  <SidebarItem
                    active={isSelected && !selectedSubcategorySlug}
                    onClick={() => {
                      onSelectFilter(isWp ? "wordpress" : "custom");
                      onSelectCategory(top.slug);
                      onSelectSubcategory(null);
                      onCloseMobile();
                    }}
                    icon={
                      isWp ? (
                        <Globe className="w-4 h-4 text-sky-400" />
                      ) : (
                        <Code className="w-4 h-4 text-signal" />
                      )
                    }
                    label={top.name}
                    badge={topCount}
                  />

                  {/* Subcategories drilldown */}
                  {childSubs.length > 0 && (
                    <div className="pl-6 space-y-0.5 border-l border-hairline/30 ml-4">
                      {childSubs.map((sub) => {
                        const isSubSelected = selectedSubcategorySlug === sub.slug;
                        const subCount = counts.byCategory[sub.id] ?? 0;

                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              onSelectCategory(top.slug);
                              onSelectSubcategory(sub.slug);
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                              isSubSelected
                                ? "bg-signal/15 text-signal font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                            }`}
                          >
                            <span className="truncate">{sub.name}</span>
                            <span className="mono text-[10px] opacity-70">
                              {subCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Footer info */}
      <div className="p-4 border-t border-hairline/40 mono text-[10px] text-muted-foreground/60 leading-relaxed">
        TechVRS Digital Showcase // Verified Templates &amp; Architectures
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-hairline/60 bg-panel/30 backdrop-blur-md shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-background/80 backdrop-blur-md flex"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 max-w-[85vw] bg-panel border-r border-hairline h-full shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
}

interface SidebarItemProps {
  active?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

function SidebarItem({ active, onClick, icon, label, badge }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
        active
          ? "bg-signal/20 text-signal font-semibold border border-signal/40 shadow-[0_0_15px_rgba(0,217,255,0.15)]"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      {typeof badge === "number" && (
        <span className="mono text-[10px] px-1.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-semibold">
          {badge}
        </span>
      )}
    </button>
  );
}
