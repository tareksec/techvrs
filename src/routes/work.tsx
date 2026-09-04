import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { SectionLabel } from "@/components/site-chrome";
import { caseStudies, type CaseStudy } from "@/content/site-data";
import { IconSearch, IconRadar, IconShieldLock } from "@/components/icons";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — TechVRS | Case Studies & Digital Solutions" },
      {
        name: "description",
        content:
          "Explore client case studies and digital systems built by TechVRS — high-performance web applications, conversion UI/UX, technical SEO overhauls, and secure AI workflows.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/work" },
      { property: "og:title", content: "Selected Work — TechVRS | Case Studies & Digital Solutions" },
      {
        property: "og:description",
        content:
          "Explore client case studies and digital systems built by TechVRS — high-performance web applications, conversion UI/UX, technical SEO overhauls, and secure AI workflows.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS — Selected Work & Case Studies" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Selected Work — TechVRS | Case Studies & Digital Solutions" },
      {
        name: "twitter:description",
        content:
          "Explore client case studies and digital systems built by TechVRS — high-performance web applications, conversion UI/UX, technical SEO overhauls, and secure AI workflows.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "TechVRS — Selected Work & Case Studies" },
    ],
  }),
  component: WorkPage,
});

const FILTERS = ["All", "Web", "Design", "SEO", "AI Solutions"] as const;

const CATEGORY_META: Record<string, { color: string; bg: string; dot: string }> = {
  Web:          { color: "#0891b2", bg: "rgba(8,145,178,0.10)",   dot: "#0891b2" },
  Design:       { color: "#d97706", bg: "rgba(217,119,6,0.10)",   dot: "#d97706" },
  SEO:          { color: "#16a34a", bg: "rgba(22,163,74,0.10)",   dot: "#16a34a" },
  "AI Solutions": { color: "#7c3aed", bg: "rgba(124,58,237,0.10)", dot: "#7c3aed" },
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
      <SectionLabel>SELECTED WORK</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-4xl">
        Engineered for impact, <span className="accent-shift">built for growth.</span>
      </h1>
      <p className="flip-text mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        A selection of client engagements across modern web development, conversion UI/UX design,
        technical SEO growth, and secure enterprise AI workflows.
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
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border transition-all"
              style={{
                borderColor: isActive
                  ? meta?.color ?? "var(--signal)"
                  : "var(--hairline)",
                color: isActive ? meta?.color ?? "var(--signal)" : "var(--muted-foreground)",
                background: isActive ? meta?.bg ?? "rgba(2,132,199,0.12)" : "transparent",
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
              className="text-left glass-card hover-lift flex flex-col gap-4 p-6 group rounded-2xl border border-hairline/80"
            >
              {/* Category tag + index */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5"
                  style={{
                    color: meta?.color,
                    borderColor: `${meta?.color}55`,
                    background: meta?.bg,
                  }}
                >
                  <span
                    style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: meta?.dot, display: "inline-block",
                    }}
                  />
                  {c.category}
                </span>
                <span className="text-xs text-muted-foreground font-mono">/ {c.index}</span>
              </div>

              {/* Title */}
              <h2
                className="text-lg font-display font-semibold leading-snug transition-colors group-hover:text-signal"
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
                {c.metrics.map((m) => (
                  <div key={m.label} className="min-w-[64px]">
                    <div
                      className="mono text-lg font-bold leading-none mb-1"
                      style={{ color: meta?.color ?? "var(--signal)" }}
                    >
                      {m.value}
                    </div>
                    <div className="mono text-[8px] uppercase tracking-widest text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.stack.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="mono text-[9px] px-2 py-0.5 border text-muted-foreground"
                    style={{ borderColor: "var(--hairline)" }}
                  >
                    {t}
                  </span>
                ))}
                {c.stack.length > 3 && (
                  <span
                    className="mono text-[9px] px-2 py-0.5 text-muted-foreground"
                  >
                    +{c.stack.length - 3}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Case study detail modal ── */}
      {open && (
        <CaseStudyModal study={open} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const meta = CATEGORY_META[study.category];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      style={{
        background: "rgba(10, 25, 45, 0.75)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-3xl border border-hairline/80 shadow-2xl relative"
        style={{
          animation: "iso-rise 0.45s cubic-bezier(0.16,1,0.3,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-signal transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-hairline bg-background/50"
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
          { label: "CHALLENGE", body: study.challenge, Icon: IconSearch     },
          { label: "APPROACH",  body: study.approach,  Icon: IconRadar      },
          { label: "OUTCOME",   body: study.outcome,   Icon: IconShieldLock },
        ].map(({ label, body, Icon }) => (
          <div key={label} className="mt-8">
            <div
              className="mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: meta?.color ?? "var(--signal)" }}
            >
              <Icon size={14} />
              {label}
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{body}</p>
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
            TECHNOLOGY STACK
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
