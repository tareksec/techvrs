import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Code2, X } from "lucide-react";
import { makePrompt, type Prompt } from "@/content/pormts";
import { CopyButton, DownloadButton, SaveButton } from "./hub";

const coverPhotos: Record<string, string> = {
  "saas-launchpad": "photo-1618005182384-a83a8bd57fbe",
  "creative-studio": "photo-1579783900882-c0d3dad7b119",
  "analytics-workspace": "photo-1550745165-9bc0b252726f",
  "everyday-store": "photo-1523275335684-37898b6baf30",
  "developer-portfolio": "photo-1526374965328-7f61d4dc18c5",
  "startup-waitlist": "photo-1451187580459-43490279c0fa",
  "neighborhood-cafe": "photo-1555939594-58d7cb561ad1",
  "project-command-center": "photo-1486406146926-c627a92ad1ab",
  "editorial-journal": "photo-1579783900882-c0d3dad7b119",
  "finance-overview": "photo-1486406146926-c627a92ad1ab",
  "consultant-website": "photo-1600585154340-be6161a56a0c",
  "digital-product-shop": "photo-1618005182384-a83a8bd57fbe",
  "event-landing": "photo-1540573133985-87b6da6d54a9",
  "course-library": "photo-1511497584788-87676104235f",
  "booking-workspace": "photo-1534447677768-be436bb09401",
  "saas-documentation": "photo-1550745165-9bc0b252726f",
};

export function PromptCover({
  prompt,
  heroImage,
}: {
  prompt: Prompt;
  heroImage?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`ph-poster-cover ph-tone-${prompt.accent}`}
      aria-hidden="true"
    >
      <div className="ph-cover-fallback">
        <Code2 />
        <strong>{prompt.brand}</strong>
        <span>{prompt.headline}</span>
      </div>
      {!failed && (
        <img
          src={`https://images.unsplash.com/${heroImage || coverPhotos[prompt.slug]}?w=${heroImage ? "1200" : "500"}&auto=format&fit=crop&q=80`}
          alt=""
          loading={heroImage ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <div className="ph-poster-gradient" />
    </div>
  );
}

export function PromptDialog({
  prompt,
  children,
}: {
  prompt: Prompt;
  children: ReactNode;
}) {
  const [name, setName] = useState("");
  const [audience, setAudience] = useState("");
  const text = makePrompt(prompt, { name, audience });
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ph-dialog-overlay" />
        <Dialog.Content className="ph ph-dialog-content">
          <Dialog.Close
            className="ph-dialog-close"
            aria-label="Close prompt details"
          >
            <X size={20} />
          </Dialog.Close>
          <div className="ph-dialog-heading">
            <div className="ph-dialog-thumb">
              <PromptCover prompt={prompt} />
            </div>
            <div>
              <span className="ph-dialog-badge">Website build prompt</span>
              <Dialog.Title>{prompt.title}</Dialog.Title>
              <div className="ph-dialog-meta">
                <span>{prompt.category}</span>
                <span>{prompt.level}</span>
                <span>{prompt.pages.length} pages</span>
              </div>
              <Dialog.Description>{prompt.description}</Dialog.Description>
            </div>
          </div>
          <div className="ph-dialog-fields">
            <label className="ph-field">
              Project name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your project name"
                maxLength={100}
              />
            </label>
            <label className="ph-field">
              Audience
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Who is this website for?"
                maxLength={300}
              />
            </label>
          </div>
          <div className="ph-content-heading">
            <h3>Full website prompt</h3>
            <CopyButton compact text={text} />
          </div>
          <pre
            className="ph-prompt-text ph-modal-prompt"
            tabIndex={0}
            aria-label="Full website prompt"
          >
            {text}
          </pre>
          <div className="ph-tags">
            {prompt.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <div className="ph-dialog-actions">
            <SaveButton prompt={prompt} label />
            <DownloadButton text={text} filename={`${prompt.slug}.txt`} />
            <Link
              to="/pormts/prompt/$slug"
              params={{ slug: prompt.slug }}
              className="ph-btn ph-btn-outline"
            >
              Full page <ArrowUpRight size={15} />
            </Link>
            <CopyButton text={text} label="Copy & use" />
          </div>
          <p className="ph-dialog-note">
            Customize, then paste into your coding assistant. Cover art is
            illustrative. Download to keep your edits.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <article className="ph-poster-card group flex flex-col min-w-0">
      <div className="ph-poster relative aspect-[3/4] w-full rounded-[22px] overflow-hidden bg-slate-900 border border-white/15 shadow-md group-hover:border-white/40 transition-all duration-300">
        <PromptDialog prompt={prompt}>
          <button
            className="ph-poster-open"
            aria-label={`Preview ${prompt.title}`}
          >
            <PromptCover prompt={prompt} />
            <span className="ph-poster-type">
              <Code2 size={11} />
              {prompt.category}
            </span>
            <span className="ph-poster-brand">
              {prompt.brand}
              <small>WEBSITE PROMPT</small>
            </span>
          </button>
        </PromptDialog>
        <div className="ph-poster-actions">
          <CopyButton compact text={makePrompt(prompt)} />
          <SaveButton prompt={prompt} />
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <Link
          to="/pormts/prompt/$slug"
          params={{ slug: prompt.slug }}
          className="ph-poster-title text-xs sm:text-sm font-semibold text-white/95 group-hover:text-white transition"
        >
          {prompt.title}
        </Link>
        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-white/80 font-medium">
          <span className="text-cyan-200">{prompt.level}</span>
          <span>·</span>
          <span>{prompt.pages.length} pages</span>
        </div>
      </div>
    </article>
  );
}
