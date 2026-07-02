# copyfolio-site

A cybersecurity portfolio site for a SOC analyst / security-first engineer ("techvrs"). Built with React 19, TanStack Router, Tailwind CSS v4, and shadcn/ui components.

## How to run

```
npm run dev
```

Starts the Vite dev server on port 5000. The workflow "Start application" is already configured to do this automatically.

## Stack

- **React 19** + **TanStack Router** (file-based routing in `src/routes/`)
- **TanStack Start** for SSR support
- **Tailwind CSS v4** + **shadcn/ui** component library
- **Vite 8** with `@lovable.dev/vite-tanstack-config`

## Project structure

```
src/
  routes/         # Pages: index, about, services, work, blog, contact
  components/     # Site chrome, particle background, icons, service illustrations
  components/ui/  # shadcn/ui primitives
  hooks/          # use-mobile
  lib/            # theme provider
  assets/         # Static assets
public/           # Public assets
```

## Chat Widget Server (`chat-widget/`)

A standalone Express server running on **port 3000** that powers an AI chat bubble widget.

### How to run
The "Chat Widget Server" workflow starts it automatically with `cd chat-widget && node index.js`.

### Stack
- **Express** + **express-rate-limit** for the API server
- **Pollinations AI** (free, no API key) — OpenAI-compatible endpoint
- Vanilla HTML/CSS/JS floating widget in `chat-widget/public/index.html`

### API
- `POST /api/chat` — `{ message: string, history: [{role, content}][] }` → `{ reply: string }`
- `GET /health` — health check
- Rate limited to 20 req/min per IP

### Production CORS lockdown
Set `ALLOWED_ORIGINS=https://yoursite.com` env var to restrict the API to specific embed domains.

### Embed snippets
See below in this file.

---

## User preferences

- Keep the existing stack and file structure.
