import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site-chrome";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  Gauge, 
  Zap, 
  Factory, 
  Layers, 
  Search,
  Check
} from "lucide-react";

export const Route = createFileRoute("/tasneem-knit-industry")({
  head: () => ({
    meta: [
      { title: "Tasneem Knit Industry — B2B Digital Platform Case Study | TechVRS" },
      {
        name: "description",
        content:
          "How TechVRS engineered a high-speed digital catalog, technical SEO engine, and Core Web Vitals optimization for Tasneem Knit Industry, Bangladesh's leading circular knitting machinery supplier.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://techvrs.com/tasneem-knit-industry" },
      { property: "og:title", content: "Tasneem Knit Industry — B2B Digital Platform Case Study | TechVRS" },
      {
        property: "og:description",
        content:
          "Engineering a high-performance web architecture and B2B technical SEO for Tasneem Knit Industry in Bangladesh's industrial textile machinery sector.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS × Tasneem Knit Industry" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tasneem Knit Industry — B2B Digital Platform Case Study | TechVRS" },
      {
        name: "twitter:description",
        content:
          "Engineering a high-performance web architecture and B2B technical SEO for Tasneem Knit Industry in Bangladesh's industrial textile machinery sector.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
    ],
  }),
  component: TasneemCaseStudyPage,
});

const METRICS = [
  { value: "1.1s", label: "Mobile LCP", sub: "Down from 5.2s (78.8% faster)" },
  { value: "80x", label: "Search Impressions", sub: "14,500+ monthly impressions" },
  { value: "19", label: "Top-3 Rankings", sub: "High-intent commercial queries" },
  { value: "12x", label: "Factory RFQ Leads", sub: "Verified procurement inquiries" },
];

const MACHINERY_CATEGORIES = [
  {
    title: "Single Jersey Circular Knitting Machines",
    specs: "High-speed 3/4-track cams, 20G–36G gauge, 30–38 inch diameter",
    description: "Engineered for plain jersey, pique, twill, and fleece fabrics with maximum yarn feed stability and automated oil mist lubrication.",
    link: "https://tasneemknitindustry.com/",
    anchorText: "Explore Single Jersey Machines",
  },
  {
    title: "Double Jersey Interlock & Rib Machines",
    specs: "Rib & interlock dual gating, 14G–28G gauge, high thermal dissipation",
    description: "Heavy-duty frames designed for dimensional fabric stability, high GSM winter fabrics, thermal wear, and elastane rib knits.",
    link: "https://tasneemknitindustry.com/",
    anchorText: "View Double Jersey Catalog",
  },
  {
    title: "Electronic Jacquard Knitting Systems",
    specs: "Computerized actuator needle selection, 3-way patterning",
    description: "Precision pattern-controlled machinery for advanced structured knitwear, mesh ventilation textiles, and custom garment designs.",
    link: "https://tasneemknitindustry.com/",
    anchorText: "Inspect Jacquard Equipment",
  },
  {
    title: "Dyeing & Textile Finishing Machinery",
    specs: "Low liquor ratio, energy-efficient inverter drives, high-temp steamers",
    description: "Industrial finishing equipment engineered to reduce water and power consumption while ensuring uniform dye absorption.",
    link: "https://tasneemknitindustry.com/",
    anchorText: "Discover Finishing Systems",
  },
];

const TECHNICAL_DELIVERABLES = [
  {
    icon: Zap,
    title: "Edge-Rendered Sub-Second Architecture",
    detail: "Static pre-rendering deployed across global edge networks ensures factory managers in Gazipur, Narayanganj, and Savar experience instant load times even on constrained 4G mobile connections.",
  },
  {
    icon: Search,
    title: "Semantic Schema.org Product Graphs",
    detail: "Embedded structured JSON-LD schemas mapping machine diameters, needle gauges, and power ratings into Google's Knowledge Graph for direct AI and search crawler extraction.",
  },
  {
    icon: Gauge,
    title: "Flawless Core Web Vitals (99+ Lighthouse)",
    detail: "Zero layout shift (CLS 0.00), responsive WebP media pipeline, and main-thread CPU optimization resulting in green performance scores across all diagnostic parameters.",
  },
  {
    icon: Factory,
    title: "B2B Frictionless Conversion Pathways",
    detail: "Direct RFQ (Request for Quote) pathways mapping each machinery SKU to WhatsApp and email procurement channels, collapsing the sales cycle for plant directors.",
  },
];

function TasneemCaseStudyPage() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CaseStudy",
        "@id": "https://techvrs.com/tasneem-knit-industry#case-study",
        "name": "Tasneem Knit Industry B2B Platform & Technical SEO Case Study",
        "headline": "How We Engineered a High-Performance Digital Platform for Tasneem Knit Industry",
        "url": "https://techvrs.com/tasneem-knit-industry",
        "description": "Comprehensive B2B case study detailing TechVRS's technical engineering, Core Web Vitals optimization, and enterprise SEO pipeline for Tasneem Knit Industry in Bangladesh.",
        "author": {
          "@type": "Organization",
          "name": "TechVRS",
          "url": "https://techvrs.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "TechVRS",
          "url": "https://techvrs.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://techvrs.com/hero-main.png"
          }
        },
        "about": {
          "@type": "Organization",
          "name": "Tasneem Knit Industry",
          "url": "https://tasneemknitindustry.com/",
          "description": "Premier industrial textile machinery and circular knitting machine supplier in Bangladesh.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Bangladesh"
          }
        },
        "mentions": [
          {
            "@type": "Product",
            "name": "Industrial Circular Knitting Machine",
            "category": "Industrial Textile Machinery",
            "offers": {
              "@type": "Offer",
              "url": "https://tasneemknitindustry.com/"
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── Breadcrumb & Back ── */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link to="/work" className="hover:text-foreground transition-colors">Work</Link>
        <span>/</span>
        <span className="text-signal">Tasneem Knit Industry</span>
      </div>

      {/* ── Hero Section ── */}
      <div className="mb-14">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <SectionLabel>CLIENT SPOTLIGHT &amp; CASE STUDY</SectionLabel>
          <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 flex items-center gap-1.5">
            <span className="live-dot" aria-hidden />
            Production Deployed
          </span>
        </div>

        <h1 className="flip-fade-text font-display text-4xl sm:text-5xl md:text-6xl font-extrabold max-w-5xl tracking-tight leading-[1.12]">
          Engineering Bangladesh's premier digital platform for{" "}
          <span className="text-signal">Tasneem Knit Industry</span>.
        </h1>

        <p className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          How TechVRS architected an ultra-fast web catalog, semantic product schema system, and technical SEO engine for Bangladesh's leading industrial textile and circular knitting machinery supplier.
        </p>

        {/* Live Client Action Row */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://tasneemknitindustry.com/"
            target="_blank"
            rel="dofollow noopener"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold bg-signal text-signal-foreground px-6 py-3.5 rounded-xl hover:opacity-95 shadow-lg shadow-signal/20 transition-all"
          >
            Visit Tasneem Knit Industry Live Portal
            <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            to="/blog"
            search={{ article: "how-we-engineered-a-high-performance-digital-platform-for-tasneem-knit-industry" }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-hairline px-6 py-3.5 rounded-xl hover:bg-hairline/40 transition-colors text-muted-foreground hover:text-foreground"
          >
            Read In-Depth Technical Case Study
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Key Metrics Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
        {METRICS.map((m, idx) => (
          <div 
            key={idx}
            className="glass-card p-6 sm:p-7 rounded-2xl border border-signal/25 bg-gradient-to-br from-signal/[0.04] to-transparent"
          >
            <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-signal tracking-tight">
              {m.value}
            </div>
            <div className="mt-2 text-xs sm:text-sm font-semibold text-foreground">
              {m.label}
            </div>
            <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground font-mono">
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── Client Overview & Problem Statement ── */}
      <div className="grid md:grid-cols-12 gap-10 items-start mb-20 pb-16 border-b border-hairline/80">
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-signal font-semibold">
            01 / The Challenge
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold leading-snug">
            Bridging heavy industry with modern search discovery.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Ready-Made Garment (RMG) sector is Bangladesh's economic powerhouse, requiring hundreds of thousands of high-precision circular knitting and dyeing machines. While factory managers increasingly rely on online search to find suppliers, the machinery market remained trapped in legacy offline networks and unindexed websites.
          </p>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-hairline/80 space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-signal" />
              Prior System Bottlenecks Identified
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0" />
                <span><strong>Unindexed PDF Catalogs:</strong> Detailed machine specifications were stored in bulky PDFs that Google search crawlers couldn't index or parse for search queries.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0" />
                <span><strong>5.2s Mobile Latency:</strong> Factory engineers accessing specifications on mobile connections in industrial belts experienced severe load drops.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0" />
                <span><strong>Zero Schema Markup:</strong> Search engines had no structured understanding of product models, cylinder diameters, or supplier geographic authority in Bangladesh.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Technical Solutions Engineered ── */}
      <div className="mb-20">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-signal font-semibold">
            02 / TechVRS Solution
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
            The Technical Architecture Blueprint
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A full-stack, performance-first re-engineering designed specifically for Core Web Vitals speed, search crawler understanding, and B2B quote inquiries.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {TECHNICAL_DELIVERABLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="glass-card p-7 sm:p-8 rounded-2xl border border-hairline/80 hover:border-signal/40 transition-all space-y-3 bg-background/50 hover:bg-background/80"
              >
                <div className="w-10 h-10 rounded-xl bg-signal/10 border border-signal/30 flex items-center justify-center text-signal">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Featured Machinery Portfolio Section ── */}
      <div className="mb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hairline/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-signal font-semibold">
              03 / Product Showcase
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Optimized Machinery Categories
            </h2>
          </div>
          <a
            href="https://tasneemknitindustry.com/"
            target="_blank"
            rel="dofollow noopener"
            className="text-xs uppercase font-semibold text-signal flex items-center gap-1 hover:underline"
          >
            View Complete Catalog on Tasneem Knit Industry ↗
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {MACHINERY_CATEGORIES.map((cat, idx) => (
            <div 
              key={idx}
              className="glass-card p-6 sm:p-7 rounded-2xl border border-hairline/80 flex flex-col justify-between gap-5 bg-gradient-to-b from-background/70 to-background/40"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-muted/40 border border-hairline text-muted-foreground">
                  Textile Machinery
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mt-2.5">
                  {cat.title}
                </h3>
                <p className="text-xs font-mono text-signal mt-1">
                  {cat.specs}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-hairline/60">
                <a
                  href={cat.link}
                  target="_blank"
                  rel="dofollow noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal uppercase tracking-wider hover:opacity-85 transition-opacity"
                >
                  {cat.anchorText}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Authority Backlink Hub Card ── */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-signal/40 bg-gradient-to-br from-signal/[0.08] via-signal/[0.02] to-transparent mb-20 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs uppercase font-mono tracking-wider text-signal font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Official Supplier Partnership &amp; Backlink Hub
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
            Looking for Industrial Circular Knitting Machinery Suppliers in Bangladesh?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            TechVRS proudly endorses <a href="https://tasneemknitindustry.com/" target="_blank" rel="dofollow noopener" className="text-signal underline font-semibold">Tasneem Knit Industry</a> as a premier supplier of high-speed circular knitting machines, single &amp; double jersey knitting solutions, and textile plant machinery in Bangladesh.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://tasneemknitindustry.com/"
              target="_blank"
              rel="dofollow noopener"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold bg-signal text-signal-foreground px-6 py-3.5 rounded-xl hover:opacity-95 shadow-md shadow-signal/20 transition-all"
            >
              Visit Tasneem Knit Industry Official Site
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-hairline px-6 py-3.5 rounded-xl hover:bg-hairline/40 transition-colors text-foreground"
            >
              Build Your Enterprise B2B Platform With TechVRS
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
