import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Panel, SectionLabel, StatusPulse } from "@/components/site-chrome";
import { AnimatedCounter, Magnetic } from "@/components/micro-interactions";
import { useTheme } from "@/lib/theme";
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
      <DemoShowcase />
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
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Sleek ambient agency light glow — smooth, performant, no noisy canvas */}
      <div
        className="absolute top-1/4 -left-32 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.12) 0%, rgba(2, 132, 199, 0.04) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-32 right-1/4 w-[750px] h-[750px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-28 md:pt-24 md:pb-32 w-full grid lg:grid-cols-[1.1fr_auto] gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-signal/10 border border-signal/25 text-signal text-xs font-medium tracking-wide mb-6 reveal">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span>Modern Digital Technology Agency</span>
          </div>

          <h1 className="reveal flip-fade-text font-display text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-bold leading-[1.04] tracking-tight max-w-3xl">
            We engineer high-performance web platforms,{" "}
            <span className="text-signal">conversion design,</span> &amp; secure AI.
          </h1>

          <p className="reveal mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed flip-text">
            TechVRS helps ambitious companies launch modern web applications, achieve organic search dominance, and automate workflows with zero-leak enterprise AI architecture.
          </p>

          <div className="reveal mt-6 flex flex-wrap gap-2.5">
            {[
              { Icon: IconSecureGlobe, label: "Web Development" },
              { Icon: IconEye,         label: "Web Design & UI/UX" },
              { Icon: IconSignal,      label: "Secure SEO" },
              { Icon: IconSearch,      label: "On-Page & Off-Page SEO" },
              { Icon: IconAISecure,    label: "AI Solutions" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 border border-hairline bg-panel/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full"
              >
                <Icon size={13} className="text-signal" />
                {label}
              </span>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                to="/contact"
                className="group text-xs uppercase tracking-wider inline-flex items-center gap-2.5 bg-signal text-signal-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-[0_0_40px_-2px_rgba(0,217,255,0.6)] transition-all"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/demos"
                className="group text-xs uppercase tracking-wider inline-flex items-center gap-2.5 border border-signal/50 text-signal px-7 py-4 rounded-xl font-semibold hover:bg-signal/10 hover:shadow-[0_0_28px_-4px_rgba(0,217,255,0.35)] transition-all"
              >
                Explore Live Demos
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </Magnetic>
            <Link
              to="/work"
              className="text-xs uppercase tracking-wider inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors px-4 py-3"
            >
              View Client Work →
            </Link>
          </div>

          <div className="reveal mt-10 border-t border-hairline pt-6 flex flex-wrap items-center gap-6">
            <StatusPulse />
            <span className="hidden sm:block w-px h-4 bg-hairline" />
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground font-medium">
              <span>98+ Lighthouse</span>
              <span className="text-hairline">·</span>
              <span>Sub-second LCP</span>
              <span className="text-hairline">·</span>
              <span>Production Proven</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block reveal shrink-0">
          <div className="relative w-[480px] h-[480px] float-y">
            <div className="absolute inset-[-40px] bg-signal/15 blur-[100px] rounded-full" aria-hidden />
            <div className="absolute inset-[-20px] bg-sky-500/10 blur-[60px] rounded-full" aria-hidden />
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
            <div className="absolute top-8 -left-6 z-20 text-xs font-semibold text-foreground bg-background/90 backdrop-blur-md border border-hairline px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Full-Stack Architecture
            </div>
            <div className="absolute bottom-10 -right-4 z-20 text-xs font-semibold text-foreground bg-background/90 backdrop-blur-md border border-hairline px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
              <span className="text-signal font-bold">98+</span>
              Core Web Vitals
            </div>
            <div className="absolute top-1/2 -right-8 z-20 text-xs font-semibold text-foreground bg-background/90 backdrop-blur-md border border-hairline px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal" />
              Enterprise AI Ready
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
            className="group text-xs uppercase tracking-wider inline-flex items-center gap-3 border border-signal/60 text-signal px-6 py-3.5 rounded-xl hover:bg-signal/10 transition-all font-semibold"
          >
            Learn more about our approach →
          </Link>
        </div>

        <div className="grid gap-5">
          {WHY_HIGHLIGHTS.map(({ Icon, label, desc }) => (
            <div key={label} className="panel p-6 flex gap-5 items-start hover-lift rounded-2xl border border-hairline/80">
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
    cardBg: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
    cardBgDark: "linear-gradient(145deg, #0b1528 0%, #0f1e3d 60%, #13274f 100%)",
    accent: "#0891b2",
    accentLight: "rgba(8,145,178,0.12)",
    accentBorder: "rgba(8,145,178,0.25)",
    ink: "#0f172a",
    body: "#334155",
    bullet: "#1e293b",
    gridColor: "rgba(0,168,204,0.08)",
    Illustration: IllustrationWebDev,
    SmallIcon: IconSecureGlobe,
    chipLabel: "ENGINEERING // ACTIVE",
    metricValue: "99/100",
    metricLabel: "Lighthouse Performance",
    secondaryMetric: "<0.8s LCP Speed",
    tags: ["React & Next.js", "TypeScript", "Tailwind CSS", "Headless CMS"],
  },
  {
    cardBg: "linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)",
    cardBgDark: "linear-gradient(145deg, #181408 0%, #241c0e 60%, #302613 100%)",
    accent: "#d97706",
    accentLight: "rgba(217,119,6,0.12)",
    accentBorder: "rgba(217,119,6,0.25)",
    ink: "#1c1917",
    body: "#334155",
    bullet: "#1e293b",
    gridColor: "rgba(217,119,6,0.08)",
    Illustration: IllustrationWebDesign,
    SmallIcon: IconEye,
    chipLabel: "DESIGN SYSTEM // ACTIVE",
    metricValue: "+42%",
    metricLabel: "Conversion Uplift",
    secondaryMetric: "WCAG AAA Accessible",
    tags: ["Figma Systems", "Conversion UX", "Responsive UI", "Micro-Interactions"],
  },
  {
    cardBg: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
    cardBgDark: "linear-gradient(145deg, #09192b 0%, #0d233c 60%, #112d4d 100%)",
    accent: "#0ea5e9",
    accentLight: "rgba(14,165,233,0.12)",
    accentBorder: "rgba(14,165,233,0.25)",
    ink: "#0f172a",
    body: "#334155",
    bullet: "#1e293b",
    gridColor: "rgba(14,165,233,0.08)",
    Illustration: IllustrationSecureSEO,
    SmallIcon: IconSignal,
    chipLabel: "CORE WEB VITALS // 95+",
    metricValue: "100%",
    metricLabel: "Crawl Coverage",
    secondaryMetric: "Zero Indexation Leaks",
    tags: ["Core Web Vitals", "Crawl Architecture", "Structured Data", "Security Headers"],
  },
  {
    cardBg: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
    cardBgDark: "linear-gradient(145deg, #091f14 0%, #0d2b1c 60%, #113824 100%)",
    accent: "#16a34a",
    accentLight: "rgba(22,163,74,0.12)",
    accentBorder: "rgba(22,163,74,0.25)",
    ink: "#052e16",
    body: "#334155",
    bullet: "#1e293b",
    gridColor: "rgba(22,163,74,0.08)",
    Illustration: IllustrationSEO,
    SmallIcon: IconSearch,
    chipLabel: "ORGANIC GROWTH // SCALING",
    metricValue: "+245%",
    metricLabel: "Search Traffic Growth",
    secondaryMetric: "Domain Authority 78+",
    tags: ["Keyword Clusters", "Authority Content", "Backlink Architecture", "SERP #1 Ranks"],
  },
  {
    cardBg: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
    cardBgDark: "linear-gradient(145deg, #170d2b 0%, #20133c 60%, #2a194e 100%)",
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.12)",
    accentBorder: "rgba(124,58,237,0.25)",
    ink: "#2e1065",
    body: "#334155",
    bullet: "#1e293b",
    gridColor: "rgba(124,58,237,0.08)",
    Illustration: IllustrationAI,
    SmallIcon: IconAISecure,
    chipLabel: "SECURE AI // ENTERPRISE",
    metricValue: "0%",
    metricLabel: "Data Exfiltration Risk",
    secondaryMetric: "Real-Time Agent Inference",
    tags: ["Autonomous Agents", "Custom LLM Pipelines", "Security Guardrails", "API Workflows"],
  },
];

function ServicesOverview() {
  const { theme } = useTheme();
  const dk = theme === "dark";

  const DARK_CARD_BG = "linear-gradient(145deg, #0b1329 0%, #0f1c3a 60%, #132448 100%)";
  const DARK_INK     = "#f8fafc";
  const DARK_BODY    = "#cbd5e1";
  const DARK_BULLET  = "#e2e8f0";

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (!cards.length) return;

      const totalSteps = cards.length; // 5

      // Reset all cards initial state: Card 0 is front and center, subsequent cards parked below
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, {
            yPercent: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            pointerEvents: "auto",
            zIndex: 20,
          });
        } else {
          gsap.set(card, {
            yPercent: 100,
            y: 0,
            scale: 0.96,
            autoAlpha: 0,
            pointerEvents: "none",
            zIndex: 20 + i,
          });
        }
      });

      // Pinned scrubbed GSAP timeline with explicit dwell time per card
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "services-pin",
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalSteps * window.innerHeight * 0.75}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let step = 0;
            if (p >= 0.75) step = 4;
            else if (p >= 0.55) step = 3;
            else if (p >= 0.35) step = 2;
            else if (p >= 0.15) step = 1;
            else step = 0;
            setActiveStep(step);
          },
        },
      });

      // Card 0 dwell at start
      tl.to({}, { duration: 0.5 });

      for (let i = 1; i < totalSteps; i++) {
        const transitionLabel = `step-${i}`;
        tl.addLabel(transitionLabel);

        // Ensure all earlier cards are completely hidden (prevents any ghosting)
        for (let j = 0; j < i - 1; j++) {
          tl.set(cards[j], { autoAlpha: 0, pointerEvents: "none" }, transitionLabel);
        }

        // Previous card scales down slightly and fades out completely (zero ghost text)
        tl.to(
          cards[i - 1],
          {
            scale: 0.95,
            y: -14,
            autoAlpha: 0,
            pointerEvents: "none",
            duration: 1,
            ease: "power2.inOut",
          },
          transitionLabel
        );

        // Current card glides up smoothly into center stage
        tl.to(
          cards[i],
          {
            yPercent: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            pointerEvents: "auto",
            duration: 1,
            ease: "power2.inOut",
          },
          transitionLabel
        );

        // Dwell time: generous dwell time for each card, plus extended dwell for Card 05
        const dwell = i === totalSteps - 1 ? 1.5 : 0.6;
        tl.to({}, { duration: dwell });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToStep = (idx: number) => {
    const st = ScrollTrigger.getById("services-pin");
    if (!st) return;

    // Timeline midpoints mapped into normalized progress (total = 7.8)
    const dwellMidpoints = [0.25, 1.80, 3.40, 5.00, 7.00];
    const totalDuration = 7.8;

    const targetTime = dwellMidpoints[idx] ?? 0.25;
    const targetProgress = Math.min(0.92, targetTime / totalDuration);
    const targetY = st.start + (st.end - st.start) * targetProgress;

    window.scrollTo({ top: targetY, behavior: "smooth" });
    setActiveStep(idx);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t min-h-screen flex flex-col justify-center pt-16 pb-8 sm:pt-20 sm:pb-12"
      style={{
        background: dk
          ? "linear-gradient(135deg, #0b132b 0%, #0f1a35 100%)"
          : "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
        borderColor: "rgba(0,168,204,0.12)",
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full relative z-20 flex flex-col">
        {/* ── Section Header (Centered & Prominent) ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-signal opacity-70" />
            <span className="mono text-[11px] uppercase tracking-[0.3em] text-signal font-semibold">CORE SERVICES</span>
            <span className="w-8 h-px bg-signal opacity-70" />
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight tracking-tight"
            style={{ color: dk ? "#f1f5f9" : "#0f172a" }}
          >
            Five Core Disciplines.<br className="hidden sm:inline" />
            <span className="text-signal sm:ml-2">One High-Performance Standard.</span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We engineer digital systems that look exceptional, load in milliseconds, rank at the top
            of search results, and leverage secure AI to accelerate business operations.
          </p>

          {/* Quick-Jump Discipline Pill Bar */}
          <div className="mt-3.5 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {services.map((svc, idx) => {
              const isActive = activeStep === idx;
              const ct = SVC_THEMES[idx] ?? SVC_THEMES[0];
              return (
                <button
                  key={svc.slug}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className="mono text-[11px] font-semibold px-3 py-1 rounded-full border transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  style={{
                    borderColor: isActive ? ct.accent : (dk ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)"),
                    background: isActive
                      ? (dk ? `${ct.accent}25` : `${ct.accent}15`)
                      : (dk ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)"),
                    color: isActive ? (dk ? "#ffffff" : ct.ink) : (dk ? "#94a3b8" : "#64748b"),
                    boxShadow: isActive ? `0 0 12px -2px ${ct.accent}40` : "none",
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? ct.accent : (dk ? "#475569" : "#cbd5e1"),
                      boxShadow: isActive ? `0 0 6px ${ct.accent}` : "none",
                    }}
                  />
                  <span>{svc.index}. {svc.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Full-Width GSAP Stacking Cards Stage ── */}
        <div className="relative w-full max-w-5xl mx-auto h-[530px] sm:h-[490px] lg:h-[480px]">
          {services.map((svc, i) => {
            const ct = SVC_THEMES[i] ?? SVC_THEMES[0];
            const { Illustration, SmallIcon } = ct;

            return (
              <div
                key={svc.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="service-card-item absolute inset-0 w-full h-full will-change-transform rounded-3xl border transition-shadow duration-300"
                style={{
                  backgroundColor: dk ? "#0c1527" : "#ffffff",
                  background: dk ? (ct.cardBgDark ?? DARK_CARD_BG) : ct.cardBg,
                  borderColor: dk ? `${ct.accent}40` : `${ct.accent}30`,
                  boxShadow: dk
                    ? `0 25px 65px -15px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06), 0 0 50px -15px ${ct.accent}30`
                    : `0 25px 55px -15px rgba(2,32,71,0.12), 0 0 0 1px ${ct.accent}20, 0 0 45px -15px ${ct.accent}20`,
                  overflow: "hidden",
                  zIndex: 20 + i,
                }}
              >
                {/* Ambient corner glows */}
                <div aria-hidden style={{
                  position: "absolute", top: 0, left: 0,
                  width: "50%", height: "40%",
                  background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${ct.accent}14, transparent)`,
                  pointerEvents: "none",
                }} />
                <div aria-hidden style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "60%", height: "60%",
                  background: `radial-gradient(ellipse 60% 60% at 100% 100%, ${ct.accent}12, transparent)`,
                  pointerEvents: "none",
                }} />

                {/* Card Inner Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 p-6 sm:p-7 lg:p-8 h-full items-center">
                  {/* Left side: content (7 cols) */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full gap-3 py-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono text-xs font-semibold px-2 py-0.5 rounded border border-muted/50 text-muted-foreground">
                        / {svc.index}
                      </span>
                      <span
                        className="mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1.5 font-semibold"
                        style={{
                          color: ct.accent,
                          borderColor: `${ct.accent}44`,
                          background: `${ct.accent}14`,
                        }}
                      >
                        <SmallIcon size={12} />
                        {svc.tagline}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-2xl sm:text-3xl lg:text-[32px] font-display font-bold leading-tight tracking-tight"
                        style={{ color: dk ? DARK_INK : ct.ink }}
                      >
                        {svc.title}
                      </h3>
                      <p
                        className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground"
                        style={{ color: dk ? DARK_BODY : ct.body }}
                      >
                        {svc.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-1">
                      {svc.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs font-medium"
                          style={{ color: dk ? DARK_BULLET : ct.bullet }}
                        >
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] shrink-0 mt-0.5 font-bold"
                            style={{
                              background: ct.accentLight,
                              color: ct.accent,
                              border: `1px solid ${ct.accentBorder}`,
                            }}
                          >
                            ✓
                          </span>
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {ct.tags.map((t) => (
                        <span
                          key={t}
                          className="mono text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-md border font-medium"
                          style={{
                            borderColor: dk ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                            background: dk ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                            color: dk ? "#94a3b8" : "#64748b",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-2.5 flex items-center justify-between border-t border-hairline/60">
                      <Link
                        to="/services"
                        hash={svc.slug}
                        className="group mono text-xs uppercase tracking-wider px-4 py-2 rounded-xl font-semibold border transition-all inline-flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          borderColor: `${ct.accent}66`,
                          color: ct.accent,
                          background: `${ct.accent}12`,
                        }}
                      >
                        <span>Explore Discipline</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </Link>
                      <span className="mono text-xs text-muted-foreground font-mono">
                        {svc.index} / {String(services.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Visual preview (5 cols) */}
                  <div className="hidden md:flex md:col-span-5 h-full items-center justify-center">
                    <div
                      className="w-full h-full max-h-[360px] rounded-2xl border p-4 relative backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-lg"
                      style={{
                        borderColor: `${ct.accent}33`,
                        background: dk ? "rgba(15,26,53,0.75)" : "rgba(255,255,255,0.85)",
                      }}
                    >
                      <div className="flex items-center justify-between pb-2.5 border-b border-hairline/40">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400/80" />
                          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        </div>
                        <div
                          className="mono text-[8px] sm:text-[9px] uppercase tracking-widest flex items-center gap-1.5 font-semibold"
                          style={{ color: ct.accent }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ct.accent }} />
                          <span>{ct.chipLabel}</span>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-center py-2 flex-1">
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            width: "70%",
                            height: "70%",
                            background: `radial-gradient(circle, ${ct.accent}18 0%, transparent 70%)`,
                            filter: "blur(20px)",
                            pointerEvents: "none",
                          }}
                        />
                        <div className="relative z-10 w-full flex items-center justify-center">
                          <Illustration
                            className="w-full max-h-[140px] sm:max-h-[160px] object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>

                      <div
                        className="mt-2 p-2 rounded-xl border flex items-center justify-between"
                        style={{
                          background: dk ? "rgba(10, 18, 38, 0.7)" : "rgba(240, 249, 255, 0.75)",
                          borderColor: `${ct.accent}30`,
                        }}
                      >
                        <div>
                          <div className="font-display font-bold text-sm sm:text-base leading-none" style={{ color: ct.accent }}>
                            {ct.metricValue}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                            {ct.metricLabel}
                          </div>
                        </div>
                        <div
                          className="mono text-[9px] px-2 py-0.5 rounded border font-semibold"
                          style={{
                            color: ct.accent,
                            borderColor: `${ct.accent}40`,
                            background: `${ct.accent}10`,
                          }}
                        >
                          {ct.secondaryMetric}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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

/* ─── DEMO SHOWROOM SHOWCASE ────────────────────────────────────────── */
function DemoShowcase() {
  const categories = [
    {
      title: "WordPress & WooCommerce Platforms",
      count: "15+ Themes & Stores",
      desc: "Fast, custom-tailored WordPress setups with modern Gutenberg architecture, high-converting checkout flows, and sub-second load times.",
      tag: "WordPress Engine",
      filter: "wordpress",
    },
    {
      title: "Custom Next.js & React Web Apps",
      count: "10+ Bespoke Builds",
      desc: "Production-ready web applications with server-side rendering, robust authentication, dynamic database schemas, and scalable cloud infrastructure.",
      tag: "Next.js / TypeScript",
      filter: "custom",
    },
    {
      title: "Corporate & Professional Websites",
      count: "12+ Live Frameworks",
      desc: "Clean editorial layouts engineered for B2B enterprises, technology firms, and consulting practices with built-in lead generation forms.",
      tag: "Corporate UI/UX",
      filter: "all",
    },
    {
      title: "High-Conversion Landing Pages",
      count: "8+ Funnel Blueprints",
      desc: "Persuasive product and SaaS launch pages optimized for Core Web Vitals, organic search snippets, and maximum visitor conversion.",
      tag: "Conversion Funnels",
      filter: "featured",
    },
  ];

  return (
    <section className="cf-section mx-auto max-w-7xl px-6 border-t border-hairline">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <SectionLabel>INTERACTIVE CONCEPTS &amp; SYSTEM SHOWROOM</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Explore our website templates <br className="hidden sm:inline" />
            <span className="text-signal">&amp; live system concepts.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
            Browse our dedicated showroom of interactive WordPress builds, custom Next.js platforms,
            and high-conversion interfaces. Test live staging environments and inspect the technical stacks.
          </p>
        </div>
        <Link
          to="/demos"
          className="group inline-flex items-center gap-2 bg-signal text-signal-foreground font-semibold px-6 py-3.5 rounded-xl hover:shadow-[0_0_30px_-4px_rgba(0,217,255,0.5)] transition-all"
        >
          Open Demo Library
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to="/demos"
            search={{ filter: cat.filter as any }}
            className="group panel p-6 flex flex-col justify-between rounded-2xl hover-lift border border-hairline/80 hover:border-signal/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-signal bg-signal/10 border border-signal/20 px-2.5 py-1 rounded-md">
                  {cat.tag}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {cat.count}
                </span>
              </div>
              <h3 className="text-lg font-display font-bold leading-snug group-hover:text-signal transition-colors">
                {cat.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {cat.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline/60 flex items-center justify-between text-xs font-semibold text-signal">
              <span>Inspect Demos</span>
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── ENGAGEMENT PROCESS ─────────────────────────────────────────────── */
function EngagementProcess() {
  const steps = [
    {
      num: "01",
      label: "Discovery & Strategy",
      caption: "Map business goals, audience intent, technical requirements, and competitive opportunities.",
    },
    {
      num: "02",
      label: "Architecture & Design",
      caption: "Craft conversion-focused UX, responsive design systems, and robust component hierarchies.",
    },
    {
      num: "03",
      label: "High-Performance Build",
      caption: "Engineer with modern React, Next.js, and TypeScript with clean APIs and test coverage.",
    },
    {
      num: "04",
      label: "SEO & Security Hardening",
      caption: "Optimize Core Web Vitals, close crawl leaks, implement schema, and audit attack surfaces.",
    },
    {
      num: "05",
      label: "Launch & Scalable Growth",
      caption: "Deploy with continuous delivery, automated telemetry, and ongoing organic expansion.",
    },
  ];

  return (
    <div className="cf-section mx-auto max-w-7xl px-6 border-t border-hairline">
      <div className="panel p-8 md:p-12 rounded-3xl border border-hairline/80 shadow-sm relative overflow-hidden">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-8 flex items-center gap-2">
          <span className="live-dot" aria-hidden />
          OUR PROVEN DELIVERY PROCESS // 05 PHASES
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 relative">
          {steps.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 relative">
              <div className="flex items-center gap-3 mb-1">
                <div className="text-xs text-signal bg-signal/10 border border-signal/30 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold">
                  {s.num}
                </div>
                <div className="text-sm font-semibold text-foreground tracking-tight">
                  {s.label}
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground pl-11 leading-relaxed">{s.caption}</p>
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
          <div key={group} className="panel p-6 flex flex-col gap-4 rounded-2xl border border-hairline/80 hover-lift">
            <div className="text-xs font-semibold uppercase tracking-wider text-signal border-b border-hairline pb-3">
              {group}
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li
                  key={s}
                  tabIndex={0}
                  data-tip={toolRoles[s] ?? "Production standard tool."}
                  className="tip text-xs px-2.5 py-1 rounded-md border border-hairline text-foreground/80 hover:border-signal/60 hover:text-signal transition-colors cursor-default bg-signal/[0.02]"
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
      <div className="panel p-10 md:p-16 lg:p-20 relative overflow-hidden rounded-3xl border border-hairline/80 shadow-xl">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" aria-hidden />
        <div className="absolute -top-20 -right-20 h-[350px] w-[350px] bg-signal/15 blur-[90px] rounded-full pointer-events-none" aria-hidden />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" aria-hidden />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 z-10">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-signal mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              READY TO SCALE // ACCEPTING NEW ENGAGEMENTS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              Start your next project with TechVRS.
              <br />
              <span className="text-signal">We'll respond with a scoped proposal,</span>
              <br />
              not a generic pitch.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              Whether you need a full web platform, a conversion-focused redesign, organic search dominance,
              or secure enterprise AI automation — let's review your goals and architect the right roadmap.
            </p>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <Magnetic>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-wider inline-flex items-center justify-center gap-3 bg-signal text-signal-foreground px-8 py-5 rounded-xl font-semibold hover:shadow-[0_0_50px_-5px_var(--signal)] transition-all whitespace-nowrap"
              >
                Start a project →
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/demos"
                className="text-xs uppercase tracking-wider inline-flex items-center justify-center gap-3 border border-hairline text-muted-foreground px-8 py-4 rounded-xl hover:border-signal/60 hover:text-signal transition-all whitespace-nowrap"
              >
                Explore Live Demos ↗
              </Link>
            </Magnetic>
            <Link
              to="/contact"
              className="text-xs tracking-wide inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-signal transition-colors whitespace-nowrap"
            >
              <span className="live-dot" aria-hidden />
              Free technical consultation — request yours →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
