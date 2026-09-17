import { PromptCard } from "@/components/pormts/poster";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine } from "lucide-react";
import { prompts, makePrompt } from "@/content/pormts";
import { EmptyState, PageIntro } from "@/components/pormts/hub";
import { hubHead, downloadText } from "@/lib/pormts";
import { useHub } from "@/components/pormts/context";
export const Route = createFileRoute("/pormts/saved")({
  head: () =>
    hubHead(
      "Saved prompts",
      "/pormts/saved",
      "Your browser-local collection of website-building prompts.",
      true,
    ),
  component: Saved,
});
function Saved() {
  const { saved, ready } = useHub();
  const items = saved
    .map((slug) => prompts.find((p) => p.slug === slug))
    .filter((p): p is (typeof prompts)[number] => !!p);
  return (
    <div className="ph-container ph-page">
      <PageIntro
        eyebrow="YOUR LITTLE LIBRARY"
        title="Keep the good ideas close."
      >
        Your saved website prompts, ready when inspiration strikes. Stored in
        this browser, with no account needed. Download a copy to keep them
        elsewhere.
      </PageIntro>
      {!ready ? (
        <p role="status">Loading your saved prompts…</p>
      ) : items.length ? (
        <>
          <div className="ph-saved-toolbar">
            <span>
              {items.length} saved {items.length === 1 ? "prompt" : "prompts"}
            </span>
            <button
              className="ph-btn ph-btn-outline"
              onClick={() =>
                downloadText(
                  items
                    .map((p) => `# ${p.title}\n\n${makePrompt(p)}`)
                    .join("\n\n----------\n\n"),
                  "pormts-hub-saved.txt",
                )
              }
            >
              <ArrowDownToLine size={16} />
              Export saved prompts
            </button>
          </div>
          <div className="ph-grid">
            {items.map((p) => (
              <PromptCard key={p.slug} prompt={p} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="Your next idea belongs here."
          description="Tap the bookmark on any prompt to save it. Your favorites will be waiting here when you're ready to build."
        />
      )}
    </div>
  );
}
