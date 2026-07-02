import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site-chrome";
import { services, caseStudies, toolRoles } from "@/content/site-data";
import {
  IllustrationSOC,
  IllustrationWebDeploy,
  IllustrationSEO,
  IllustrationAI,
} from "@/components/service-illustrations";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — techvrs | Security, Deployment, SEO, AI" },
      {
        name: "description",
        content:
          "Four disciplines, one security-first standard: SOC & cyber security, secure web deployment, technical SEO, and secure AI agent development.",
      },
      { property: "og:title", content: "Services — techvrs" },
      {
        property: "og:description",
        content:
          "SOC monitoring, hardened deployments, technical SEO audits, and secure custom AI agent development.",
      },
    ],
  }),
  component: ServicesPage,
});

const CATEGORY_COLORS: Record<string, string> = {
  SOC: "text-signal border-signal/40",
  Web: "text-amber border-amber/40",
  SEO: "text-green-400 border-green-400/40",
  "AI Agents": "text-violet-400 border-violet-400/40",
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
  "soc-cybersecurity": {
    ambientClass: "svc-ambient-soc",
    accentColor: "rgba(2,132,199,0.12)",
    glowColor: "rgba(2,132,199,0.25)",
    tagColor: "text-signal border-signal/40",
    accent: "#0891b2",
    chipLabel: "MONITORING: ACTIVE",
    Illustration: IllustrationSOC,
  },
  "secure-web-deployment": {
    ambientClass: "svc-ambient-web",
    accentColor: "rgba(217,119,6,0.10)",
    glowColor: "rgba(217,119,6,0.22)",
    tagColor: "text-amber border-amber/40",
    accent: "#d97706",
    chipLabel: "INTEGRITY: 100%",
    Illustration: IllustrationWebDeploy,
  },
  "technical-secure-seo": {
    ambientClass: "svc-ambient-seo",
    accentColor: "rgba(22,163,74,0.10)",
    glowColor: "rgba(22,163,74,0.22)",
    tagColor: "text-green-400 border-green-400/40",
    accent: "#16a34a",
    chipLabel: "VISIBILITY: LIVE",
    Illustration: IllustrationSEO,
  },
  "ai-agent-development": {
    ambientClass: "svc-ambient-ai",
    accentColor: "rgba(124,58,237,0.10)",
    glowColor: "rgba(124,58,237,0.22)",
    tagColor: "text-violet-400 border-violet-400/40",
    accent: "#7c3aed",
    chipLabel: "AGENT: RUNNING",
    Illustration: IllustrationAI,
  },
};

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      {/* ── Header ── */}
      <SectionLabel>CAPABILITIES</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-4xl">
        Four disciplines. {" "}
        <span className="accent-shift">One security-first standard.</span>
      </h1>
      <p className="flip-text mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        The same four capabilities from my homepage, expanded into full engagements:
        how each one runs, the tooling behind it, and the outcome you can hold me to.
        Every service links straight to field work — proof, not promises.
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
                        SYS // ACTIVE
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
                          className="pulse-dot"
                          style={{ width: 5, height: 5, background: cfg.accent }}
                        />
                        {cfg.chipLabel}
                      </div>

                      {/* Corner brackets */}
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          width: 14,
                          height: 14,
                          borderTop: `1px solid ${cfg.accent}66`,
                          borderLeft: `1px solid ${cfg.accent}66`,
                        }}
                      />
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          width: 14,
                          height: 14,
                          borderBottom: `1px solid ${cfg.accent}66`,
                          borderRight: `1px solid ${cfg.accent}66`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Workflow + Toolchain/Outcome grid ── */}
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                  {/* Workflow — glass card */}
                  <div
                    className="glass-card brackets flex flex-col gap-6 p-6"
                    style={{ position: "relative" }}
                  >
                    <span className="b-tr" />
                    <span className="b-bl" />
                    <div className="mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-2">
                      <span className="live-dot" aria-hidden />
                      WORKFLOW // {String(s.workflow.length).padStart(2, "0")} PHASES
                    </div>
                    <ol className="flex flex-col gap-5">
                      {s.workflow.map((step, i) => (
                        <li key={step.phase} className="flex gap-4 items-start">
                          <span
                            className="mono text-[10px] text-signal border border-signal/50 w-7 h-7 flex items-center justify-center shrink-0 font-bold"
                            style={{ background: cfg.accentColor }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <div className="mono text-sm font-semibold tracking-widest uppercase mb-1">
                              {step.phase}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {step.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Right column: Toolchain + Outcome */}
                  <div className="flex flex-col gap-6">
                    {/* Toolchain — glass card */}
                    <div
                      className="glass-card brackets flex flex-col gap-4 p-6"
                      style={{ position: "relative" }}
                    >
                      <span className="b-tr" />
                      <span className="b-bl" />
                      <div className="mono text-[10px] uppercase tracking-widest text-signal">
                        TOOLCHAIN
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {s.tools.map((t) => (
                          <li
                            key={t}
                            tabIndex={0}
                            data-tip={
                              toolRoles[t] ??
                              "Deployed in real engagements and lab environments."
                            }
                            className="tip mono text-[11px] px-2.5 py-1.5 border border-hairline text-foreground/80 hover:border-signal/60 hover:text-signal transition-all cursor-default"
                            style={{
                              background: "rgba(255,255,255,0.55)",
                              backdropFilter: "blur(6px)",
                            }}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground">
                        Hover any tool to see its role in this workflow.
                      </p>
                    </div>

                    {/* Outcome — glass card */}
                    <div
                      className="glass-card brackets flex flex-col gap-3 flex-1 p-6"
                      style={{ position: "relative" }}
                    >
                      <span className="b-tr" />
                      <span className="b-bl" />
                      <div className="mono text-[10px] uppercase tracking-widest text-signal">
                        THE OUTCOME
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/90">{s.outcome}</p>
                    </div>
                  </div>
                </div>

                {/* ── Field proof — linked case studies ── */}
                {proof.length > 0 && (
                  <div className="mt-8">
                    <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "currentColor",
                          opacity: 0.5,
                        }}
                      />
                      FIELD PROOF // {String(proof.length).padStart(2, "0")}{" "}
                      {proof.length === 1 ? "CASE STUDY" : "CASE STUDIES"}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {proof.map((c) => (
                        <Link
                          key={c.slug}
                          to="/work"
                          className="glass-card brackets hover-lift p-5 flex flex-col gap-3 group"
                          style={{ position: "relative" }}
                        >
                          <span className="b-tr" />
                          <span className="b-bl" />
                          <div className="flex items-center justify-between">
                            <span
                              className={`mono text-[10px] uppercase tracking-widest border px-2 py-1 ${
                                CATEGORY_COLORS[c.category] ?? "text-signal border-signal/40"
                              }`}
                            >
                              {c.category}
                            </span>
                            <span className="mono text-xs text-muted-foreground">{c.index}</span>
                          </div>
                          <h3 className="font-display font-semibold leading-snug group-hover:text-signal transition-colors">
                            {c.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {c.outcome}
                          </p>
                          <div className="mt-auto pt-3 border-t border-hairline flex items-center justify-between">
                            <div className="flex gap-4">
                              {c.metrics.slice(0, 2).map((m) => (
                                <div key={m.label}>
                                  <div className="mono text-signal text-base font-bold leading-none mb-1">
                                    {m.value}
                                  </div>
                                  <div className="mono text-[8px] uppercase tracking-widest text-muted-foreground">
                                    {m.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <span className="mono text-[10px] uppercase tracking-widest text-signal group-hover:translate-x-0.5 transition-transform">
                              Open →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom divider */}
              <div
                className="mt-16 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${cfg.glowColor}, transparent)`,
                }}
              />
            </section>
          );
        })}
      </div>

      {/* ── Engagement models ── */}
      <div className="mt-24 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Freelance project",
            desc: "Fixed-scope engagement with defined deliverables and hardening acceptance criteria.",
          },
          {
            title: "Retainer",
            desc: "Ongoing monitoring, response, and iterative hardening on your infrastructure.",
          },
          {
            title: "Consultation",
            desc: "Focused review sessions — architecture, audits, or a second set of eyes.",
          },
        ].map((m) => (
          <div
            key={m.title}
            className="glass-card brackets p-6"
            style={{ position: "relative" }}
          >
            <span className="b-tr" />
            <span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              ENGAGEMENT MODEL
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">{m.title}</h3>
            <p className="text-sm text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Lead magnet + primary CTA ── */}
      <div className="mt-16 glass-cta brackets p-10 md:p-14 relative overflow-hidden">
        <span className="b-tr" />
        <span className="b-bl" />
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
            <div className="mono text-[11px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              NEXT STEP // ACCEPTING ENGAGEMENTS
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Have a security gap you want mapped?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Open a channel and I'll respond with a scoped plan — deliverables, timeline,
              and acceptance criteria — not a sales pitch.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-6 py-4 hover:shadow-[0_0_40px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2"
              >
                Open a channel →
              </Link>
              <Link
                to="/contact"
                className="mono text-[10px] uppercase tracking-widest inline-flex items-center gap-2 text-muted-foreground hover:text-signal transition-colors"
              >
                <span className="live-dot" aria-hidden />
                Request a free Technical SEO Audit →
              </Link>
            </div>
          </div>

          {/* Lead magnet checklist + illustration */}
          <div
            className="glass-card brackets p-6 md:p-8 relative overflow-hidden"
            style={{ position: "relative" }}
          >
            <span className="b-tr" />
            <span className="b-bl" />
            {/* SOC checklist illustration — top-right decorative */}
            <img
              src="/soc-checklist.png"
              alt=""
              aria-hidden
              style={{
                position: "absolute",
                bottom: -10,
                right: -10,
                width: 130,
                height: 130,
                objectFit: "contain",
                opacity: 0.22,
                pointerEvents: "none",
                filter: "drop-shadow(0 4px 16px rgba(2,132,199,0.2))",
              }}
            />
            <div className="relative z-10">
              <div className="mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2">
                <span className="live-dot" aria-hidden />
                FREE RESOURCE // NO STRINGS
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Secure Web Deployment Checklist
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                The exact 27-point checklist I run before any client site goes live — TLS,
                headers, DNS, access control, and edge protection. Request it and I'll send
                it over, along with one free observation about your current setup.
              </p>
              <Link
                to="/contact"
                className="inline-flex mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-5 py-3 hover:bg-signal/10 transition-all"
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
