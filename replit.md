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

## User preferences

- Keep the existing stack and file structure.
