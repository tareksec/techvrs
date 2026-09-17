import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { collections, prompts } from "@/content/pormts";
import { PageIntro, WebsitePreview } from "@/components/pormts/hub";
import { hubHead } from "@/lib/pormts";
export const Route = createFileRoute("/pormts/collections")({
  head: () => hubHead("Collections", "/pormts/collections"),
  component: Collections,
});
function Collections() {
  return (
    <div className="ph-container ph-page">
      <PageIntro
        eyebrow="A LITTLE CURATION GOES A LONG WAY"
        title="Good prompts. Better together."
      >
        Purposeful collections for the thing you're ready to build. Pick a
        direction and find your starting point.
      </PageIntro>
      <div className="ph-collection-grid">
        {collections.map((collection) => (
          <article className="ph-collection-card" key={collection.slug}>
            <Link
              to="/pormts"
              search={{ collection: collection.slug }}
              aria-label={`Explore ${collection.title}`}
            >
              <div className={`ph-collection-art ph-tone-${collection.accent}`}>
                {collection.slugs.slice(0, 2).map((slug) => (
                  <WebsitePreview
                    key={slug}
                    prompt={prompts.find((p) => p.slug === slug)!}
                  />
                ))}
              </div>
            </Link>
            <div className="ph-collection-info">
              <span>{collection.slugs.length} WEBSITE PROMPTS</span>
              <h2>{collection.title}</h2>
              <p>{collection.description}</p>
              <Link
                to="/pormts"
                search={{ collection: collection.slug }}
                className="ph-text-link"
              >
                Explore collection <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
