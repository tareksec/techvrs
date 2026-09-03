import React from "react";
import type { DemoItem } from "@/types/demos";
import { ExternalLink, Eye, Star, Globe } from "lucide-react";

interface DemoListItemProps {
  demo: DemoItem;
  categoryName?: string;
  onPreview: (demo: DemoItem) => void;
}

export function DemoListItem({ demo, categoryName, onPreview }: DemoListItemProps) {
  const isWordPress = demo.technology.toLowerCase().includes("wordpress");

  return (
    <div className="group px-4 py-3 rounded-xl border border-hairline/60 bg-panel/30 hover:bg-panel/70 hover:border-signal/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Thumbnail icon + title info */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <div className="w-12 h-9 rounded-md overflow-hidden bg-muted/40 border border-hairline shrink-0 relative">
          <img
            src={demo.thumbnail_url || "/hero-main.png"}
            alt={demo.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-display font-semibold text-sm text-foreground truncate group-hover:text-signal transition-colors">
              {demo.title}
            </h4>
            {demo.featured && (
              <Star className="w-3.5 h-3.5 fill-amber text-amber shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate max-w-lg">
            {demo.description}
          </p>
        </div>
      </div>

      {/* Middle: Tech + Category */}
      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
        <span
          className={`mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${
            isWordPress
              ? "text-sky-400 border-sky-400/30 bg-sky-400/10"
              : "text-signal border-signal/30 bg-signal/10"
          }`}
        >
          {demo.technology}
        </span>

        {categoryName && (
          <span className="mono text-[9px] text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded bg-muted/30 border border-hairline/40">
            {categoryName}
          </span>
        )}

        <div className="hidden lg:flex items-center gap-1">
          {demo.stack.slice(0, 2).map((s) => (
            <span key={s} className="mono text-[8px] text-muted-foreground/80 px-1.5 py-0.5 rounded border border-hairline/40">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-hairline/30">
        <button
          onClick={() => onPreview(demo)}
          className="mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-hairline text-muted-foreground hover:text-signal hover:border-signal/50 transition-colors flex items-center gap-1.5"
        >
          <Eye className="w-3 h-3" />
          Quick View
        </button>

        <a
          href={demo.demo_url}
          target="_blank"
          rel="noreferrer noopener"
          className="mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg bg-signal/15 border border-signal/40 text-signal hover:bg-signal/25 transition-colors flex items-center gap-1.5 font-semibold"
        >
          <Globe className="w-3 h-3" />
          Live
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
