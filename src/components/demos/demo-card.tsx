import React from "react";
import type { DemoItem } from "@/types/demos";
import { ExternalLink, Eye, Star } from "lucide-react";

interface DemoCardProps {
  demo: DemoItem;
  categoryName?: string;
  onPreview: (demo: DemoItem) => void;
}

export function DemoCard({ demo, categoryName, onPreview }: DemoCardProps) {
  const isWordPress = demo.technology.toLowerCase().includes("wordpress");

  return (
    <div
      onClick={() => onPreview(demo)}
      className="group rounded-xl sm:rounded-2xl bg-panel/60 border border-hairline hover:border-signal/70 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_36px_-12px_rgba(0,217,255,0.2)] cursor-pointer"
    >
      {/* ── Mock Browser Window Header & Thumbnail ── */}
      <div className="relative aspect-[16/10] bg-muted/40 overflow-hidden border-b border-hairline/60">
        {/* Browser Top Bar */}
        <div className="absolute top-0 inset-x-0 h-6 bg-background/80 backdrop-blur-md px-3 flex items-center justify-between z-10 border-b border-hairline/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-critical/70" />
            <span className="w-2 h-2 rounded-full bg-amber/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
          </div>
          <div className="mono text-[8px] text-muted-foreground/70 truncate max-w-[140px]">
            {demo.demo_url.replace("https://", "")}
          </div>
          <div className="w-6" />
        </div>

        {/* Thumbnail Image */}
        <img
          src={demo.thumbnail_url || "/hero-main.png"}
          alt={demo.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "/hero-main.png";
          }}
          className="w-full h-full object-cover object-top pt-6 transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay with Quick View button (Desktop) */}
        <div className="hidden sm:flex absolute inset-0 pt-6 bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(demo);
            }}
            className="mono text-[10px] uppercase tracking-wider px-3.5 py-2 bg-signal text-signal-foreground font-semibold rounded-lg flex items-center gap-1.5 shadow-lg hover:shadow-[0_0_20px_var(--signal)] transition-shadow"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <a
            href={demo.demo_url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            className="mono text-[10px] uppercase tracking-wider px-3.5 py-2 bg-panel border border-signal/50 text-signal font-semibold rounded-lg flex items-center gap-1.5 hover:bg-signal/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        </div>

        {/* Featured ribbon / badge */}
        {demo.featured && (
          <span className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-amber/90 text-background font-bold shadow-md">
            <Star className="w-2.5 h-2.5 fill-current" />
            Featured
          </span>
        )}
      </div>

      {/* ── Details & Metadata ── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Tech Pills */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className={`mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border ${
                isWordPress
                  ? "text-sky-400 border-sky-400/30 bg-sky-400/10"
                  : "text-signal border-signal/30 bg-signal/10"
              }`}
            >
              {demo.technology}
            </span>

            {categoryName && (
              <span className="mono text-[9px] text-muted-foreground uppercase tracking-wider truncate max-w-[120px]">
                {categoryName}
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="font-display font-semibold text-base sm:text-lg text-foreground mb-1.5 group-hover:text-signal transition-colors line-clamp-1">
            {demo.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {demo.description}
          </p>
        </div>

        {/* Stack tags */}
        <div className="pt-3 border-t border-hairline/40">
          <div className="flex flex-wrap gap-1 mb-3">
            {demo.stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className="mono text-[9px] px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground border border-hairline/50"
              >
                {item}
              </span>
            ))}
            {demo.stack.length > 3 && (
              <span className="mono text-[9px] px-1.5 py-0.5 text-muted-foreground">
                +{demo.stack.length - 3}
              </span>
            )}
          </div>

          {/* Direct Actions on Mobile & Desktop */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(demo);
              }}
              className="mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-signal transition-colors flex items-center gap-1.5 py-2 px-2.5 rounded-lg border border-hairline/60 sm:border-transparent min-h-[40px]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <a
              href={demo.demo_url}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="mono text-[10px] uppercase tracking-wider text-signal font-semibold hover:bg-signal/10 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-signal/40 min-h-[40px] transition-colors"
            >
              <span>Visit Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
