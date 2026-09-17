import { PromptCard } from "@/components/pormts/poster";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { prompts, makePrompt } from "@/content/pormts";
import {
  CopyButton,
  DownloadButton,
  EmptyState,
  SaveButton,
  WebsitePreview,
} from "@/components/pormts/hub";
import { hubHead } from "@/lib/pormts";

export const Route = createFileRoute("/pormts/prompt/$slug")({
  loader: ({ params }) => {
    const prompt = prompts.find((p) => p.slug === params.slug);
    if (!prompt) throw notFound();
    return prompt;
  },
  head: ({ loaderData }) =>
    loaderData
      ? hubHead(
          loaderData.title,
          `/pormts/prompt/${loaderData.slug}`,
          loaderData.description,
        )
      : {
          meta: [
            { title: "Prompt not found — pormts hub" },
            { name: "robots", content: "noindex" },
          ],
        },
  component: PromptDetail,
  notFoundComponent: () => (
    <div className="ph-container ph-page">
      <EmptyState
        title="That prompt isn't in the library."
        description="It may have moved. Explore the library to find a new starting point."
      />
    </div>
  ),
});

function PromptDetail() {
  const prompt = Route.useLoaderData();
  return <PromptDetailContent key={prompt.slug} prompt={prompt} />;
}

function PromptDetailContent({ prompt }: { prompt: (typeof prompts)[number] }) {
  const [name, setName] = useState("");
  const [audience, setAudience] = useState("");
  const text = makePrompt(prompt, { name, audience });
  const related = prompts
    .filter((p) => p.slug !== prompt.slug)
    .sort(
      (a, b) =>
        Number(b.category === prompt.category) -
        Number(a.category === prompt.category),
    )
    .slice(0, 3);
  return (
    <div className="ph-container ph-page">
      <div className="ph-breadcrumb">
        <Link to="/pormts" aria-label="Back to prompt library">
          <ArrowLeft size={14} />
        </Link>
        <Link to="/pormts">Explore</Link>
        <span>/</span>
        <span>{prompt.category}</span>
      </div>
      <div className="ph-detail-title">
        <span className="ph-eyebrow">
          {prompt.category.toUpperCase()} · {prompt.level.toUpperCase()}
        </span>
        <h1>{prompt.title}</h1>
        <p>{prompt.description}</p>
      </div>
      <div className="ph-detail-layout">
        <div>
          <div className="ph-detail-preview">
            <WebsitePreview prompt={prompt} />
          </div>
          <p className="ph-preview-caption">
            Concept preview · A visual starting point, not a generated website
            or a guaranteed output.
          </p>
          <div className="ph-content-heading">
            <h2>What's inside</h2>
            <span className="ph-level">{prompt.pages.length} pages</span>
          </div>
          <div className="ph-tags">
            {prompt.pages.map((page) => (
              <span key={page}>{page}</span>
            ))}
          </div>
          <ul className="ph-list">
            {prompt.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="ph-content-heading">
            <h2>Your website brief</h2>
            <CopyButton text={text} />
          </div>
          <pre
            className="ph-prompt-text"
            tabIndex={0}
            aria-label="Full website prompt"
          >
            {text}
          </pre>
        </div>
        <aside className="ph-detail-sidebar">
          <h2>A starting point. Yours.</h2>
          <p>
            Personalize the brief, then paste it into your favorite coding
            assistant.
          </p>
          <label className="ph-field">
            Project name
            <input
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Orbit"
            />
          </label>
          <label className="ph-field">
            Who is it for?
            <input
              maxLength={300}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Independent creative teams"
            />
          </label>
          <CopyButton text={text} label="Copy your prompt" />
          <SaveButton prompt={prompt} label />
          <DownloadButton text={text} filename={`${prompt.slug}.txt`} />
          <Link
            to="/pormts/builder"
            search={{ template: prompt.slug }}
            className="ph-btn ph-btn-outline"
          >
            Customize further <ArrowUpRight size={15} />
          </Link>
          <small>
            Free to use and adapt. Saved items keep the original template;
            download your edits.
          </small>
        </aside>
      </div>
      <section className="ph-related">
        <h2>A few more possibilities.</h2>
        <div className="ph-grid">
          {related.map((p) => (
            <PromptCard key={p.slug} prompt={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
