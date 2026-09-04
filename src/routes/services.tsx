import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site-chrome";
import { services, caseStudies, toolRoles } from "@/content/site-data";
import {
  IllustrationWebDev,
  IllustrationWebDesign,
  IllustrationSecureSEO,
  IllustrationSEO,
  IllustrationAI,
} from "@/components/service-illustrations";
import { IconCheck } from "@/components/icons";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TechVRS | Web Development, Design, SEO & AI Solutions" },
      {
        name: "description",
        content:
          "Explore TechVRS core services: modern web development, conversion-focused UI/UX design, secure technical SEO, organic search growth, and secure enterprise AI solutions.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/services" },
      { property: "og:title", content: "Services — TechVRS | Web Development, Design, SEO & AI Solutions" },
      {
        property: "og:description",
        content:
          "Explore TechVRS core services: modern web development, conversion-focused UI/UX design, secure technical SEO, organic search growth, and secure enterprise AI solutions.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS — Core Services & Digital Solutions" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services — TechVRS | Web Development, Design, SEO & AI Solutions" },
      {
        name: "twitter:description",
        content:
          "Explore TechVRS core services: modern web development, conversion-focused UI/UX design, secure technical SEO, organic search growth, and secure enterprise AI solutions.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "TechVRS — Core Services & Digital Solutions" },
    ],
  }),
  component: ServicesPage,
});

const CATEGORY_COLORS: Record<string, string> = {
  Web: "text-signal border-signal/40",
  Design: "text-sky-400 border-sky-400/40",
  SEO: "text-green-400 border-green-400/40",
  "AI Solutions": "text-violet-400 border-violet-400/40",
};

/* Per-service config */
type SvcCfg = {
  ambientClass: string;
  accentColor: string;
  glowColor: string;
  tagColor: string;
  accent: string;
  chipLabel: string;
  Illustration: React.FC<{ className?: string; style?: React.CSSProperties }>;
};

