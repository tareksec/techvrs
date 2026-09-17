# pormts hub

A standalone website-building prompt library inside the existing TanStack Start app. Its public base is `/pormts`; `/prompts` permanently redirects there. The original frosted-glass frame, Skiper96 navigation, twin image banners, category pills, six-column poster grid, prompt popup, and Converto footer are preserved. Additional pages share this visual style. The original source is retained in `backups/pormts.before-hub.tsx.txt`.

## Run and verify

Use Node.js 22.18+ (or Node.js 24 LTS) and npm. Use **one package manager per install**; do not mix npm files with a pnpm-managed node_modules directory.

```sh
npm ci
npm run dev
npm run test:pormts
npx tsc --noEmit
npm run build
npm run preview -- --port 5001
```

Open `http://localhost:5000/pormts`. The hub needs no environment variables, AI API keys, database, or authentication service. Other parts of TechVRS retain their existing environment requirements.

## Pages and behavior

- `/pormts`: 16 demo website briefs in eight categories. Search across titles, descriptions, categories, and tags; combine category, difficulty, and collection filters. Sorting, URL-persisted filters, clear/empty states, and progressive loading are included. Press `/` to focus search; press Enter or Search to apply it.
- `/pormts/prompt/:slug`: shareable detail page with project/audience customization, full selectable text, copy, download, save, related prompts, and a 404 for unknown slugs.
- `/pormts/collections`: four curated groups that open a filtered library.
- `/pormts/saved`: browser-persisted bookmarks with plain-text export.
- `/pormts/builder`: live brief customization, technology selection, extra requirements, autosaved local draft, copy, download, and reset.
- `/pormts/guide`: usage instructions, launch checklist, and FAQs.
- `/pormts/about`: product explanation, usage terms, and local-data privacy information.

Saved IDs use `pormts-hub:saved:v1`; drafts use `pormts-hub:draft:v1`. Neither is account-based or synchronized across devices. Saved items retain the original template, not detail-page edits. Download edited briefs to preserve those. Storage failures keep the interface usable and display a limitation. Clipboard failures show a selectable-text/download fallback. The builder is a deterministic local brief composer, not an AI generation endpoint.

## Content maintenance

Edit `src/content/pormts.ts`. Each prompt needs a unique stable slug, valid category, descriptive brief, pages, working interaction requirements, tags, level, and visual direction. `makePrompt` adds shared accessibility, security, testing, and delivery requirements. Add slugs to a collection to include them; tests validate references. Sitemap detail entries and category counts update automatically.

Poster and banner covers reuse the original Unsplash imagery as illustrative cover art; local branded fallbacks appear if an image fails. Detail-page concept previews use HTML/CSS and are not generated websites or real business metrics. All supplied briefs are demo templates; no popularity scores, customer counts, or testimonials are claimed. The popup uses Radix Dialog for focus management, Escape dismissal, and accessible names.

## Publishing

Run all checks and deploy through the existing Lovable/Cloudflare hosting pipeline. `npm run build` generates the existing Nitro target; use the repository's configured deployment process rather than publishing only the client files, because routes use server rendering. No production deployment or git push is performed by this change.

`npm run preview` runs the built Cloudflare worker locally with Wrangler. It does not deploy or require a Cloudflare login. This replaces the previous `vite preview` command, which expected a different server output directory and returned 500 responses for this Nitro target.

The canonical origin is the existing `https://techvrs.com`; update `src/lib/pormts.ts` if the production hostname changes. Public hub pages and all prompt details are in `/sitemap.xml`. Saved and builder pages are marked `noindex`. Review the hosting provider's privacy/logging practices and parent-site telemetry before making additional privacy claims.

Before launch, verify deployed deep links, the `/prompts` redirect, response status for unknown prompts, clipboard behavior over HTTPS, downloads, and layout on a real mobile device. Cross-device accounts, community submissions, moderation, and paid services are outside this local-first library and require a backend if added later.
