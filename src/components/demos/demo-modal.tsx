import React, { useEffect, useState } from "react";
import type { DemoItem } from "@/types/demos";
import {
  X,
  ExternalLink,
  Smartphone,
  Monitor,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface DemoModalProps {
  demo: DemoItem | null;
  categoryName?: string;
  onClose: () => void;
}

export function DemoModal({ demo, categoryName, onClose }: DemoModalProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!demo) return null;

  const isWordPress = demo.technology.toLowerCase().includes("wordpress");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-background/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-panel sm:border sm:border-hairline/80 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 25px 60px -15px rgba(0,217,255,0.25), 0 0 0 1px rgba(0,217,255,0.15)",
        }}
      >
        {/* ── Modal Window Top Bar ── */}
        <div className="px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-b border-hairline/60 bg-background/80 backdrop-blur-md flex items-center justify-between shrink-0">
          {/* Mobile Back button or Desktop traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="sm:hidden min-w-[44px] min-h-[44px] flex items-center gap-1 -ml-2 px-2 text-signal font-semibold active:bg-signal/10 rounded-lg transition-colors"
              aria-label="Back to Showcase"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="mono text-xs uppercase tracking-wider">Back</span>
            </button>

            {/* Desktop Traffic Lights */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-critical/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            <span className="mono text-xs text-muted-foreground truncate max-w-[170px] sm:max-w-xs pl-1">
              TechVRS // {demo.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Device viewport toggle (desktop / tablet) */}
            <div className="hidden sm:flex items-center bg-muted/40 p-0.5 rounded-lg border border-hairline/60">
              <button
                onClick={() => setDeviceMode("desktop")}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  deviceMode === "desktop"
                    ? "bg-signal text-signal-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  deviceMode === "mobile"
                    ? "bg-signal text-signal-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground active:bg-muted/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Modal Scrollable Body ── */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Preview Container */}
          <div className="flex justify-center bg-background/40 p-2 sm:p-4 rounded-xl border border-hairline/40">
            <div
              className={`transition-all duration-300 rounded-lg overflow-hidden border border-hairline/60 shadow-xl bg-black/40 ${
                deviceMode === "desktop"
                  ? "w-full aspect-[16/10] sm:aspect-[16/9]"
                  : "w-[280px] aspect-[9/16]"
              }`}
            >
              <img
                src={demo.thumbnail_url || "/hero-main.png"}
                alt={demo.title}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Title & Category Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border font-semibold ${
                  isWordPress
                    ? "text-sky-400 border-sky-400/30 bg-sky-400/10"
                    : "text-signal border-signal/30 bg-signal/10"
                }`}
              >
                {demo.technology}
              </span>

              {categoryName && (
                <span className="mono text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded border border-hairline">
                  {categoryName}
                </span>
              )}

              {demo.featured && (
                <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber/15 text-amber border border-amber/30 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" /> Featured Build
                </span>
              )}
            </div>

            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground">
              {demo.title}
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="mono text-xs uppercase tracking-wider text-muted-foreground">
              Project Concept &amp; Architecture
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {demo.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Technologies &amp; Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {demo.stack.map((item) => (
                <span
                  key={item}
                  className="mono text-xs px-3 py-1 rounded-lg bg-panel border border-hairline text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Quality Standards checklist */}
          <div className="p-4 rounded-xl border border-hairline/60 bg-muted/20 space-y-2 text-xs text-muted-foreground">
            <div className="font-semibold text-foreground flex items-center gap-1.5 mono text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-signal" />
              TechVRS Engineering Standards Included
            </div>
            <ul className="grid sm:grid-cols-2 gap-2 pt-1 text-xs">
              <li className="flex items-center gap-1.5">✓ 90+ Core Web Vitals Performance</li>
              <li className="flex items-center gap-1.5">✓ Semantic Clean Architecture</li>
              <li className="flex items-center gap-1.5">✓ Secure Headers &amp; Sanitization</li>
              <li className="flex items-center gap-1.5">✓ Conversion-Tuned Mobile UX</li>
            </ul>
          </div>
        </div>

        {/* ── Modal Footer with High-Touch Live Demo CTA ── */}
        <div className="p-3.5 sm:p-5 border-t border-hairline/60 bg-background/90 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block mono text-xs text-muted-foreground truncate">
            {demo.demo_url}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              to="/contact"
              onClick={onClose}
              className="flex-1 sm:flex-none mono text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-hairline text-muted-foreground hover:text-foreground text-center min-h-[44px] flex items-center justify-center active:bg-muted/40 transition-colors"
            >
              Order Similar
            </Link>

            <a
              href={demo.demo_url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex-1 sm:flex-none mono text-xs uppercase tracking-wider px-6 py-3 bg-signal text-signal-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_25px_var(--signal)] min-h-[48px] transition-shadow active:scale-[0.99]"
            >
              <span>Visit Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