const SVC_CONFIG: Record<string, SvcCfg> = {
  "web-development": {
    ambientClass: "svc-ambient-web-dev",
    accentColor: "rgba(2,132,199,0.12)",
    glowColor: "rgba(2,132,199,0.25)",
    tagColor: "text-signal border-signal/40",
    accent: "#0891b2",
    chipLabel: "STATUS: HIGH-PERFORMANCE",
    Illustration: IllustrationWebDev,
  },
  "web-design": {
    ambientClass: "svc-ambient-web-design",
    accentColor: "rgba(217,119,6,0.10)",
    glowColor: "rgba(217,119,6,0.22)",
    tagColor: "text-amber border-amber/40",
    accent: "#d97706",
    chipLabel: "UI/UX: CONVERSION-FOCUSED",
    Illustration: IllustrationWebDesign,
  },
  "secure-seo": {
    ambientClass: "svc-ambient-secure-seo",
    accentColor: "rgba(14,165,233,0.10)",
    glowColor: "rgba(14,165,233,0.22)",
    tagColor: "text-sky-400 border-sky-400/40",
    accent: "#0ea5e9",
    chipLabel: "CORE WEB VITALS: 95+",
    Illustration: IllustrationSecureSEO,
  },
  seo: {
    ambientClass: "svc-ambient-seo",
    accentColor: "rgba(22,163,74,0.10)",
    glowColor: "rgba(22,163,74,0.22)",
    tagColor: "text-green-400 border-green-400/40",
    accent: "#16a34a",
    chipLabel: "ORGANIC GROWTH: ACTIVE",
    Illustration: IllustrationSEO,
  },
  "ai-security": {
    ambientClass: "svc-ambient-ai",
    accentColor: "rgba(124,58,237,0.10)",
    glowColor: "rgba(124,58,237,0.22)",
    tagColor: "text-violet-400 border-violet-400/40",
    accent: "#7c3aed",
    chipLabel: "GUARDRAILS: ENFORCED",
    Illustration: IllustrationAI,
  },
};

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      {/* ── Header ── */}
      <SectionLabel>AGENCY SERVICES</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-4xl">
        Five core services. {" "}
        <span className="accent-shift">One high-performance standard.</span>
      </h1>
      <p className="flip-text mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        From custom web applications and conversion UI/UX to technical secure SEO and privacy-first
        AI workflows — explore how our services combine engineering rigor, design elegance, and measurable growth.
      </p>

      {/* ── Quick anchor nav ── */}
      <div className="mt-10 flex flex-wrap gap-3">
        {services.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className="mono text-[10px] uppercase tracking-widest border border-hairline px-3 py-2 text-muted-foreground hover:text-signal hover:border-signal/60 transition-colors"
          >
            {s.index} · {s.title}
          </a>
        ))}
      </div>

      {/* ── Service deep-dives ── */}
      <div className="mt-20 flex flex-col gap-28">
        {services.map((s) => {
          const proof = caseStudies.filter((c) => c.category === s.caseCategory);
          const cfg = SVC_CONFIG[s.slug];
          const { Illustration } = cfg;

          return (
            <section
              key={s.slug}
              id={s.slug}
              className="scroll-mt-28"
              style={{ position: "relative" }}
            >
              {/* Ambient background glow per service */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -60,
                  right: -40,
                  width: 480,
                  height: 480,
                  background: `radial-gradient(circle, ${cfg.accentColor}, transparent 70%)`,
                  filter: "blur(60px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <div className="relative z-10">
                {/* ── Intro: tagline + heading + text + illustration ── */}
                <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start mb-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="mono text-xs text-muted-foreground">/ {s.index}</span>
                      <span
                        className={`mono text-[10px] uppercase tracking-widest border px-3 py-1.5 inline-flex items-center gap-2 ${cfg.tagColor}`}
                        style={{
                          background: cfg.accentColor,
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                        }}
                      >
                        <span className="live-dot" aria-hidden />
                        {s.tagline}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{s.title}</h2>
                    <p className="max-w-2xl text-muted-foreground leading-relaxed">{s.intro}</p>
                  </div>

                  {/* ── Illustration glass frame ── */}
                  <div
                    className="hidden lg:flex shrink-0 items-center justify-center"
                    style={{ width: 320, position: "relative" }}
                  >
                    {/* Soft glow behind frame */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: -30,
                        background: `radial-gradient(ellipse at center, ${cfg.accentColor}, transparent 70%)`,
                        filter: "blur(28px)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Glass illustration card */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        borderRadius: 16,
                        border: `1px solid ${cfg.accent}44`,
                        background: `linear-gradient(160deg, rgba(255,255,255,0.60) 0%, rgba(240,249,255,0.38) 100%)`,
                        backdropFilter: "blur(12px) saturate(1.4)",
                        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 12px 36px -10px ${cfg.accent}30`,
                        padding: "1.5rem 1rem 1rem",
                        animation: "iso-rise 0.9s cubic-bezier(0.16,1,0.3,1) both",
                        overflow: "visible",
                      }}
                    >
                      {/* Glowing status badge (top-center) */}
                      <div
                        style={{
                          position: "absolute",
                          top: -13,
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          color: cfg.accent,
                          background: "rgba(255,255,255,0.95)",
                          border: `1px solid ${cfg.accent}55`,
                          borderRadius: 999,
                          padding: "0.28rem 0.8rem",
                          boxShadow: `0 2px 10px -2px ${cfg.accent}55, 0 0 0 3px rgba(255,255,255,0.6)`,
                          zIndex: 4,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: cfg.accent,
                            boxShadow: `0 0 6px ${cfg.accent}, 0 0 12px ${cfg.accent}`,
                            display: "inline-block",
                          }}
                        />
                        TECHVRS // VERIFIED
                      </div>

                      {/* Illustration */}
                      <Illustration
                        style={{
                          maxHeight: 220,
                          position: "relative",
                          zIndex: 1,
                          filter: `drop-shadow(0px 16px 28px ${cfg.accent}22)`,
                        }}
                      />

                      {/* Floating chip (top-right) */}
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "-1rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          color: cfg.accent,
                          background: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(12px)",
                          border: `1px solid ${cfg.accent}45`,
                          borderRadius: 999,
                          padding: "0.3rem 0.75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          boxShadow: `0 4px 12px -3px ${cfg.accent}35`,
                          zIndex: 4,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: cfg.accent,
                            display: "inline-block",
                          }}
                        />
                        {cfg.chipLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Key offerings list ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {s.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="glass-card p-4 flex items-start gap-3 rounded-xl border border-hairline/80"
                    >
                      <span className="text-signal mt-0.5 shrink-0">
                        <IconCheck size={14} />
                      </span>
                      <span className="text-sm text-foreground/90 font-medium leading-snug">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ── 4-Phase Workflow ── */}
                <div className="glass-card p-8 mb-10 rounded-2xl border border-hairline/80">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-6 flex items-center gap-2">
                    <span className="live-dot" aria-hidden />
                    DELIVERY ROADMAP // 04 PHASES
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {s.workflow.map((step, idx) => (
                      <div key={step.phase} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-signal bg-signal/10 px-2 py-0.5 rounded">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h4 className="font-display font-semibold text-sm">{step.phase}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Tools & Expected Outcome ── */}
                <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center pt-6 border-t border-hairline">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground mr-2">
                      Toolchain:
                    </span>
                    {s.tools.map((tool) => (
                      <span
                        key={tool}
                        title={toolRoles[tool] ?? tool}
                        className="mono text-[11px] px-2.5 py-1 border border-hairline text-foreground/75 bg-background/40 hover:border-signal/50 hover:text-signal transition-colors cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-5 py-3 font-semibold hover:shadow-[0_0_30px_-5px_var(--signal)] transition-shadow whitespace-nowrap inline-flex items-center gap-2"
                  >
                    Start a project in {s.title} →
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Engagement models ── */}
      <div className="mt-24 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Custom Project",
            desc: "Fixed-scope engagement with defined milestones, clear deliverables, and rigorous QA criteria.",
          },
          {
            title: "Agency Retainer",
            desc: "Dedicated monthly development, design sprints, technical SEO optimization, and proactive support.",
          },
          {
            title: "Technical Consultation",
            desc: "High-impact audits and strategic roadmaps — performance profiling, architecture reviews, and AI scoping.",
          },
        ].map((m) => (
          <div
            key={m.title}
            className="glass-card p-6 rounded-2xl border border-hairline/80 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              ENGAGEMENT MODEL
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">{m.title}</h3>
            <p className="text-sm text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Lead magnet + primary CTA ── */}
      <div className="mt-16 glass-cta p-10 md:p-14 relative overflow-hidden rounded-3xl border border-hairline/80 shadow-xl">
        <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
        <div
          className="absolute -top-20 -right-20 h-[300px] w-[300px] blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(2,132,199,0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 h-[200px] w-[200px] blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              START A PROJECT // ACCEPTING NEW CLIENTS
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Ready to elevate your digital presence?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Reach out with your goals and project requirements. We'll respond with a clear technical roadmap,
              architecture recommendations, and transparent timelines.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="text-xs uppercase tracking-wider bg-signal text-signal-foreground font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_40px_-5px_var(--signal)] transition-all inline-flex items-center gap-2"
              >
                Start a project →
              </Link>
              <Link
                to="/demos"
                className="text-xs uppercase tracking-wider border border-hairline text-muted-foreground hover:text-foreground font-semibold px-6 py-4 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                Explore Live Demos ↗
              </Link>
            </div>
          </div>

          {/* Lead magnet checklist + illustration */}
          <div className="glass-card p-6 md:p-8 relative overflow-hidden rounded-2xl border border-hairline/80 shadow-md">
            <div className="relative z-10">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-3 flex items-center gap-2">
                <span className="live-dot" aria-hidden />
                FREE AGENCY RESOURCE
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Modern Web &amp; Security Launch Checklist
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                The comprehensive 27-point checklist we run before any production client site goes live — Core Web Vitals,
                structured data, SSL/TLS, edge caching, and attack surface defense.
              </p>
              <Link
                to="/contact"
                className="inline-flex text-xs uppercase tracking-wider font-semibold border border-signal/60 text-signal px-5 py-3 rounded-xl hover:bg-signal/10 transition-all"
              >
                Request the checklist →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
