import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site-chrome";
import { AnimatedCounter } from "@/components/micro-interactions";
import { skills } from "@/content/site-data";
import {
  IconSecureGlobe,
  IconEye,
  IconSignal,
  IconAISecure,
  IconCheck,
} from "@/components/icons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — TechVRS | Digital Agency & Technology Partner" },
      {
        name: "description",
        content:
          "TechVRS is a modern digital agency helping businesses build high-performance web applications, design conversion-driven digital experiences, grow organic search visibility, and deploy secure AI solutions.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://techvrs.com/about" },
      { property: "og:title", content: "About Us — TechVRS | Digital Agency & Technology Partner" },
      {
        property: "og:description",
        content:
          "TechVRS is a modern digital agency helping businesses build high-performance web applications, design conversion-driven digital experiences, grow organic search visibility, and deploy secure AI solutions.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "About TechVRS — Digital Agency" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Us — TechVRS | Digital Agency & Technology Partner" },
      {
        name: "twitter:description",
        content:
          "TechVRS is a modern digital agency helping businesses build high-performance web applications, design conversion-driven digital experiences, grow organic search visibility, and deploy secure AI solutions.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "About TechVRS — Digital Agency" },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { value: "99.9%", label: "Uptime standard" },
  { value: "95+",   label: "Core Web Vitals target" },
  { value: "100%",  label: "Audit log integrity" },
  { value: "<1.2s", label: "Mobile LCP threshold" },
];

