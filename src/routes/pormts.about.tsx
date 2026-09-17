import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/pormts/hub";
import { hubHead } from "@/lib/pormts";
export const Route = createFileRoute("/pormts/about")({
  head: () => hubHead("About & privacy", "/pormts/about"),
  component: About,
});
function About() {
  return (
    <div className="ph-container ph-page">
      <PageIntro
        eyebrow="BUILT FOR PEOPLE WHO BUILD"
        title="A better place to begin."
      >
        pormts hub is a website-building prompt library by TechVRS. We turn a
        blank text box into a clear starting point for your next website.
      </PageIntro>
      <div className="ph-prose">
        <h2>What you'll find here</h2>
        <p>
          A curated starter library covering landing pages, SaaS, portfolios,
          online stores, dashboards, business websites, content, and web apps.
          Each demo prompt includes a page plan, visual direction, functional
          requirements, and acceptance checks. Our previews are original
          illustrative layouts, not screenshots of generated results.
        </p>
        <h2>Made to be adapted</h2>
        <p>
          You may use and modify these included prompts for personal and
          commercial website projects. You are responsible for reviewing
          generated code, choosing appropriate assets, and verifying the final
          website. References to building tools are for workflow guidance and do
          not imply endorsement or affiliation.
        </p>
        <h2>Your browser, your library</h2>
        <p>
          The hub stores saved prompt IDs and your builder draft in local
          storage on this device. It does not require an account. The builder
          assembles text locally and does not send your entries to an AI API or
          our server. Avoid putting secrets or sensitive personal data into a
          project brief.
        </p>
        <p>
          To remove saved items, use their bookmark buttons. To clear your
          builder entries, use Reset draft. To remove all hub data, clear this
          site's storage in your browser settings. Export your prompts first if
          you want a copy.
        </p>
        <h2>Site delivery and external services</h2>
        <p>
          Illustrative cover images load from Unsplash. The site host receives
          ordinary page requests and may keep operational logs. The parent
          website loads fonts from Google Fonts and has application error
          reporting. Those services may receive request metadata. Following
          external links or pasting a brief into another tool is governed by
          that service's policies. This hub adds no advertising or analytics
          scripts.
        </p>
        <h2>Have a project in mind?</h2>
        <p>
          <Link to="/pormts/builder">Start with the prompt builder</Link>, or
          visit <a href="/contact">TechVRS contact</a> for website project
          inquiries.
        </p>
      </div>
    </div>
  );
}
