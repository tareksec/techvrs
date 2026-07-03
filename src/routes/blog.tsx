import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionLabel } from "@/components/site-chrome";

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
      { title: "Field Notes — techvrs | Security & Engineering Blog" },
      {
        name: "description",
        content:
          "Detection walkthroughs, hardening guides, and lessons from building secure systems — SIEM rules, TLS configs, and LLM security. Published on Medium, cross-posted here.",
      },
      // ── Open Graph ───────────────────────────────────────────────────────
      { property: "og:site_name", content: "techvrs" },
      { property: "og:type", content: "blog" },
      { property: "og:url", content: "https://techvrs.com/blog" },
      { property: "og:title", content: "Field Notes — techvrs | Security & Engineering Blog" },
      {
        property: "og:description",
        content:
          "Detection walkthroughs, hardening guides, and lessons from building secure systems — SIEM rules, TLS configs, and LLM security.",
      },
      { property: "og:image", content: "https://techvrs.com/hero-main.png" },
      { property: "og:image:alt", content: "techvrs Field Notes — Notes from the console" },
      // ── Twitter / X ──────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Field Notes — techvrs | Security & Engineering Blog" },
      {
        name: "twitter:description",
        content:
          "Detection walkthroughs, hardening guides, and lessons from building secure systems — SIEM rules, TLS configs, and LLM security.",
      },
      { name: "twitter:image", content: "https://techvrs.com/hero-main.png" },
      { name: "twitter:image:alt", content: "techvrs Field Notes — Notes from the console" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Field Notes — techvrs",
          url: "https://techvrs.com/blog",
          description:
            "Detection walkthroughs, hardening guides, and lessons from building secure systems.",
          author: {
            "@type": "Person",
            name: "Tarek",
            url: "https://techvrs.com/",
            sameAs: ["https://medium.com/@mdtareksec"],
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://techvrs.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://techvrs.com/blog" },
            ],
          },
        }),
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["medium-feed"],
    queryFn: fetchFeed,
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

      {/* ── Header ── */}
      <SectionLabel>FIELD NOTES</SectionLabel>
      <h1 className="flip-fade-text font-display text-5xl md:text-6xl font-bold max-w-3xl">
        Notes <span className="accent-shift">from the console.</span>
      </h1>
      <p className="flip-text mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Write-ups on detection techniques, hardening walkthroughs, and lessons from
        building secure systems — published on Medium and mirrored here as they go live.
      </p>

      {/* Live status strip */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="live-dot" aria-hidden />
          Live Medium feed — @mdtareksec
        </div>
        <a
          href="https://medium.com/@mdtareksec"
          target="_blank"
          rel="noreferrer"
          className="mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-3 py-1.5 hover:bg-signal/10 transition-colors"
        >
          Follow on Medium ↗
        </a>
      </div>

      <div className="mt-12">
        {isLoading && <LoadingSkeleton />}

        {isError && (
          <div className="glass-card brackets p-8" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
            <div className="mono text-[11px] uppercase tracking-widest text-critical mb-2">
              FEED_ERROR // CONNECTION_LOST
            </div>
            <p className="text-muted-foreground">
              Could not reach the transmission relay. Read the archive directly on{" "}
              <a
                href="https://medium.com/@mdtareksec"
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline"
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
                className="glass-card brackets group flex flex-col md:flex-row gap-0 mb-8 overflow-hidden hover-lift"
                style={{ position: "relative" }}
              >
                <span className="b-tr" /><span className="b-bl" />
                <div className="flex-1 p-8 md:p-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="mono text-[10px] uppercase tracking-widest border border-signal/40 text-signal px-2 py-0.5 flex items-center gap-1.5">
                      <span className="live-dot" aria-hidden />
                      LATEST
                    </span>
                    <span className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {fmtDate(data[0].pubDate)} · {readTime(data[0].description)}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-snug group-hover:text-signal transition-colors">
                    {data[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 text-[0.95rem]">
                    {stripHtml(data[0].description).slice(0, 240)}…
                  </p>
                  <div className="mt-auto flex items-center gap-4">
                    {data[0].categories?.[0] && (
                      <span className="mono text-[10px] uppercase tracking-widest text-signal border border-signal/40 px-2 py-1">
                        {data[0].categories[0]}
                      </span>
                    )}
                    <span className="mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
                  <div className="mono text-[9px] uppercase tracking-widest text-signal opacity-60 text-center">
                    LATEST TRANSMISSION
                  </div>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(2,132,199,0.10)",
                      border: "1px solid rgba(2,132,199,0.25)",
                    }}
                  >
                    <span className="mono text-signal text-2xl">✦</span>
                  </div>
                  <div className="mono text-[9px] uppercase tracking-widest text-muted-foreground text-center">
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
                  className="glass-card brackets hover-lift flex flex-col gap-4 p-6 group"
                  style={{ position: "relative", animationDelay: `${i * 0.05}s` }}
                >
                  <span className="b-tr" /><span className="b-bl" />

                  <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
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
                      <span className="mono text-[10px] uppercase tracking-widest text-signal border border-signal/35 px-2 py-0.5">
                        {item.categories[0]}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="mono text-[10px] uppercase tracking-widest text-signal flex items-center gap-1 group-hover:gap-2 transition-all">
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
                className="mono text-[11px] uppercase tracking-widest border border-signal/60 text-signal px-8 py-4 hover:bg-signal hover:text-signal-foreground transition-colors inline-flex items-center gap-2"
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
      <div className="mono text-[11px] uppercase tracking-widest text-signal mb-6 flex items-center gap-3">
        <span className="pulse-dot" aria-hidden />
        FETCHING LATEST TRANSMISSIONS...
      </div>
      {/* Featured skeleton */}
      <div className="glass-card brackets p-10 mb-8 h-48 animate-pulse" style={{ position: "relative" }}>
        <span className="b-tr" /><span className="b-bl" />
        <div className="h-3 w-24 bg-hairline mb-4 rounded" />
        <div className="h-7 w-2/3 bg-hairline mb-3 rounded" />
        <div className="h-3 w-full bg-hairline mb-2 rounded" />
        <div className="h-3 w-5/6 bg-hairline rounded" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass-card brackets p-6 h-56 animate-pulse" style={{ position: "relative" }}>
            <span className="b-tr" /><span className="b-bl" />
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