const CORE_CAPABILITIES = [
  {
    Icon: IconSecureGlobe,
    title: "Web Development",
    body: "Modern React and Next.js applications engineered for speed, clean architecture, and modular scalability.",
    accent: "#0891b2",
  },
  {
    Icon: IconEye,
    title: "Web Design & UI/UX",
    body: "Conversion-optimized landing pages, design systems, and responsive interfaces that establish brand authority.",
    accent: "#d97706",
  },
  {
    Icon: IconSignal,
    title: "Secure & Growth SEO",
    body: "Deep technical audits, crawl budget optimization, Core Web Vitals, and structured data paired with search intent strategy.",
    accent: "#16a34a",
  },
  {
    Icon: IconAISecure,
    title: "AI Security & Solutions",
    body: "Custom AI workflows and autonomous agents engineered with data privacy, scoped permissions, and resilient guardrails.",
    accent: "#7c3aed",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

      {/* ── Page header ── */}
      <SectionLabel>ABOUT TECHVRS</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
        Digital experiences built to perform,{" "}
        <span className="accent-shift">rank, and scale.</span>
      </h1>

      {/* ── Stats strip ── */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="glass-card brackets p-5 text-center"
            style={{ position: "relative", animationDelay: `${i * 0.08}s` }}
          >
            <span className="b-tr" /><span className="b-bl" />
            <div className="font-display text-3xl md:text-4xl font-bold text-signal leading-none mb-2 count-glow">
              <AnimatedCounter value={s.value} />
            </div>
            <div className="mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main overview ── */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6 text-foreground/85 leading-relaxed">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              What TechVRS Is
            </h2>
            <p className="flip-text text-[1.05rem] text-muted-foreground leading-relaxed">
              TechVRS is a modern digital agency helping businesses build, grow, secure, and optimize
              their digital presence. We operate at the intersection of creative UI/UX design, modern full-stack
              engineering, technical SEO, and enterprise AI automation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              The Problems We Solve
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most businesses face a fragmented digital ecosystem: marketing sites that are slow and insecure,
              beautiful designs that fail to convert, SEO strategies disconnected from site architecture, and AI
              initiatives that risk data privacy. We unify these disciplines into a single delivery system.
            </p>
          </div>

          {/* Pillars split */}
          <div className="grid sm:grid-cols-2 gap-4 my-2">
            <div className="panel brackets p-5 flex flex-col gap-2.5" style={{ position: "relative" }}>
              <span className="b-tr" /><span className="b-bl" />
              <div className="flex items-center gap-2">
                <span className="text-signal"><IconSecureGlobe size={16} /></span>
                <span className="mono text-[10px] uppercase tracking-widest text-signal font-semibold">
                  Development &amp; Design
                </span>
              </div>
              <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <li>• High-performance React &amp; Next.js builds</li>
                <li>• Design systems &amp; responsive UI/UX</li>
                <li>• Headless CMS &amp; modern API integrations</li>
              </ul>
            </div>

            <div className="panel brackets p-5 flex flex-col gap-2.5" style={{ position: "relative" }}>
              <span className="b-tr" /><span className="b-bl" />
              <div className="flex items-center gap-2">
                <span className="text-signal"><IconSignal size={16} /></span>
                <span className="mono text-[10px] uppercase tracking-widest text-signal font-semibold">
                  SEO &amp; Secure AI
                </span>
              </div>
              <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <li>• Technical SEO &amp; Core Web Vitals optimization</li>
                <li>• Search intent &amp; authority growth campaigns</li>
                <li>• Custom AI agents with privacy guardrails</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Our Agency Philosophy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in <strong>"Secure by Design"</strong> and <strong>"Fast by Architecture"</strong>.
              Security and performance are not final checklists tacked onto a project right before launch — they
              are the fundamental structural criteria that inform every wireframe, component, and cloud configuration we ship.
            </p>
          </div>

          <blockquote
            className="pl-6 py-4 mono text-base italic text-foreground/90 relative"
            style={{
              borderLeft: "2px solid var(--signal)",
              background: "linear-gradient(90deg, rgba(2,132,199,0.06), transparent)",
              backdropFilter: "blur(4px)",
            }}
          >
            "From the first pixel to organic search visibility and secure AI workflows, TechVRS builds digital systems designed for real, measurable business growth."
          </blockquote>

          <div className="mt-2 flex flex-wrap gap-4">
            <Link
              to="/work"
              className="mono text-[11px] uppercase tracking-widest bg-signal text-signal-foreground px-6 py-3.5 hover:shadow-[0_0_36px_-5px_var(--signal)] transition-shadow inline-flex items-center gap-2"
            >
              Explore our work →
            </Link>
            <Link
              to="/contact"
              className="mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-6 py-3.5 hover:bg-signal/10 transition-colors inline-flex items-center gap-2"
            >
              Start a project →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Company identity card */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-3 flex items-center gap-2">
              <span className="live-dot" aria-hidden />
              AGENCY PROFILE
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">
              TechVRS Digital Agency
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Providing digital engineering, UI/UX design, technical SEO, and secure AI automation for growing businesses worldwide.
            </p>
            <div className="border-t border-hairline pt-3 flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Specialization:</span>
                <span className="text-foreground">Full-Service Digital</span>
              </div>
              <div className="flex justify-between">
                <span>Stack:</span>
                <span className="text-foreground">React · Next.js · TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span>Standards:</span>
                <span className="text-foreground">OWASP · Core Web Vitals</span>
              </div>
            </div>
          </div>

          {/* Technical founder credibility note (secondary) */}
          <div className="glass-card brackets p-6" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-2 flex items-center gap-2">
              <span className="pulse-dot" aria-hidden />
              FOUNDED ON ENGINEERING RIGOR
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Founded by technical security and web engineers, TechVRS was built to bring production-grade
              resilience, speed, and privacy discipline to client websites, search strategies, and modern AI implementations.
            </p>
          </div>

          {/* Direct channels */}
          <div
            className="glass-card brackets p-6 flex flex-col gap-3"
            style={{ position: "relative" }}
          >
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[10px] uppercase tracking-widest text-signal mb-1">
              CONNECT WITH US
            </div>
            {[
              { label: "hello@techvrs.com", href: "mailto:hello@techvrs.com" },
              { label: "LinkedIn Company", href: "https://www.linkedin.com/in/mdtarek404/" },
              { label: "GitHub Open Source", href: "https://github.com/tareksec" },
              { label: "Medium Field Notes", href: "https://medium.com/@mdtareksec" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="mono text-[11px] text-muted-foreground hover:text-signal transition-colors flex items-center gap-2"
              >
                <span className="text-signal opacity-60">↗</span>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four core capabilities ── */}
      <div className="mt-24">
        <SectionLabel>CORE CAPABILITIES</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
          Four disciplines. <span className="text-signal">One delivery standard.</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CORE_CAPABILITIES.map((d) => (
            <div
              key={d.title}
              className="glass-card brackets p-7 flex flex-col gap-4 hover-lift"
              style={{ position: "relative" }}
            >
              <span className="b-tr" /><span className="b-bl" />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${d.accent}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: d.accent,
                  border: `1px solid ${d.accent}33`,
                }}
              >
                <d.Icon size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills matrix ── */}
      <div className="mt-24">
        <SectionLabel>TECHNOLOGY ECOSYSTEM</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
          The technology stack, <span className="text-signal">curated.</span>
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([group, items]) => (
            <div
              key={group}
              className="glass-card brackets p-5 flex flex-col gap-4"
              style={{ position: "relative" }}
            >
              <span className="b-tr" /><span className="b-bl" />
              <div className="mono text-[10px] uppercase tracking-widest text-signal border-b border-hairline pb-3">
                {group}
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="mono text-[11px] px-2.5 py-1.5 border border-hairline text-foreground/75 hover:border-signal/50 hover:text-signal transition-colors cursor-default"
                    style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
