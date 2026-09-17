import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface TabItem {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface Skiper96Props {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function Skiper96({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  className,
  children,
}: Skiper96Props) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    tabs[0]?.id || "",
  );
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeId =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleSelect = (id: string) => {
    setInternalActiveTab(id);
    onTabChange?.(id);
  };

  return (
    <nav
      className={cn(
        "flex items-center gap-1.5 p-1.5 rounded-full bg-[#0a1017]/90 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeId === tab.id;
          const isHovered = hoveredTab === tab.id;
          const isExpanded = isActive || isHovered;

          return (
            <button
              key={tab.id}
              type="button"
              aria-label={tab.title}
              aria-pressed={isActive}
              onClick={() => handleSelect(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none cursor-pointer",
                isActive ? "text-white" : "text-slate-400 hover:text-slate-100",
              )}
            >
              {/* Active animated pill background */}
              {isActive && (
                <motion.div
                  layoutId="skiper96-active-pill"
                  className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-md shadow-sm border border-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center shrink-0">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isActive ? "text-white scale-105" : "text-slate-400",
                  )}
                />
              </div>

              {/* Animated Expandable Text Label */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, scale: 0.95 }}
                    animate={{ opacity: 1, width: "auto", scale: 1 }}
                    exit={{ opacity: 0, width: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="relative z-10 overflow-hidden whitespace-nowrap font-medium text-xs sm:text-sm pr-0.5"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {tab.badge && (
                <span className="relative z-10 ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {children && (
        <div className="flex items-center pl-2 border-l border-white/15 ml-1">
          {children}
        </div>
      )}
    </nav>
  );
}

export default Skiper96;
