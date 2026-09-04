import React from "react";
import { Folder } from "lucide-react";

interface FolderCardProps {
  title: string;
  count: number;
  description?: string | null;
  slug: string;
  iconType?: string | null;
  onClick: () => void;
  variant?: "primary" | "sub";
}

export function FolderCard({
  title,
  count,
  description,
  onClick,
  variant = "primary",
}: FolderCardProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left w-full transition-all duration-200 relative overflow-hidden flex flex-col justify-between active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-signal outline-none ${
        isPrimary
          ? "p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-panel/70 sm:bg-panel/60 border border-hairline hover:border-signal/70 hover:shadow-[0_12px_40px_-15px_rgba(0,217,255,0.25)] min-h-[130px] sm:min-h-[160px]"
          : "p-3.5 sm:p-5 md:p-6 rounded-xl bg-panel/50 sm:bg-panel/40 border border-hairline/60 hover:border-signal/50 hover:shadow-[0_8px_25px_-10px_rgba(0,217,255,0.2)] min-h-[110px] sm:min-h-[140px]"
      }`}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Ambient background glow on hover */}
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-36 h-36 bg-signal/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />

      <div className="w-full">
        {/* Finder Folder Graphic & Count */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
          <div className="relative shrink-0">
            <div
              className={`flex items-center justify-center rounded-lg sm:rounded-xl transition-transform group-hover:scale-105 ${
                isPrimary
                  ? "w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-signal/25 to-signal/5 border border-signal/30 text-signal shadow-[0_4px_16px_rgba(0,217,255,0.15)]"
                  : "w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-signal/20 to-signal/5 border border-signal/20 text-signal"
              }`}
            >
              <Folder
                className={
                  isPrimary
                    ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-signal/20"
                    : "w-5 h-5 sm:w-6 sm:h-6 fill-signal/20"
                }
                strokeWidth={1.75}
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-signal/80" />
            </span>
          </div>

          <span className="mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-signal/30 bg-signal/10 text-signal font-semibold whitespace-nowrap">
            {count} {count === 1 ? "Demo" : "Demos"}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-display font-bold text-foreground group-hover:text-signal transition-colors leading-snug ${
            isPrimary
              ? "text-base sm:text-lg md:text-2xl line-clamp-2"
              : "text-sm sm:text-base md:text-lg line-clamp-2"
          }`}
        >
          {title}
        </h3>

        {/* Description (desktop / tablet) */}
        {description && (
          <p className="hidden sm:block text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-1.5 mb-2">
            {description}
          </p>
        )}
      </div>

      {/* Footer prompt */}
      <div className="pt-2 sm:pt-3 border-t border-hairline/40 flex items-center justify-between mono text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-signal transition-colors w-full mt-2">
        <span>Open Folder</span>
        <span className="group-hover:translate-x-1 transition-transform text-xs">→</span>
      </div>
    </button>
  );
}
