import React, { useState } from "react";
import {
  LayoutGrid,
  List,
  Search,
  ChevronLeft,
  SlidersHorizontal,
  X,
  Menu,
  ArrowLeft,
} from "lucide-react";
import type { BreadcrumbItem, DemoViewMode } from "@/types/demos";
import { DemoBreadcrumbs } from "./demo-breadcrumbs";

interface FinderWindowProps {
  title?: string;
  currentFolderTitle?: string;
  parentFolderTitle?: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: DemoViewMode;
  onViewModeChange: (mode: DemoViewMode) => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbNavigate: (item: BreadcrumbItem, index: number) => void;
  canGoBack: boolean;
  onGoBack: () => void;
  onToggleMobileSidebar: () => void;
  itemCount: number;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function FinderWindow({
  title = "TechVRS // Demo Library",
  currentFolderTitle,
  parentFolderTitle,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  breadcrumbs,
  onBreadcrumbNavigate,
  canGoBack,
  onGoBack,
  onToggleMobileSidebar,
  itemCount,
  sidebar,
  children,
}: FinderWindowProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="w-full rounded-xl sm:rounded-2xl lg:rounded-3xl border border-hairline/60 lg:border-hairline/80 bg-panel/70 lg:bg-panel/50 backdrop-blur-xl shadow-lg lg:shadow-2xl overflow-hidden flex flex-col">
      {/* ── MOBILE APP-BAR HEADER (< lg) ── */}
      <div className="lg:hidden border-b border-hairline/60 bg-background/90 backdrop-blur-md sticky top-0 z-30">
        {mobileSearchOpen ? (
          /* Full-width Search Bar mode on mobile */
          <div className="flex items-center gap-2 p-2.5">
            <button
              onClick={() => {
                setMobileSearchOpen(false);
                onSearchChange("");
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground active:bg-muted/40 transition-colors shrink-0"
              aria-label="Exit Search"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search demos, technology, stack…"
                className="w-full pl-9 pr-9 py-2 text-sm bg-muted/40 rounded-lg border border-hairline focus:border-signal outline-none text-foreground placeholder:text-muted-foreground/60 mono min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="min-w-[44px] min-h-[44px] absolute right-0 top-0 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Standard Mobile App Bar */
          <div className="flex items-center justify-between px-3 py-2.5 min-h-[52px]">
            {/* Left: Hamburger or Back Button */}
            <div className="flex items-center gap-1.5 min-w-0">
              {canGoBack ? (
                <button
                  onClick={onGoBack}
                  className="min-w-[44px] min-h-[44px] flex items-center gap-1.5 px-2 -ml-1.5 rounded-lg text-signal font-semibold active:bg-signal/10 transition-colors"
                  aria-label="Go Back"
                >
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                  <span className="mono text-xs uppercase tracking-wider truncate max-w-[130px] sm:max-w-[200px]">
                    {parentFolderTitle || "Back"}
                  </span>
                </button>
              ) : (
                <button
                  onClick={onToggleMobileSidebar}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-signal active:bg-muted/40 transition-colors -ml-1.5"
                  aria-label="Open Navigation Drawer"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              {/* Current Title */}
              <span className="font-display font-bold text-sm sm:text-base text-foreground truncate pl-1">
                {currentFolderTitle || "Demo Library"}
              </span>
            </div>

            {/* Right: Search & View Mode Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-signal active:bg-muted/40 transition-colors"
                aria-label="Search Demos"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-signal active:bg-muted/40 transition-colors"
                aria-label={viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
              >
                {viewMode === "grid" ? (
                  <List className="w-4 h-4" />
                ) : (
                  <LayoutGrid className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── DESKTOP FINDER TOP BAR (>= lg) ── */}
      <div className="hidden lg:flex px-6 py-3.5 border-b border-hairline/60 bg-background/70 backdrop-blur-md items-center justify-between gap-4">
        {/* Left: Traffic Lights & Navigation */}
        <div className="flex items-center gap-4">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm hover:opacity-80 transition-opacity"
              title="Close"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm hover:opacity-80 transition-opacity"
              title="Minimize"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm hover:opacity-80 transition-opacity"
              title="Expand"
            />
          </div>

          {/* History Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Window Title */}
          <span className="mono text-xs text-muted-foreground/70 pl-2 border-l border-hairline/40">
            {title}
          </span>
        </div>

        {/* Right: Search & View Switcher */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search demos, stacks…"
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-muted/30 hover:bg-muted/50 focus:bg-muted/70 rounded-lg border border-hairline/60 focus:border-signal/70 outline-none text-foreground placeholder:text-muted-foreground/60 transition-all mono"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* View Switcher (Grid vs List) */}
          <div className="flex items-center bg-muted/30 p-0.5 rounded-lg border border-hairline/60 shrink-0">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-signal text-signal-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Icons / Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-signal text-signal-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB / LOCATION BAR ── */}
      <div className="px-3.5 py-2 sm:px-6 border-b border-hairline/40 bg-muted/15 flex items-center justify-between gap-3 overflow-x-auto">
        <DemoBreadcrumbs items={breadcrumbs} onNavigate={onBreadcrumbNavigate} />

        <div className="mono text-[10px] text-muted-foreground/70 shrink-0 uppercase tracking-widest hidden sm:block">
          {itemCount} {itemCount === 1 ? "Item" : "Items"}
        </div>
      </div>

      {/* ── MAIN BODY (Sidebar + File Pane) ── */}
      <div className="flex flex-1 min-h-[500px] sm:min-h-[580px] overflow-hidden">
        {sidebar}

        <main className="flex-1 p-3.5 sm:p-5 md:p-8 overflow-y-auto bg-background/20 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
