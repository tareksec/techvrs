import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { prompts, makePrompt } from "@/content/pormts";
import { CopyButton, DownloadButton, PageIntro } from "@/components/pormts/hub";
import { hubHead } from "@/lib/pormts";
import { useHub } from "@/components/pormts/context";
const DRAFT_KEY = "pormts-hub:draft:v1";
const stacks = [
  "Use the existing project stack",
  "React, TypeScript, and Tailwind CSS",
  "Next.js, TypeScript, and Tailwind CSS",
  "Semantic HTML, CSS, and vanilla JavaScript",
];
const initial = {
  template: prompts[0].slug,
  name: "",
  audience: "",
  stack: stacks[0],
  extra: "",
};
export const Route = createFileRoute("/pormts/builder")({
  validateSearch: (search: Record<string, unknown>): { template?: string } => ({
    template: prompts.some((p) => p.slug === search.template)
      ? String(search.template)
      : undefined,
  }),
  head: () =>
    hubHead(
      "Prompt builder",
      "/pormts/builder",
      "Turn your project idea into a complete, customized website-building brief.",
      true,
    ),
  component: Builder,
});
function Builder() {
  const { template } = Route.useSearch();
  return <BuilderForm key={template || "draft"} template={template} />;
}
function BuilderForm({ template }: { template?: string }) {
  const [draft, setDraft] = useState({
    ...initial,
    template: template || initial.template,
  });
  const [ready, setReady] = useState(false);
  const [storageStatus, setStorageStatus] = useState("");
  const { notify } = useHub();
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(DRAFT_KEY) || "null",
      );
      if (saved && typeof saved === "object") {
        const value = saved as Record<string, unknown>;
        setDraft({
          template:
            template ||
            (prompts.some((p) => p.slug === value.template)
              ? String(value.template)
              : initial.template),
          name: typeof value.name === "string" ? value.name.slice(0, 100) : "",
          audience:
            typeof value.audience === "string"
              ? value.audience.slice(0, 500)
              : "",
          stack: stacks.includes(String(value.stack))
            ? String(value.stack)
            : initial.stack,
          extra:
            typeof value.extra === "string" ? value.extra.slice(0, 3000) : "",
        });
      }
    } catch {
      setStorageStatus("Draft is available for this visit only.");
    }
    setReady(true);
  }, [template]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setStorageStatus("Draft saved in this browser");
    } catch {
      setStorageStatus("Storage unavailable. Download your prompt to keep it.");
    }
  }, [draft, ready]);
  const prompt = prompts.find((p) => p.slug === draft.template) || prompts[0];
  const text = makePrompt(prompt, draft);
  const update = (key: keyof typeof initial, value: string) =>
    setDraft((current) => ({ ...current, [key]: value }));
  return (
    <div className="ph-container ph-page">
      <PageIntro
        eyebrow="YOUR IDEA. YOUR WORDS."
        title="Make a prompt your own."
      >
        Start with a solid foundation. Add your project, audience, and
        must-haves. Get a complete website brief you can copy into your coding
        assistant.
      </PageIntro>
      <div className="ph-builder-layout">
        <form className="ph-builder-form" onSubmit={(e) => e.preventDefault()}>
          <fieldset
            disabled={!ready}
            style={{ border: 0, padding: 0, margin: 0 }}
          >
            <label className="ph-field">
              01 / Choose a starting point
              <select
                value={draft.template}
                onChange={(e) => update("template", e.target.value)}
              >
                {prompts.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="ph-field">
              02 / Give your project a name
              <input
                maxLength={100}
                placeholder="e.g. Monday Studio"
                value={draft.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className="ph-field">
              03 / Who are you building for?
              <textarea
                maxLength={500}
                placeholder="e.g. Small businesses looking for a thoughtful design partner"
                value={draft.audience}
                onChange={(e) => update("audience", e.target.value)}
              />
            </label>
            <label className="ph-field">
              04 / Choose your technology
              <select
                value={draft.stack}
                onChange={(e) => update("stack", e.target.value)}
              >
                {stacks.map((stack) => (
                  <option key={stack}>{stack}</option>
                ))}
              </select>
            </label>
            <label className="ph-field">
              05 / Make it yours
              <textarea
                maxLength={3000}
                placeholder="Brand colors, special features, content, integrations, things to avoid..."
                value={draft.extra}
                onChange={(e) => update("extra", e.target.value)}
              />
            </label>
            <button
              type="button"
              className="ph-text-link"
              style={{ border: 0, background: "none", padding: 0 }}
              onClick={() => {
                setDraft({
                  ...initial,
                  template: template || initial.template,
                });
                notify("Draft reset to the starting template.");
              }}
            >
              Reset draft
            </button>
            <p className="ph-draft-status" role="status">
              <Check size={12} />
              {storageStatus || "Preparing your draft…"}
            </p>
          </fieldset>
        </form>
        <div className="ph-builder-output">
          <div className="ph-content-heading">
            <h2>Your website brief</h2>
            <span className="ph-level">LIVE PREVIEW</span>
          </div>
          <pre
            className="ph-prompt-text"
            tabIndex={0}
            aria-label="Generated website brief"
          >
            {text}
          </pre>
          <div className="ph-action-row">
            <CopyButton text={text} />
            <DownloadButton
              text={text}
              filename={`${prompt.slug}-custom.txt`}
            />
          </div>
          <p className="ph-preview-caption">
            This builder assembles your brief locally. It doesn't call an AI
            service or send your draft to a server. Replace any remaining
            [placeholders] before building.
          </p>
        </div>
      </div>
    </div>
  );
}
