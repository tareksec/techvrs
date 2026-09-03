import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Panel, SectionLabel, StatusPulse } from "@/components/site-chrome";
import { AnimatedCounter, Magnetic } from "@/components/micro-interactions";
import { useTheme } from "@/lib/theme";
import { ParticleBackground } from "@/components/particle-background";
import {
  services,
  caseStudies,
  skills,
  toolRoles,
  testimonials,
} from "@/content/site-data";
import {
  IconRadar,
  IconShieldLock,
  IconAISecure,
  IconEye,
  IconSecureGlobe,
  IconSignal,
  IconSearch,
  IconCheck,
} from "@/components/icons";
import {
  IllustrationWebDev,
  IllustrationWebDesign,
  IllustrationSecureSEO,
  IllustrationSEO,
  IllustrationAI,
} from "@/components/service-illustrations";

export const Route = createFileRoute("/")({
  head: () => ({
    // Preload the LCP hero image before the browser parses the img element
    links: [
      { rel: "preload", as: "image", href: "/hero-bg.avif", type: "image/avif" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatsBar />
      <WhyTechVRS />
      <ServicesOverview />
      <FeaturedWork />
      <EngagementProcess />
      <CapabilitiesMatrix />
      <FeatureHighlights />
      <Testimonials />
      <BlogPreview />
      <CtaBand />
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      <ParticleBackground className="absolute inset-0 h-full w-full z-0" />
      <div className="absolute inset-0 bg-grid opacity-30 z-[1]" aria-hidden />
      <div className="absolute inset-0 bg-scanlines opacity-40 z-[1]" aria-hidden />
      <div className="absolute -top-40 -right-40 h-[700px] w-[700px] bg-signal/15 blur-[140px] z-[1]" aria-hidden />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] bg-signal/08 blur-[120px] z-[1]" aria-hidden />
      <div className="absolute top-1/2 left-1/3 h-[300px] w-[300px] bg-primary/08 blur-[100px] z-[1]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-24 md:pb-32 w-full grid lg:grid-cols-[1fr_auto] gap-16 items-center">
        <div>
          <div className="mono text-[11px] uppercase tracking-[0.35em] text-signal mb-6 reveal flex items-center gap-3">
            <span className="pulse-dot" />
            DIGITAL AGENCY // WEB · DESIGN · SEO · SECURE AI
          </div>

          <h1 className="reveal flip-fade-text font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] max-w-3xl">
            Build. Grow. Secure.
            <br />
            <span className="text-signal">Your Digital</span>
            <br />
            Presence.
          </h1>

          <p className="reveal mt-7 max-w-lg text-base text-muted-foreground leading-relaxed flip-text">
            A modern digital agency engineering fast, business-focused websites, conversion-driven
            UI/UX, organic SEO visibility, and enterprise-grade AI solutions.
          </p>

          <div className="reveal mt-4 flex flex-wrap gap-2">
            {[
              { Icon: IconSecureGlobe, label: "Web Development" },
              { Icon: IconEye,         label: "UI/UX Design"    },
              { Icon: IconSignal,      label: "Secure SEO"      },
              { Icon: IconAISecure,    label: "AI Solutions"    },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-widest text-signal/80 border border-signal/25 bg-signal/5 px-3 py-1.5"
              >
                <Icon size={12} />
                {label}
              </span>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                to="/contact"
                className="group mono text-[11px] uppercase tracking-widest inline-flex items-center gap-3 bg-signal text-signal-foreground px-7 py-4 font-semibold hover:shadow-[0_0_40px_-2px_rgba(0,217,255,0.6)] transition-shadow"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/services"
                className="group mono text-[11px] uppercase tracking-widest inline-flex items-center gap-3 border border-signal/60 text-signal px-7 py-4 hover:bg-signal/10 hover:shadow-[0_0_28px_-4px_rgba(0,217,255,0.45)] transition-all"
              >
                Explore Services
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </div>

          <Link
            to="/contact"
            className="reveal mt-6 inline-flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal transition-colors"
          >
            <span className="live-dot" aria-hidden />
            Free agency resource — request the 27-Point Web &amp; Security Launch Checklist →
          </Link>

          <div className="reveal mt-10 border-t border-hairline pt-5 flex flex-wrap items-center gap-6">
            <StatusPulse />
            <span className="hidden sm:block w-px h-4 bg-hairline" />
            <div className="flex gap-3">
              {["Full-Stack Web", "Conversion UI/UX", "Technical SEO", "Secure AI"].map((c) => (
                <span key={c} className="mono text-[9px] uppercase tracking-widest text-muted-foreground border border-hairline px-2 py-1">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block reveal shrink-0">
          <div className="relative w-[460px] h-[460px] float-y">
            <div className="absolute inset-[-50px] bg-signal/18 blur-[110px] rounded-full" aria-hidden />
            <div className="absolute inset-[-25px] bg-primary/10 blur-[70px] rounded-full" aria-hidden />
            <picture>
              <source srcSet="/hero-bg.avif" type="image/avif" />
              <source srcSet="/hero-bg.webp" type="image/webp" />
              <img
                src="/hero-bg.png"
                alt="TechVRS — Modern Digital Agency Platforms"
                width={500}
                height={500}
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_70px_rgba(0,160,255,0.45)]"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />
            </picture>
            <div className="absolute top-8 -left-6 z-20 mono text-[9px] uppercase tracking-widest text-signal bg-background/85 backdrop-blur-sm border border-signal/35 px-3 py-2 shadow-xl">
              ◉ SYSTEM — ONLINE
            </div>
            <div className="absolute bottom-12 -right-6 z-20 mono text-[9px] uppercase tracking-widest text-signal/90 bg-background/85 backdrop-blur-sm border border-signal/35 px-3 py-2 shadow-xl">
              CORE WEB VITALS: 95+
            </div>
            <div className="absolute top-1/2 -right-10 z-20 mono text-[8px] uppercase tracking-widest text-amber bg-background/85 backdrop-blur-sm border border-amber/35 px-2 py-1.5">
              GROWTH: ACTIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST BAR ─────────────────────────────────────────────────────── */
function TrustBar() {
  const items = [
    "React", "TypeScript", "Next.js", "Tailwind CSS",
    "Cloudflare", "Python", "Docker", "Google Search Console",
    "Figma", "OpenTelemetry", "OWASP",
  ];
  return (
    <section className="bg-background/40 overflow-hidden py-6 border-b border-hairline">
      <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground text-center mb-4">
        MODERN PRODUCTION STACK &amp; INDUSTRY STANDARDS
      </div>
      <div className="flex gap-8 px-8 flex-wrap justify-center">
        {items.map((i) => (
          <span
            key={i}
            className="mono text-xs uppercase tracking-widest text-foreground/60 hover:text-signal transition-colors cursor-default whitespace-nowrap"
          >
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── STATS BAR ─────────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: "99.9%", label: "Uptime Standard" },
    { value: "95+",   label: "Core Web Vitals" },
    { value: "<1.2s", label: "Target Load Time" },
    { value: "100%",  label: "Security Audit Integrity" },
  ];
  return (
    <section className="border-b border-hairline bg-panel/60 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center group">
            <div
              className="font-display text-4xl md:text-5xl font-bold text-signal leading-none mb-2 count-glow"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <AnimatedCounter value={s.value} />
            </div>
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── WHY TECHVRS / DIFFERENTIATION ──────────────────────────────────── */
const WHY_HIGHLIGHTS = [
  {
    Icon: IconSecureGlobe,
    label: "Engineering + UI/UX",
    desc: "Modern React and Next.js applications paired with intuitive, conversion-focused design systems.",
  },
  {
    Icon: IconSignal,
    label: "Secure Technical SEO",
    desc: "Organic search visibility combined with Core Web Vitals optimization and security hardening.",
  },
  {
    Icon: IconAISecure,
    label: "Enterprise-Ready AI",
    desc: "Custom AI automation built privacy-first — scoped access, field-level redaction, and full audit logs.",
  },
];

function WhyTechVRS() {
  return (
    <section className="cf-section mx-auto max-w-7xl px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>WHY TECHVRS</SectionLabel>
          <h2 className="flip-fade-text text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
            Design + Development + SEO + Security + AI.<br />
            <span className="text-signal">One unified delivery system.</span>
          </h2>
          <p className="flip-text text-muted-foreground text-base leading-relaxed mb-5">
            Most companies juggle fragmented vendors: designers who don't understand code, developers
            who ignore SEO, and marketers who introduce security vulnerabilities. TechVRS combines all
            five disciplines into one coherent delivery system.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            From the first pixel to organic search dominance and secure AI workflows, TechVRS builds
            digital systems designed for sustainable, real-world business performance.
          </p>
          <ul className="flex flex-col gap-3 mb-8">
            {[
              { Icon: IconCheck, text: "Sub-second load times & 95+ mobile Lighthouse scores" },
              { Icon: IconCheck, text: "Technical SEO audits that close crawl leaks and boost rankings" },
              { Icon: IconCheck, text: "Zero-leak AI agents with rigorous guardrails and compliance" },
            ].map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="shrink-0 text-signal mt-0.5"><Icon size={15} /></span>
                {text}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="group mono text-[11px] uppercase tracking-widest inline-flex items-center gap-3 border border-signal/60 text-signal px-6 py-3.5 hover:bg-signal/10 transition-all"
          >
            Learn more about our approach →
          </Link>
        </div>

        <div className="grid gap-5">
          {WHY_HIGHLIGHTS.map(({ Icon, label, desc }) => (
            <div key={label} className="panel brackets p-6 flex gap-5 items-start hover-lift">
              <span className="b-tr" /><span className="b-bl" />
              <div className="shrink-0 text-signal mt-1">
                <Icon size={34} />
              </div>
              <div>
                <div className="font-display font-semibold text-lg mb-1.5">{label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES OVERVIEW ─────────────────────────────────────────────── */
const SVC_THEMES = [
  {
    cardBg: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
    accent: "#0891b2",
    ink: "#0f172a",
    body: "#475569",
    bullet: "#334155",
    gridColor: "rgba(0,168,204,0.08)",
    Illustration: IllustrationWebDev,
    SmallIcon: IconSecureGlobe,
    chipLabel: "STATUS: HIGH-PERFORMANCE",
  },
  {
    cardBg: "linear-gradient(135deg, #fffbeb 0%, #ffffff 100%)",
    accent: "#d97706",
    ink: "#1c1917",
    body: "#475569",
    bullet: "#334155",
    gridColor: "rgba(217,119,6,0.08)",
    Illustration: IllustrationWebDesign,
    SmallIcon: IconEye,
    chipLabel: "UI/UX: CONVERSION",
  },
  {
    cardBg: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
    accent: "#0ea5e9",
    ink: "#0f172a",
    body: "#475569",
    bullet: "#334155",
    gridColor: "rgba(14,165,233,0.08)",
    Illustration: IllustrationSecureSEO,
    SmallIcon: IconSignal,
    chipLabel: "CORE WEB VITALS: 95+",
  },
  {
    cardBg: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
    accent: "#16a34a",
    ink: "#052e16",
    body: "#475569",
    bullet: "#334155",
    gridColor: "rgba(22,163,74,0.08)",
    Illustration: IllustrationSEO,
    SmallIcon: IconSearch,
    chipLabel: "ORGANIC GROWTH: ACTIVE",
  },
  {
    cardBg: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)",
    accent: "#7c3aed",
    ink: "#2e1065",
    body: "#475569",
    bullet: "#334155",
    gridColor: "rgba(124,58,237,0.08)",
    Illustration: IllustrationAI,
    SmallIcon: IconAISecure,
    chipLabel: "SECURE AI: RUNNING",
  },
];

function ServicesOverview() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  const DARK_CARD_BG = "linear-gradient(135deg, #0d1f3c 0%, #112244 100%)";
  const DARK_INK     = "#e2e8f0";
  const DARK_BODY    = "#94a3b8";
  const DARK_BULLET  = "#cbd5e1";

  const [visible, setVisible] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, i]));
          }
        },
        { threshold: 0.18 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      className="border-t"
      style={{
        background: dk
          ? "linear-gradient(135deg, #0b132b 0%, #0f1a35 100%)"
          : "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
        borderColor: "rgba(0,168,204,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div aria-hidden className="aurora-bg-light" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        opacity: dk ? 0 : 1,
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(to right, rgba(2,132,199,0.06) 1px, transparent 1px)," +
          "linear-gradient(to bottom, rgba(2,132,199,0.06) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 80%)",
      }} />

      {/* ── Section header ── */}
      <div
        className="mx-auto max-w-7xl px-6 pb-16 relative"
        style={{ paddingTop: "var(--cf-section-gap-lg)" }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-signal opacity-70" />
          <span className="mono text-[11px] uppercase tracking-[0.3em] text-signal">CORE SERVICES</span>
          <span className="w-8 h-px bg-signal opacity-70" />
        </div>
        <h2
          className="flip-fade-text text-4xl md:text-5xl lg:text-6xl font-display font-bold"
          style={{ color: dk ? "#e2e8f0" : "#0f172a" }}
        >
          Five Core Disciplines.<br />
          <span style={{ color: "#0891b2" }}>One High-Performance Standard.</span>
        </h2>
        <p className="flip-text mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: dk ? "#94a3b8" : "#475569" }}>
          We engineer digital systems that look exceptional, load in milliseconds, rank at the top
          of search results, and leverage secure AI to accelerate business operations.
        </p>
      </div>

      {/* ── Sticky card stack ── */}
      <div style={{ position: "relative" }}>
        {services.map((svc, i) => {
          const ct = SVC_THEMES[i] ?? SVC_THEMES[0];
          const { Illustration, SmallIcon } = ct;
          const isVis = visible.has(i);
          const isLast = i === services.length - 1;
          const SCROLL_STEP = "78vh";

          return (
            <div
              key={svc.slug}
              style={{
                height: isLast ? "auto" : SCROLL_STEP,
              }}
            >
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "sticky",
                  top: "12vh",
                  zIndex: 10 + i,
                  padding: "0 clamp(1rem, 3vw, 1.5rem)",
                  maxWidth: "88rem",
                  margin: "0 auto",
                }}
              >
                {/* ── Card shell ── */}
                <div
                  className="cap-card shimmer-on-hover"
                  style={{
                    background: dk ? DARK_CARD_BG : ct.cardBg,
                    borderRadius: 24,
                    boxShadow: `
                      0 1px 2px rgba(2,32,71,0.04),
                      0 8px 24px rgba(2,132,199,0.08),
                      0 32px 64px -24px rgba(2,132,199,0.15),
                      0 0 0 1px rgba(0,168,204,0.10)
                    `,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-12 items-center">
                    {/* Left: Content */}
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-3">
                        <span className="mono text-xs text-muted-foreground">/ {svc.index}</span>
                        <span
                          className="mono text-[10px] uppercase tracking-widest px-3 py-1 border inline-flex items-center gap-2"
                          style={{
                            color: ct.accent,
                            borderColor: `${ct.accent}55`,
                            background: `${ct.accent}12`,
                          }}
                        >
                          <SmallIcon size={12} />
                          {svc.tagline}
                        </span>
                      </div>

                      <h3
                        className="text-3xl md:text-4xl font-display font-bold"
                        style={{ color: dk ? DARK_INK : ct.ink }}
                      >
                        {svc.title}
                      </h3>

                      <p
                        className="text-sm md:text-base leading-relaxed"
                        style={{ color: dk ? DARK_BODY : ct.body }}
                      >
                        {svc.description}
                      </p>

                      <ul className="grid sm:grid-cols-2 gap-2.5 my-2">
                        {svc.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-center gap-2 text-xs md:text-sm font-medium"
                            style={{ color: dk ? DARK_BULLET : ct.bullet }}
                          >
                            <span style={{ color: ct.accent }}>◈</span>
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 flex items-center gap-4">
                        <Link
                          to="/services"
                          hash={svc.slug}
                          className="mono text-[11px] uppercase tracking-widest px-5 py-3 font-semibold border transition-all inline-flex items-center gap-2"
                          style={{
                            borderColor: `${ct.accent}77`,
                            color: ct.accent,
                            background: `${ct.accent}0f`,
                          }}
                        >
                          Service Details →
                        </Link>
                        <span className="mono text-xs text-muted-foreground">
                          {svc.index} / {String(services.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="hidden lg:flex items-center justify-center p-6">
                      <div
                        className="relative w-full max-w-[380px] p-6 rounded-2xl border"
                        style={{
                          borderColor: `${ct.accent}33`,
                          background: dk ? "rgba(15,26,53,0.6)" : "rgba(255,255,255,0.7)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <div
                          className="mono text-[9px] uppercase tracking-widest mb-3 flex items-center justify-between"
                          style={{ color: ct.accent }}
                        >
                          <span>{ct.chipLabel}</span>
                          <span>TECHVRS // DELIVERED</span>
                        </div>
                        <Illustration style={{ maxHeight: 240 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: "4rem" }} aria-hidden />
    </section>
  );
}

/* ─── FEATURED WORK ─────────────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  Web: "text-signal border-signal/40",
  Design: "text-sky-400 border-sky-400/40",
  SEO: "text-green-400 border-green-400/40",
  "AI Solutions": "text-violet-400 border-violet-400/40",
};

function FeaturedWork() {
  const featured = caseStudies.slice(0, 3);
  return (
    <section className="cf-section mx-auto max-w-7xl px-6 border-t border-hairline">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <SectionLabel>SELECTED WORK</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Engineered for impact.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Real client engagements and digital systems delivering measurable improvements in speed,
            rankings, and business automation.
          </p>
        </div>
        <Link
          to="/work"
          className="mono text-[11px] uppercase tracking-widest text-signal hover:underline underline-offset-4 whitespace-nowrap"
        >
          View all {caseStudies.length} case studies →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((c) => (
          <Panel key={c.slug} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className={`mono text-[10px] uppercase tracking-widest border px-2 py-1 ${CATEGORY_COLORS[c.category] ?? "text-signal border-signal/40"}`}>
                {c.category}
              </span>
              <span className="mono text-xs text-muted-foreground">/ {c.index}</span>
            </div>
            <h3 className="text-lg font-display font-semibold leading-snug">{c.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{c.outcome}</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {c.stack.slice(0, 4).map((t) => (
                <span key={t} className="mono text-[9px] px-2 py-0.5 border border-hairline text-foreground/60">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-hairline grid grid-cols-3 gap-3">
              {c.metrics.map((m) => (
                <div key={m.label}>
                  <div className="mono text-signal text-lg font-bold leading-none mb-1">{m.value}</div>
                  <div className="mono text-[8px] uppercase tracking-widest text-muted-foreground leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}

/* ─── ENGAGEMENT PROCESS ─────────────────────────────────────────────── */
function EngagementProcess() {
  const steps = [
    { label: "DISCOVER", caption: "Map business goals, audience intent, and tech requirements." },
    { label: "DESIGN",   caption: "Architect conversion-focused UX, UI systems, and secure schemas." },
    { label: "ENGINEER", caption: "Build with modern React/TypeScript, clean APIs, and rigorous QA." },
    { label: "SCALE",    caption: "Optimize Core Web Vitals, drive SEO rankings, and deploy AI." },
  ];
  return (
    <div className="cf-section mx-auto max-w-7xl px-6 border-t border-hairline">
      <div className="panel brackets p-6 md:p-10">
        <span className="b-tr" /><span className="b-bl" />
        <div className="mono text-[10px] uppercase tracking-widest text-signal mb-8 flex items-center gap-2">
          <span className="live-dot" aria-hidden />
          OUR DELIVERY PROCESS // 04 PHASES
        </div>
        <div className="grid gap-8 md:grid-cols-4 relative">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-2 relative">
              <div className="flex items-center gap-3 mb-1">
                <div className="mono text-[10px] text-signal border border-signal/50 w-7 h-7 flex items-center justify-center shrink-0 font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mono text-sm font-semibold text-foreground tracking-widest">
                  {s.label}
                </div>
              </div>
              <p className="text-sm text-muted-foreground pl-10 leading-relaxed">{s.caption}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-3.5 left-full w-full h-px bg-signal/20 -translate-x-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CAPABILITIES MATRIX ────────────────────────────────────────────── */
function CapabilitiesMatrix() {
  return (
    <section className="cf-section mx-auto max-w-7xl px-6 border-t border-hairline">
      <div className="max-w-3xl mb-12">
        <SectionLabel>CAPABILITIES &amp; STACK</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          Proven technologies. <span className="text-signal">Reliable execution.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          We leverage modern, battle-tested technologies to deliver fast, secure, and easily
          maintainable digital platforms.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="panel brackets p-5 flex flex-col gap-4">
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal border-b border-hairline pb-3">
              {group}
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li
                  key={s}
                  tabIndex={0}
                  data-tip={toolRoles[s] ?? "Production standard tool."}
                  className="tip mono text-[11px] px-2 py-1 border border-hairline text-foreground/80 hover:border-signal/60 hover:text-signal transition-colors cursor-default"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── FEATURE HIGHLIGHTS ─────────────────────────────────────────────── */
const FEATURE_CARDS = [
  {
    theme: "fc-purple",
    badge: "Modern Web & UI",
    title: "Fast, Business-Focused Web Development",
    body: "Built with modern React, Next.js, and TypeScript. Optimized for sub-second page loads, mobile responsiveness, and clean architecture.",
    stat: "98+",
    statLabel: "LIGHTHOUSE SCORE",
  },
  {
    theme: "fc-amber",
    badge: "Technical SEO",
    title: "Secure SEO & Organic Search Growth",
    body: "We audit and optimize crawl budget, Core Web Vitals, and structured data while closing staging and indexing security leaks.",
    stat: "+38%",
    statLabel: "AVERAGE ORGANIC LIFT",
  },
  {
    theme: "fc-cyan",
    badge: "Enterprise AI",
    title: "AI Workflows Engineered With Privacy",
    body: "Custom AI agents with scoped token permissions, OWASP LLM defenses, and zero data leakage — designed for real business workflows.",
    stat: "100%",
    statLabel: "AUDIT LOG INTEGRITY",
  },
];

function FeatureHighlights() {
  return (
    <section
      className="mx-auto max-w-7xl px-6 border-t border-hairline"
      style={{ paddingTop: "var(--cf-section-gap-lg)", paddingBottom: "var(--cf-section-gap-md)" }}
    >
      <div className="max-w-2xl mb-12">
        <SectionLabel>OUR PILLARS</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          Results that <span className="text-signal">compound.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          Not just one-off deliverables — durable improvements to your digital presence, search traffic, and operational speed.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {FEATURE_CARDS.map((card) => (
          <div key={card.title} className={`feature-card ${card.theme}`}>
            <span
              className="fc-badge inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 mb-5"
              style={{ background: "rgba(255,255,255,0.2)", color: "inherit" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
              {card.badge}
            </span>

            <h3 className="font-display text-xl md:text-2xl font-bold leading-snug mb-3">
              {card.title}
            </h3>

            <p style={{ opacity: 0.85, lineHeight: 1.7, fontSize: "0.92rem" }} className="mb-6">
              {card.body}
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1rem", marginTop: "auto" }}>
              <div className="font-display text-3xl font-bold leading-none mb-1">{card.stat}</div>
              <div className="mono text-[9px] uppercase tracking-widest" style={{ opacity: 0.7 }}>{card.statLabel}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="border-t border-hairline bg-panel/10">
      <div className="cf-section mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-12">
          <SectionLabel>CLIENT FEEDBACK</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Delivering results that <span className="text-signal">matter.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <Panel key={t.name} className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <span className="mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-2 py-1 inline-flex items-center gap-2">
                  <span className="live-dot" aria-hidden />
                  CLIENT ENGAGEMENT
                </span>
                <div className="text-right">
                  <div className="mono text-signal text-xl font-bold leading-none">{t.metric}</div>
                  <div className="mono text-[8px] uppercase tracking-widest text-muted-foreground mt-1">
                    {t.metricLabel}
                  </div>
                </div>
              </div>
              <p className="text-base leading-relaxed text-foreground/90">“{t.quote}”</p>
              <div className="mt-auto pt-4 border-t border-hairline">
                <div className="font-display font-semibold text-sm">{t.name}</div>
                <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  {t.role}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BLOG PREVIEW ──────────────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    tag: "Web Engineering",
    title: "Optimizing Core Web Vitals in Modern React Applications",
    summary: "How to eliminate render-blocking scripts, optimize LCP, and achieve sub-second load times on mobile devices.",
    date: "2026-06-15",
    readTime: "6 min",
  },
  {
    tag: "Technical SEO",
    title: "Secure SEO: Why Staging Leaks and Misconfigured Directives Hurt Rankings",
    summary: "A technical guide to canonical enforcement, robots directives, and protecting crawl budget from indexation bloat.",
    date: "2026-05-28",
    readTime: "7 min",
  },
  {
    tag: "AI Architecture",
    title: "The OWASP LLM Top 10: Building Secure AI Systems for Business",
    summary: "Prompt injection defenses, field-level data redaction, and scoped tokens for enterprise AI integrations.",
    date: "2026-05-10",
    readTime: "8 min",
  },
];

function BlogPreview() {
  return (
    <section className="border-t border-hairline bg-panel/10">
      <div className="cf-section mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel>INSIGHTS &amp; FIELD NOTES</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Latest from our engineering team.</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Practical guides on modern web development, UI/UX design, technical SEO, and secure AI automation.
            </p>
          </div>
          <Link to="/blog" className="mono text-[11px] uppercase tracking-widest text-signal hover:underline underline-offset-4 whitespace-nowrap">
            All insights →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Panel key={post.title} className="flex flex-col gap-4 group cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-2 py-1">
                  {post.tag}
                </span>
                <span className="mono text-[10px] text-muted-foreground">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-display font-semibold leading-snug group-hover:text-signal transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                {post.summary}
              </p>
              <div className="mt-auto pt-4 border-t border-hairline flex items-center justify-between">
                <span className="mono text-[10px] text-muted-foreground">{post.date}</span>
                <Link
                  to="/blog"
                  className="mono text-[10px] uppercase tracking-widest text-signal hover:underline underline-offset-2"
                >
                  Read →
                </Link>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BAND ──────────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-6" style={{ paddingTop: "var(--cf-section-gap-lg)", paddingBottom: "var(--cf-section-gap-lg)" }}>
      <div className="panel brackets p-10 md:p-16 lg:p-20 relative overflow-hidden scan-sweep">
        <span className="b-tr" /><span className="b-bl" />
        <div className="absolute inset-0 bg-grid opacity-15" aria-hidden />
        <div className="absolute -top-20 -right-20 h-[300px] w-[300px] bg-signal/10 blur-[80px]" aria-hidden />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-2xl">
            <div className="mono text-[11px] uppercase tracking-widest text-signal mb-4">
              READY TO SCALE // ACCEPTING NEW PROJECTS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              Start your project with TechVRS.
              <br />
              <span className="text-signal">We'll respond with a scoped plan,</span>
              <br />
              not a sales pitch.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Whether you need a full web build, a conversion-focused redesign, a technical SEO overhaul,
              or secure AI automation — let's review your goals and architect the right solution.
            </p>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <Magnetic>
              <Link
                to="/contact"
                className="cf-pill mono text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-3 bg-signal text-signal-foreground px-8 py-5 font-semibold hover:shadow-[0_0_50px_-5px_var(--signal)] transition-all whitespace-nowrap"
              >
                Start a project →
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/services"
                className="cf-pill mono text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-3 border border-hairline text-muted-foreground px-8 py-4 hover:border-signal/60 hover:text-signal transition-all whitespace-nowrap"
              >
                Explore services →
              </Link>
            </Magnetic>
            <Link
              to="/contact"
              className="mono text-[10px] uppercase tracking-widest inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-signal transition-colors whitespace-nowrap"
            >
              <span className="live-dot" aria-hidden />
              Free technical audit — request yours →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
