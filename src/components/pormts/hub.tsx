import { useEffect, useState, type ReactNode } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
} from "lucide-react";
import { prompts, type Prompt } from "@/content/pormts";
import { HubContext, useHub } from "./context";
import { downloadText } from "@/lib/pormts";
import { HubFrame } from "./frame";

const STORAGE_KEY = "pormts-hub:saved:v1";

export function HubLayout() {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const read = () => {
      try {
        const data: unknown = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]",
        );
        if (Array.isArray(data))
          setSaved([
            ...new Set(
              data.filter(
                (slug): slug is string =>
                  typeof slug === "string" &&
                  prompts.some((p) => p.slug === slug),
              ),
            ),
          ]);
      } catch {
        setNotice(
          "Browser storage is unavailable. Saves will last for this visit only.",
        );
      }
      setReady(true);
    };
    read();
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) read();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 5500);
    return () => window.clearTimeout(timer);
  }, [notice]);
  function toggle(slug: string) {
    const next = saved.includes(slug)
      ? saved.filter((s) => s !== slug)
      : [...saved, slug];
    setSaved(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setNotice(
        next.includes(slug)
          ? "Prompt saved to your library."
          : "Prompt removed from saved.",
      );
    } catch {
      setNotice("Saved for this visit. Browser storage is unavailable.");
    }
  }
  return (
    <HubContext.Provider value={{ saved, ready, toggle, notify: setNotice }}>
      <HubFrame notice={notice} dismiss={() => setNotice("")}>
        <Outlet />
      </HubFrame>
    </HubContext.Provider>
  );
}

export function CopyButton({
  text,
  label = "Copy prompt",
  compact = false,
  iconOnly = false,
}: {
  text: string;
  label?: string;
  compact?: boolean;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const { notify } = useHub();
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      notify("Prompt copied. Paste it into your coding assistant.");
    } catch {
      notify(
        "Clipboard access is blocked. Open the prompt to select its text or download it.",
      );
    }
  }
  return (
    <button
      className={compact ? "ph-copy-small" : "ph-btn ph-btn-dark"}
      onClick={copy}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {!iconOnly && (copied ? "Copied!" : label)}
    </button>
  );
}

export function SaveButton({
  prompt,
  label = false,
}: {
  prompt: Prompt;
  label?: boolean;
}) {
  const { saved, toggle, ready } = useHub();
  const active = saved.includes(prompt.slug);
  return (
    <button
      className={
        label ? "ph-btn ph-btn-outline" : `ph-save ${active ? "is-saved" : ""}`
      }
      disabled={!ready}
      aria-pressed={active}
      aria-label={`${active ? "Unsave" : "Save"} ${prompt.title}`}
      onClick={() => toggle(prompt.slug)}
    >
      <Bookmark size={17} fill={active ? "currentColor" : "none"} />
      {label && (active ? "Saved" : "Save prompt")}
    </button>
  );
}

export function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  return (
    <button
      className="ph-btn ph-btn-outline"
      onClick={() => downloadText(text, filename)}
    >
      <ArrowDownToLine size={16} />
      Download .txt
    </button>
  );
}

export function WebsitePreview({
  prompt,
  hero = false,
}: {
  prompt: Prompt;
  hero?: boolean;
}) {
  const dashboard =
    prompt.category === "Dashboards" || prompt.category === "Web apps";
  const shop =
    prompt.category === "E-commerce" || prompt.slug === "neighborhood-cafe";
  return (
    <div
      className={`ph-preview ph-tone-${prompt.accent} ${hero ? "ph-preview-hero" : ""}`}
      aria-hidden="true"
    >
      <div className="ph-mini-site">
        <div className="ph-mini-nav">
          <b>{prompt.brand}</b>
          <span>
            Discover&nbsp;&nbsp; About&nbsp;&nbsp; <i>Get started ↗</i>
          </span>
        </div>
        {dashboard ? (
          <div className="ph-mini-dashboard">
            <div className="ph-mini-sidebar">
              ▧<br />⌘<br />▥<br />⚙
            </div>
            <div className="ph-mini-dash-content">
              <span>Workspace / Overview</span>
              <h3>
                Your overview <small>↗</small>
              </h3>
              <div className="ph-mini-metrics">
                <div>
                  <span>Revenue</span>
                  <b>$24,680</b>
                  <em>↗ 12.8%</em>
                </div>
                <div>
                  <span>Customers</span>
                  <b>1,284</b>
                  <em>↗ 8.2%</em>
                </div>
                <div>
                  <span>Growth</span>
                  <b>24.6%</b>
                  <em>This month</em>
                </div>
              </div>
              <div className="ph-mini-chart">
                <span>Activity overview</span>
                <div>
                  {[26, 44, 35, 60, 47, 76, 55, 68, 89, 77, 93, 84].map(
                    (h, i) => (
                      <i key={i} style={{ height: `${h}%` }} />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="ph-mini-content">
              <span className="ph-mini-eyebrow">
                {shop
                  ? "THOUGHTFULLY MADE. EVERY DAY."
                  : "A LITTLE DIFFERENT. BY DESIGN."}
              </span>
              <h3>{prompt.headline}</h3>
              <p>A little less ordinary. A whole lot more you.</p>
              <span className="ph-mini-cta">
                {shop ? "Explore the collection" : "Discover what's possible"}{" "}
                <ArrowUpRight size={10} />
              </span>
            </div>
            {shop ? (
              <div className="ph-mini-products">
                <div>
                  <i className="ph-vase" />
                </div>
                <div>
                  <i className="ph-lamp" />
                </div>
                <div>
                  <i className="ph-bottle" />
                </div>
              </div>
            ) : prompt.accent === "orange" ? (
              <div className="ph-mini-flower">✳</div>
            ) : (
              <div className="ph-mini-window">
                <div>
                  ✳ &nbsp; A little more clarity <span>•••</span>
                </div>
                <section>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </section>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="ph-page-intro">
      <span className="ph-eyebrow">
        <i />
        {eyebrow}
      </span>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="ph-empty">
      <Bookmark size={28} />
      <h2>{title}</h2>
      <p>{description}</p>
      {children || (
        <Link to="/pormts" className="ph-btn ph-btn-dark">
          Explore prompts <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
