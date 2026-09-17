import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/pormts/hub";
import { hubHead } from "@/lib/pormts";
export const Route = createFileRoute("/pormts/guide")({
  head: () => hubHead("How it works", "/pormts/guide"),
  component: Guide,
});
function Guide() {
  return (
    <div className="ph-container ph-page">
      <PageIntro
        eyebrow="A SMALL GUIDE TO A BETTER START"
        title="From a few words to a real website."
      >
        A great prompt gives your coding assistant context, direction, and a
        definition of done. Here's how to get the most out of this library.
      </PageIntro>
      <div className="ph-guide-grid">
        {[
          [
            "01 / FIND YOUR FOUNDATION",
            "Choose a starting point.",
            "Explore by website type, search for a feature, or browse a collection. Read the included pages and interactions to find the closest match to your idea.",
          ],
          [
            "02 / MAKE IT SPECIFIC",
            "Add a little of you.",
            "Replace the project name and audience. Use the builder to add your brand, technology, real content, and requirements. Specific details make a more useful brief.",
          ],
          [
            "03 / BUILD, THEN REFINE",
            "Give the idea room to grow.",
            "Copy the prompt into your coding assistant. Review its work, test the important flows, and ask for focused improvements one at a time. Connect real services before launch.",
          ],
        ].map(([number, title, body]) => (
          <article className="ph-guide-card" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <section className="ph-prose">
        <h2>A useful follow-up prompt</h2>
        <pre className="ph-prompt-text">
          Review the current website on mobile and desktop. Check every
          navigation link, form, and primary action. Find accessibility issues,
          missing states, and layout overflow. Fix the issues, run the relevant
          checks, and report what still needs a real service or my input.
        </pre>
        <h2>Before you call it ready</h2>
        <ul className="ph-list">
          <li>
            Replace sample copy, images, prices, and contact details with your
            actual content.
          </li>
          <li>
            Test keyboard navigation, small screens, form errors, and direct
            links to every page.
          </li>
          <li>
            Connect and verify the backend, email, payments, or authentication
            your website needs.
          </li>
          <li>
            Keep private keys on the server. Review data access, privacy
            notices, and deployment settings.
          </li>
          <li>
            Run the build and relevant tests, then review the deployed version
            too.
          </li>
        </ul>
      </section>
      <section className="ph-faq">
        <h2>A few things you might wonder.</h2>
        {[
          [
            "Are these image-generation prompts?",
            "No. Every prompt describes a website or web app: its pages, layout, interactions, accessibility, and acceptance checks. The concept previews simply communicate a visual direction.",
          ],
          [
            "Which tool should I use?",
            "These are plain-text briefs. Paste them into a coding assistant or website builder that accepts instructions, such as Lovable, Cursor, Claude, ChatGPT, Bolt, or v0. Adapt the technology to your environment. Results vary by tool and project.",
          ],
          [
            "Is the library free to use?",
            "Yes. You can copy and adapt the included demo prompts for personal and commercial website projects. Your chosen building tool or hosting service may have its own costs and terms.",
          ],
          [
            "Will the output look exactly like the preview?",
            "No. Previews are illustrative website concepts built for this library. Your assistant interprets the brief alongside your project context, so the final website will vary.",
          ],
          [
            "Where are my saved prompts and drafts stored?",
            "Only in this browser's local storage. They don't sync between devices, and clearing site data removes them. Export saved prompts or download a custom brief for a portable copy.",
          ],
          [
            "Does a prompt guarantee a production-ready website?",
            "No. The briefs include quality and testing requirements, but the implementation still needs review. Verify real integrations, security, content, and behavior before publishing.",
          ],
        ].map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <div className="ph-action-row">
        <Link to="/pormts" className="ph-btn ph-btn-dark">
          Find your starting point <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
