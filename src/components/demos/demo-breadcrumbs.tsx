import React from "react";
import { ChevronRight, Home, Folder } from "lucide-react";
import type { BreadcrumbItem } from "@/types/demos";

interface DemoBreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (item: BreadcrumbItem, index: number) => void;
}

export function DemoBreadcrumbs({ items, onNavigate }: DemoBreadcrumbsProps) {
  return (
    <nav aria-label="Current Folder Location" className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={item.id}>
            {index > 0 && (
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground/40 shrink-0" />
            )}

            {isLast ? (
              <span className="mono text-[10px] sm:text-[11px] font-semibold text-signal flex items-center gap-1 px-2 py-1 rounded bg-signal/10 border border-signal/30 truncate max-w-[130px] sm:max-w-none">
                {item.type === "root" ? (
                  <Home className="w-3 h-3 shrink-0" />
                ) : (
                  <Folder className="w-3 h-3 shrink-0" />
                )}
                <span className="truncate">{item.label}</span>
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item, index)}
                className="mono text-[10px] sm:text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded truncate max-w-[90px] sm:max-w-none min-h-[32px] items-center"
              >
                {item.type === "root" && <Home className="w-3 h-3 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
