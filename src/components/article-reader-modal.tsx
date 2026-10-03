import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Clock, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Terminal, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Bookmark
} from "lucide-react";

export interface PublishedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags?: string[];
  content: string;
  publishedAt?: string;
}

interface ArticleReaderModalProps {
  article: PublishedArticle | null;
  onClose: () => void;
}

export function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!article) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [article, onClose]);

  // Handle scroll progress tracking
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      const progress = Math.min(100, Math.max(0, (el.scrollTop / totalHeight) * 100));
      setScrollProgress(progress);
    }
  };

  const copyArticleLink = async () => {
    try {
      const url = `${window.location.origin}/blog?article=${article?.slug}`;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  const copyCodeBlock = async (codeText: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    } catch {
      // fallback
    }
  };

  if (!article) return null;

  const wordCount = article.content.split(/\s+/).filter(Boolean).length;
  const formattedDate = new Date(article.date || article.publishedAt || "").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Category Color Badges
  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "ai security":
        return "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      case "web development":
        return "border-sky-500/40 text-sky-400 bg-sky-500/10";
      case "seo":
        return "border-amber-500/40 text-amber-400 bg-amber-500/10";
      case "web design":
        return "border-purple-500/40 text-purple-400 bg-purple-500/10";
      case "ai solutions":
        return "border-cyan-500/40 text-cyan-400 bg-cyan-500/10";
      default:
        return "border-signal/40 text-signal bg-signal/10";
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onClick={(e) => e.stopPropagation()}
        className="glass-card border border-hairline/80 max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl md:rounded-3xl shadow-2xl relative bg-background/98 text-left transition-all"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Dynamic Reading Progress Bar */}
        <div className="sticky top-0 left-0 right-0 z-30 h-1 bg-muted/40 w-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-signal via-cyan-400 to-emerald-400 transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Top Control Header Bar */}
        <div className="sticky top-1 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-8 py-3.5 bg-background/95 backdrop-blur-md border-b border-hairline/80">
          <div className="flex items-center gap-2.5">
            <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${getCategoryStyles(article.category)}`}>
              <span className="live-dot" aria-hidden />
              {article.category}
            </span>
            <span className="hidden sm:inline-block text-xs text-muted-foreground font-mono">
              {article.readTime} ({wordCount} words)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyArticleLink}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg border border-hairline hover:bg-hairline/50 transition-colors text-muted-foreground hover:text-foreground"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg border border-hairline hover:bg-critical/10 hover:border-critical/40 hover:text-critical transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Esc</span>
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="px-5 sm:px-8 md:px-12 py-8 md:py-12">
          
          {/* Article Header & Byline */}
          <div className="mb-10 pb-8 border-b border-hairline/80">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-signal" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-signal" />
                {article.readTime} read
              </span>
              <span className="hidden md:flex items-center gap-1 text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                <ShieldCheck className="w-3 h-3" />
                Peer-Reviewed Technical Analysis
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold leading-[1.2] text-foreground tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Author Byline Box */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-muted/20 border border-hairline/60">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-signal via-cyan-400 to-indigo-500 flex items-center justify-center font-display font-bold text-white shadow-md text-sm shrink-0">
                TV
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    TechVRS Research &amp; Engineering Lab
                  </span>
                  <span className="text-[10px] text-signal font-mono font-medium hidden sm:inline">
                    @techvrs
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                  Production systems architecture, technical SEO, and cloud-native security research.
                </p>
              </div>
            </div>

            {/* Tags Strip */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-5">
                {article.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted/40 border border-hairline text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Executive Summary Callout (AEO / GEO Highlight) */}
          <div className="relative mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-signal/[0.07] via-signal/[0.02] to-transparent border border-signal/30 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-signal mb-2.5">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Executive Summary &amp; Key Findings
            </div>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans font-medium">
              {article.excerpt}
            </p>
          </div>

          {/* Render Parsed Markdown Content */}
          <div className="article-content space-y-7 text-foreground/90 font-sans text-sm sm:text-base leading-relaxed">
            {renderMarkdown(article.content, copyCodeBlock, copiedCodeIdx)}
          </div>

          {/* Author/Consultation Footer Card */}
          <div className="mt-14 pt-10 border-t border-hairline/80">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-signal/30 bg-gradient-to-b from-signal/[0.05] to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="text-[10px] uppercase font-semibold tracking-wider text-signal flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  Engineering Advisory
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  Implementing this architecture in your production stack?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  TechVRS engineers design, audit, and scale high-performance web applications, technical SEO pipelines, and autonomous AI systems for global businesses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold bg-signal text-signal-foreground px-6 py-3.5 rounded-xl hover:opacity-95 shadow-lg shadow-signal/20 transition-all text-center"
                >
                  Schedule Technical Review
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center text-xs uppercase tracking-wider font-semibold border border-hairline px-5 py-3.5 rounded-xl hover:bg-hairline/40 transition-colors text-muted-foreground hover:text-foreground text-center"
                >
                  Back to All Insights
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Comprehensive Markdown Renderer for Technical Content
function renderMarkdown(
  content: string, 
  onCopyCode: (code: string, idx: number) => void,
  copiedIdx: number | null
) {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();

    // H2 Headings
    if (trimmed.startsWith("## ")) {
      const headingText = trimmed.replace("## ", "");
      return (
        <h2 
          key={idx} 
          className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 pt-6 border-t border-hairline/80 flex items-center gap-2 group"
        >
          <span className="text-signal/80 font-mono text-sm">#</span>
          {headingText}
        </h2>
      );
    }

    // H3 Headings
    if (trimmed.startsWith("### ")) {
      const headingText = trimmed.replace("### ", "");
      return (
        <h3 
          key={idx} 
          className="font-display text-lg sm:text-xl font-semibold text-foreground mt-7 mb-2 text-signal flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 text-signal/70" />
          {headingText}
        </h3>
      );
    }

    // Code Blocks (```lang ... ```)
    if (trimmed.startsWith("```")) {
      const firstLineEnd = trimmed.indexOf("\n");
      const languageMatch = trimmed.slice(3, firstLineEnd).trim();
      const codeBody = trimmed.slice(firstLineEnd + 1, trimmed.lastIndexOf("```")).trim();
      const language = languageMatch || "CODE";

      return (
        <div key={idx} className="my-5 rounded-xl overflow-hidden border border-hairline/90 bg-muted/40 shadow-md">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/80 border-b border-hairline/80 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] uppercase font-semibold text-signal ml-2 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                {language}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onCopyCode(codeBody, idx)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-background/60 hover:bg-background border border-hairline text-[11px] font-mono transition-colors text-muted-foreground hover:text-foreground"
            >
              {copiedIdx === idx ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Pre Code */}
          <pre className="p-4 sm:p-5 text-xs sm:text-[13px] font-mono overflow-x-auto text-emerald-300 leading-relaxed bg-[#0b101b]">
            <code>{codeBody}</code>
          </pre>
        </div>
      );
    }

    // Markdown Tables (| col | col |)
    if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
      const rows = trimmed.split("\n").filter(r => r.trim().startsWith("|"));
      if (rows.length >= 2) {
        const headerRow = rows[0].split("|").map(c => c.trim()).filter(Boolean);
        const dataRows = rows.slice(2).map(r => r.split("|").map(c => c.trim()).filter(Boolean));

        return (
          <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-hairline/80 shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-muted/70 border-b border-hairline/90 text-foreground font-semibold font-display">
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 text-signal font-mono text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/50">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-foreground/80 leading-snug">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // Blockquotes (> Quote)
    if (trimmed.startsWith("> ")) {
      const quoteText = trimmed.replace(/^>\s*/gm, "");
      return (
        <blockquote 
          key={idx} 
          className="my-5 border-l-4 border-signal pl-4 sm:pl-5 py-3 italic text-foreground/90 bg-signal/[0.04] rounded-r-xl font-medium text-sm sm:text-base leading-relaxed"
        >
          {renderInline(quoteText)}
        </blockquote>
      );
    }

    // Horizontal Rule (---)
    if (trimmed === "---") {
      return <hr key={idx} className="my-8 border-hairline/70" />;
    }

    // Bullet Lists (- or 1.)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split("\n").filter(Boolean);
      return (
        <ul key={idx} className="my-4 space-y-2.5 pl-2">
          {items.map((item, itemIdx) => {
            const cleanItem = item.replace(/^[-*]\s+|\d+\.\s+/, "");
            return (
              <li key={itemIdx} className="flex items-start gap-2.5 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-signal mt-2 shrink-0" />
                <span>{renderInline(cleanItem)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Standard Paragraph
    return (
      <p key={idx} className="text-muted-foreground leading-relaxed text-sm sm:text-base">
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const url = match[2];
      const isExternal = url.startsWith("http://") || url.startsWith("https://");
      parts.push(
        <a
          key={match.index}
          href={url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "dofollow noopener" : undefined}
          className="text-signal underline hover:opacity-80 transition-colors font-semibold decoration-signal/50 underline-offset-2"
        >
          {label}
        </a>
      );
    } else if (match[3]) {
      const boldText = match[3].slice(2, -2);
      parts.push(
        <strong key={match.index} className="text-foreground font-semibold">
          {boldText}
        </strong>
      );
    } else if (match[4]) {
      const italicText = match[4].slice(1, -1);
      parts.push(
        <em key={match.index} className="italic text-foreground/90">
          {italicText}
        </em>
      );
    } else if (match[5]) {
      const codeText = match[5].slice(1, -1);
      parts.push(
        <code
          key={match.index}
          className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted/60 border border-hairline text-signal"
        >
          {codeText}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
