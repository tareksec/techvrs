import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { SectionLabel } from "@/components/site-chrome";
import { caseStudies, type CaseStudy } from "@/content/site-data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — techvrs | Field Reports & Case Studies" },
      {
        name: "description",
        content:
          "Detection engineering, secure deployments, technical SEO, and AI agent case studies — documented like incident reports.",
      },
      { property: "og:title", content: "Work — techvrs" },
      {
        property: "og:description",
        content: "Field reports across SOC, secure web, SEO, and AI agent engagements.",
      },
    ],
  }),
  component: WorkPage,
});

const FILTERS = ["All", "SOC", "Web", "SEO", "AI Agents"] as const;

const CATEGORY_META: Record<string, { color: string; bg: string; dot: string }> = {
  SOC:          { color: "#0284c7", bg: "rgba(2,132,199,0.10)",   dot: "#0284c7" },
  Web:          { color: "#d97706", bg: "rgba(217,119,6,0.10)",   dot: "#d97706" },
  SEO:          { color: "#16a34a", bg: "rgba(22,163,74,0.10)",   dot: "#16a34a" },
  "AI Agents":  { color: "#7c3aed", bg: "rgba(124,58,237,0.10)", dot: "#7c3aed" },
};

function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<CaseStudy | null>(null);

  const filtered = useMemo(
    () => filter === "All" ? caseStudies : caseStudies.filter((c) => c.category === filter),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <SectionLabel>FIELD WORK</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-4xl">
        Proof, <span className="accent-shift">not promises.</span>
      </h1>
      <p className="flip-text mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        A selection of projects across detection engineering, secure deployment, and
        applied AI — documented the way an incident report would be.
      </p>

      {/* ── Filter strip ── */}
      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const meta = CATEGORY_META[f];
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="mono text-[11px] uppercase tracking-widest px-4 py-2 border transition-all"
              style={{
                borderColor: isActive
                  ? meta?.color ?? "var(--signal)"
                  : "var(--hairline)",
                color: isActive ? meta?.color ?? "var(--signal)" : "var(--muted-foreground)",
                background: isActive ? meta?.bg ?? "rgba(2,132,199,0.10)" : "transparent",
                boxShadow: isActive
                  ? `0 0 16px -4px ${meta?.color ?? "rgba(2,132,199,0.4)"}55`
                  : "none",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* ── Case study grid ── */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const meta = CATEGORY_META[c.category];
          return (
            <button
              key={c.slug}
              onClick={() => setOpen(c)}
              className="text-left glass-card brackets hover-lift flex flex-col gap-4 p-6 group"
              style={{ position: "relative" }}
            >
              <span className="b-tr" /><span className="b-bl" />

              {/* Category tag + index */}
              <div className="flex items-center justify-between">
                <span
                  className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 border inline-flex items-center gap-1.5"
                  style={{
                    color: meta?.color,
                    borderColor: `${meta?.color}55`,
                    background: meta?.bg,
                  }}
                >
                  <span
                    style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: meta?.dot, display: "inline-block",
                    }}
                  />
                  {c.category}
                </span>
                <span className="mono text-xs text-muted-foreground">/ {c.index}</span>
              </div>

              {/* Title */}
              <h2
                className="text-lg font-display font-semibold leading-snug transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {c.title}
              </h2>

              {/* Challenge excerpt */}
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                {c.challenge}
              </p>

              {/* Metrics */}
              <div
                className="mt-auto pt-4 border-t flex flex-wrap gap-4"
                style={{ borderColor: "var(--hairline)" }}
              >
                {c.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div
                      className="font-display text-xl font-bold leading-none mb-0.5"
                      style={{ color: meta?.color ?? "var(--signal)" }}
                    >
                      {m.value}
                    </div>
                    <div className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5"
                style={{ color: meta?.color ?? "var(--signal)" }}
              >
                View case study
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {open && <CaseModal study={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function CaseModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const meta = CATEGORY_META[study.category];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-10 overflow-auto"
      style={{ background: "rgba(13,17,23,0.75)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="glass-card brackets max-w-4xl w-full p-8 md:p-12 relative"
        style={{
          position: "relative",
          animation: "iso-rise 0.45s cubic-bezier(0.16,1,0.3,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="b-tr" /><span className="b-bl" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors flex items-center gap-1"
        >
          ESC ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="mono text-[10px] uppercase tracking-widest border px-2.5 py-1 inline-flex items-center gap-1.5"
            style={{
              color: meta?.color,
              borderColor: `${meta?.color}55`,
              background: meta?.bg,
            }}
          >
            <span
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: meta?.dot, display: "inline-block",
              }}
            />
            {study.category}
          </span>
          <span className="mono text-xs text-muted-foreground">CASE / {study.index}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold">{study.title}</h2>

        {/* Metrics */}
        <div className="mt-8 grid gap-4 grid-cols-3">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 text-center"
              style={{
                background: meta?.bg ?? "rgba(2,132,199,0.08)",
                border: `1px solid ${meta?.color ?? "var(--signal)"}33`,
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                className="font-display text-3xl font-bold leading-none mb-1"
                style={{ color: meta?.color ?? "var(--signal)" }}
              >
                {m.value}
              </div>
              <div className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Sections */}
        {[
          { label: "CHALLENGE", body: study.challenge },
          { label: "APPROACH",  body: study.approach  },
          { label: "OUTCOME",   body: study.outcome   },
        ].map((s) => (
          <div key={s.label} className="mt-8">
            <div
              className="mono text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2"
              style={{ color: meta?.color ?? "var(--signal)" }}
            >
              <span
                style={{
                  display: "inline-block", width: 18, height: 1,
                  background: meta?.color ?? "var(--signal)",
                }}
              />
              {s.label}
            </div>
            <p className="text-foreground/85 leading-relaxed">{s.body}</p>
          </div>
        ))}

        {/* Stack */}
        <div className="mt-8">
          <div
            className="mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2"
            style={{ color: meta?.color ?? "var(--signal)" }}
          >
            <span
              style={{
                display: "inline-block", width: 18, height: 1,
                background: meta?.color ?? "var(--signal)",
              }}
            />
            TOOLS / STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <span
                key={t}
                className="mono text-[11px] px-2.5 py-1.5 border text-foreground/80"
                style={{
                  borderColor: `${meta?.color ?? "var(--signal)"}33`,
                  background: meta?.bg ?? "rgba(2,132,199,0.06)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
