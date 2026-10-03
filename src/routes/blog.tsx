import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionLabel } from "@/components/site-chrome";
import publishedPostsData from "@/content/published-posts.json";
import { ArticleReaderModal, PublishedArticle } from "@/components/article-reader-modal";

const MEDIUM_FEED = "https://medium.com/feed/@mdtareksec";

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories?: string[];
  thumbnail?: string;
}

interface Rss2JsonResponse {
  status: string;
  items: RssItem[];
}

async function fetchFeed(): Promise<RssItem[]> {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Feed fetch failed");
  const data = (await res.json()) as Rss2JsonResponse;
  if (data.status !== "ok") throw new Error("Feed returned non-ok status");
  return data.items;
}

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function readTime(html?: string) {
  const text = stripHtml(html);
  const words = text ? text.split(" ").length : 0;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights & Field Notes — TechVRS | Engineering, SEO, UI/UX & AI" },
      {
        name: "description",
        content:
          "Engineering breakdowns, technical SEO strategies, UI/UX insights, and secure AI tutorials from the TechVRS agency team.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "TechVRS" },
      { property: "og:type", content: "blog" },
      { property: "og:url", content: "https://techvrs.com/blog" },
      { property: "og:title", content: "Insights & Field Notes — TechVRS | Engineering, SEO, UI/UX & AI" },
      {
        property: "og:description",
        content:
          "Engineering breakdowns, technical SEO strategies, UI/UX insights, and secure AI tutorials from the TechVRS agency team.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "TechVRS Insights — Engineering, SEO, UI/UX & AI" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Insights & Field Notes — TechVRS | Engineering, SEO, UI/UX & AI" },
      {
        name: "twitter:description",
        content:
          "Engineering breakdowns, technical SEO strategies, UI/UX insights, and secure AI tutorials from the TechVRS agency team.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "TechVRS Insights — Engineering, SEO, UI/UX & AI" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [activePost, setActivePost] = useState<PublishedArticle | null>(null);
  const localPosts = (publishedPostsData as PublishedArticle[]) || [];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["medium-feed"],
    queryFn: fetchFeed,
    staleTime: 1000 * 60 * 30,
  });

  const featuredPost = localPosts[0] || null;
  const remainingLocalPosts = localPosts.slice(1);

  // Deep-link support: open article modal if ?article=slug is present in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const articleSlug = params.get("article");
      if (articleSlug) {
        const found = localPosts.find((p) => p.slug === articleSlug);
        if (found) {
          setActivePost(found);
        }
      }
    }
  }, [localPosts]);

  const handleOpenArticle = (post: PublishedArticle) => {
    setActivePost(post);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("article", post.slug);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleCloseArticle = () => {
    setActivePost(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("article");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Structured Schema Markup (JSON-LD) connecting TechVRS & Tasneem Knit Industry for SEO, GEO & AEO
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://techvrs.com/blog#tasneem-knit-industry-case-study",
        "headline": "How We Engineered a High-Performance Digital Platform for Tasneem Knit Industry (B2B SEO Case Study)",
        "name": "How We Engineered a High-Performance Digital Platform for Tasneem Knit Industry (B2B SEO Case Study)",
        "description": "A technical B2B case study on how TechVRS engineered a high-speed web architecture, structured schema catalog, and technical SEO engine for Tasneem Knit Industry in Bangladesh.",
        "url": "https://techvrs.com/blog?article=how-we-engineered-a-high-performance-digital-platform-for-tasneem-knit-industry",
        "datePublished": "2026-10-03T08:00:00+06:00",
        "dateModified": "2026-10-03T08:00:00+06:00",
        "inLanguage": "en-US",
        "articleSection": "B2B Technical Case Study",
        "keywords": [
          "industrial circular knitting machine suppliers",
          "circular knitting machine Bangladesh",
          "textile machinery supplier Dhaka",
          "Tasneem Knit Industry",
          "B2B technical SEO",
          "Core Web Vitals case study",
          "TechVRS"
        ],
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
        "about": [
          {
            "@type": "Organization",
            "name": "Tasneem Knit Industry",
            "url": "https://tasneemknitindustry.com/",
            "description": "Leading industrial circular knitting and textile machinery supplier in Bangladesh.",
            "areaServed": {
              "@type": "Country",
              "name": "Bangladesh"
            }
          }
        ],
        "mentions": [
          {
            "@type": "Organization",
            "name": "Tasneem Knit Industry",
            "url": "https://tasneemknitindustry.com/"
          },
          {
            "@type": "Product",
            "name": "Industrial Circular Knitting Machine",
            "category": "Industrial Textile Machinery",
            "description": "High-speed single jersey, double jersey, and jacquard circular knitting machinery for textile garment factories.",
            "offers": {
              "@type": "Offer",
              "url": "https://tasneemknitindustry.com/"
            }
          }
        ],
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://techvrs.com/blog?article=how-we-engineered-a-high-performance-digital-platform-for-tasneem-knit-industry"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://techvrs.com/blog#tasneem-faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why do industrial circular knitting machine suppliers in Bangladesh need technical SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Factory procurement directors and textile production managers actively search online for specific machinery models, cylinder diameters, and gauge specifications. Technical SEO and schema markup ensure supplier catalogs appear at the top of Google Search when high-budget procurement decisions are made."
            }
          },
          {
            "@type": "Question",
            "name": "Where can Bangladeshi textile factories source high-performance circular knitting machinery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Factory owners can browse verified industrial machinery specifications and request quotes directly through Tasneem Knit Industry (https://tasneemknitindustry.com/), which supplies single jersey, double jersey, and specialized knit machines nationwide."
            }
          },
          {
            "@type": "Question",
            "name": "How does Core Web Vitals optimization improve B2B inquiry conversions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Industrial decision-makers frequently access sites on mobile networks in factory zones. Reducing page load times from 5.2 seconds down to 1.1 seconds eliminates bounce rates, ensuring prospective buyers seamlessly navigate specifications and submit RFQ inquiries."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── Header ── */}
      <SectionLabel>AGENCY INSIGHTS &amp; FIELD NOTES</SectionLabel>
      <h1 className="flip-fade-text font-display text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl tracking-tight leading-[1.15]">
        Engineering insights &amp; <span className="accent-shift">architectural field notes.</span>
      </h1>
      <p className="flip-text mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Production breakdowns on modern full-stack web architectures, Core Web Vitals, conversion UX, and enterprise AI security — authored by the TechVRS engineering team.
      </p>

      {/* ── TechVRS Publications (Published via GitHub Daily Workflow) ── */}
      {localPosts.length > 0 && (
        <section className="mt-14 mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-hairline/80">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-signal border border-signal/40 px-3 py-1 rounded-full bg-signal/10 inline-flex items-center gap-1.5">
                <span className="live-dot" aria-hidden />
                TechVRS Research Dispatches
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-3">
                Original Architecture Breakdowns
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              Auto-published daily at 12:00 PM BST · {localPosts.length} post{localPosts.length > 1 ? "s" : ""} published
            </span>
          </div>

          {/* Featured Article Card */}
          {featuredPost && (
            <div 
              onClick={() => handleOpenArticle(featuredPost)}
              className="glass-card group flex flex-col lg:flex-row gap-0 mb-8 overflow-hidden hover-lift rounded-3xl border border-signal/30 shadow-lg cursor-pointer bg-gradient-to-br from-signal/[0.04] to-transparent hover:border-signal/60 transition-all"
            >
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider border border-signal/40 text-signal px-2.5 py-0.5 rounded-md flex items-center gap-1.5 bg-signal/15">
                      <span className="live-dot" aria-hidden />
                      LATEST PUBLICATION
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider border border-hairline px-2.5 py-0.5 rounded-md bg-muted/40 text-muted-foreground">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {fmtDate(featuredPost.date || featuredPost.publishedAt || "")} · {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight group-hover:text-signal transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3 text-sm sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline/80">
                  <div className="flex items-center gap-2">
                    {featuredPost.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-muted/30 border border-hairline text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-signal flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read Full Technical Analysis
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>

              {/* Decorative side accent banner */}
              <div
                className="hidden lg:flex w-72 flex-col items-center justify-center p-8 gap-5 shrink-0"
                style={{
                  background: "linear-gradient(160deg, rgba(2,132,199,0.12), rgba(14,165,233,0.04))",
                  borderLeft: "1px solid rgba(2,132,199,0.2)",
                }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-signal/90 text-center font-mono">
                  TECHVRS LAB DISPATCH
                </div>
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "rgba(2,132,199,0.15)",
                    border: "1px solid rgba(2,132,199,0.3)",
                  }}
                >
                  <span className="text-signal text-3xl font-bold">✦</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground text-center">
                  SEO · GEO · AEO Verified
                </div>
              </div>
            </div>
          )}

          {/* Remaining Local Articles Grid */}
          {remainingLocalPosts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingLocalPosts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => handleOpenArticle(post)}
                  className="glass-card hover-lift flex flex-col gap-4 p-6 sm:p-7 group rounded-2xl border border-hairline/80 cursor-pointer transition-all hover:border-signal/50 bg-background/50 hover:bg-background/80"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{fmtDate(post.date || post.publishedAt || "")}</span>
                    <span className="text-signal font-semibold">{post.readTime}</span>
                  </div>

                  <span className="text-[10px] w-fit font-semibold uppercase tracking-wider text-signal border border-signal/30 px-2.5 py-0.5 rounded-md bg-signal/[0.05]">
                    {post.category}
                  </span>

                  <h4 className="font-display text-[1.1rem] font-bold leading-snug group-hover:text-signal transition-colors flex-1">
                    {post.title}
                  </h4>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-hairline flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-signal flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Breakdown →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Professional Article Reader Modal */}
      <ArticleReaderModal 
        article={activePost} 
        onClose={handleCloseArticle} 
      />

      {/* Live status strip */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="live-dot" aria-hidden />
          Live Medium feed — @mdtareksec
        </div>
        <a
          href="https://medium.com/@mdtareksec"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold uppercase tracking-wider text-signal border border-signal/40 px-3.5 py-1.5 rounded-full hover:bg-signal/10 transition-colors"
        >
          Follow on Medium ↗
        </a>
      </div>

      <div className="mt-12">
        {isLoading && <LoadingSkeleton />}

        {isError && (
          <div className="glass-card p-8 rounded-2xl border border-hairline/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-critical mb-2">
              FEED ERROR
            </div>
            <p className="text-muted-foreground">
              Could not reach the Medium RSS relay. Read our published articles directly on{" "}
              <a
                href="https://medium.com/@mdtareksec"
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline font-semibold"
              >
                Medium
              </a>
              .
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Featured post — first item gets a hero card */}
            {data[0] && (
              <a
                href={data[0].link}
                target="_blank"
                rel="noreferrer"
                className="glass-card group flex flex-col md:flex-row gap-0 mb-8 overflow-hidden hover-lift rounded-3xl border border-hairline/80 shadow-md"
              >
                <div className="flex-1 p-8 md:p-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider border border-signal/40 text-signal px-2.5 py-0.5 rounded-md flex items-center gap-1.5 bg-signal/10">
                      <span className="live-dot" aria-hidden />
                      LATEST INSIGHT
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {fmtDate(data[0].pubDate)} · {readTime(data[0].description)}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-snug group-hover:text-signal transition-colors">
                    {data[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 text-[0.95rem]">
                    {stripHtml(data[0].description).slice(0, 240)}…
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-2">
                    {data[0].categories?.[0] && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-signal border border-signal/40 px-2.5 py-1 rounded-md bg-signal/[0.04]">
                        {data[0].categories[0]}
                      </span>
                    )}
                    <span className="text-xs font-semibold uppercase tracking-wider text-signal flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read on Medium
                      <span className="group-hover:translate-x-1 transition-transform inline-block">↗</span>
                    </span>
                  </div>
                </div>
                {/* Decorative sidebar accent */}
                <div
                  className="hidden md:flex w-64 flex-col items-center justify-center p-10 gap-6 shrink-0"
                  style={{
                    background: "linear-gradient(160deg, rgba(2,132,199,0.08), rgba(14,165,233,0.04))",
                    borderLeft: "1px solid rgba(2,132,199,0.15)",
                  }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-signal/80 text-center">
                    EDITORIAL FEATURE
                  </div>
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner"
                    style={{
                      background: "rgba(2,132,199,0.10)",
                      border: "1px solid rgba(2,132,199,0.25)",
                    }}
                  >
                    <span className="text-signal text-2xl font-bold">✦</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground text-center">
                    {readTime(data[0].description)} read
                  </div>
                </div>
              </a>
            )}

            {/* Rest of articles grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.slice(1, 10).map((item, i) => (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card hover-lift flex flex-col gap-4 p-6 group rounded-2xl border border-hairline/80"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="text-xs text-muted-foreground font-mono">
                    {fmtDate(item.pubDate)} · {readTime(item.description)}
                  </div>

                  <h3 className="font-display text-[1.05rem] font-semibold leading-snug group-hover:text-signal transition-colors flex-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {stripHtml(item.description).slice(0, 160)}…
                  </p>

                  <div className="mt-auto pt-4 border-t border-hairline flex items-center justify-between">
                    {item.categories?.[0] ? (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-signal border border-signal/35 px-2.5 py-0.5 rounded-md bg-signal/[0.04]">
                        {item.categories[0]}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs font-semibold uppercase tracking-wider text-signal flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-16 text-center">
              <a
                href="https://medium.com/@mdtareksec"
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider font-semibold border border-signal/60 text-signal px-8 py-4 rounded-xl hover:bg-signal hover:text-signal-foreground transition-all inline-flex items-center gap-2"
              >
                View full archive on Medium ↗
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="text-xs font-semibold uppercase tracking-wider text-signal mb-6 flex items-center gap-3">
        <span className="pulse-dot" aria-hidden />
        FETCHING LATEST ARTICLES...
      </div>
      {/* Featured skeleton */}
      <div className="glass-card p-10 mb-8 h-48 animate-pulse rounded-3xl border border-hairline/80">
        <div className="h-3 w-24 bg-hairline mb-4 rounded" />
        <div className="h-7 w-2/3 bg-hairline mb-3 rounded" />
        <div className="h-3 w-full bg-hairline mb-2 rounded" />
        <div className="h-3 w-5/6 bg-hairline rounded" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass-card p-6 h-56 animate-pulse rounded-2xl border border-hairline/80">
            <div className="h-3 w-1/3 bg-hairline mb-4 rounded" />
            <div className="h-5 w-3/4 bg-hairline mb-3 rounded" />
            <div className="h-3 w-full bg-hairline mb-2 rounded" />
            <div className="h-3 w-5/6 bg-hairline rounded" />
          </div>
        ))}
      </div>
    </>
  );
}
