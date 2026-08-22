# log0 website

**The marketing site and documentation for log0 - an intelligent incident
copilot that turns raw logs into actionable incidents.**

> From logs to incidents, automatically.

This repository powers **https://log0.in**: the marketing landing pages, the
documentation site at **https://log0.in/docs** (architecture, local development,
deployment, roadmap, and more), and the engineering blog at
**https://log0.in/blog** - all built with Fumadocs and MDX.

---

## Features

- Marketing landing pages for log0
- Documentation site (Fumadocs) with MDX content in `content/docs`
- Engineering blog (Fumadocs) with MDX posts in `content/blog`, rendered at `/blog/[slug]` - supports cover images, canonical URLs, and external mirror links (Hashnode/Medium/LinkedIn)
- Mermaid diagrams for architecture and flow docs
- AI-powered docs search (Vercel AI SDK + OpenRouter)
- GitHub-backed dynamic content (changelog/timeline via Octokit)

## Tech stack

Next.js 16 (App Router) · React 19 · Fumadocs (`fumadocs-ui` / `fumadocs-mdx`) ·
MDX · Mermaid · Tailwind CSS 4

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
npm install
cp .env.example .env     # optional - only for GitHub-backed content
npm run dev              # http://localhost:3000
```

### Environment variables

See [`.env.example`](./.env.example). Only needed for GitHub-backed content; most
local work runs without them:

| Variable | Purpose |
|---|---|
| `GITHUB_APP_ID` | GitHub App ID for server-side GitHub content |
| `GITHUB_APP_PRIVATE_KEY` | GitHub App private key (server-side only) |

### Scripts

```bash
npm run dev           # dev server, port 3000
npm run lint          # ESLint
npm run lint:mermaid  # validate Mermaid diagrams
npm run build         # lint:mermaid + production build
npm run start         # serve production build, port 3000
```

---

## Editing content (docs & blog)

Both the docs and the blog are MDX collections defined in `source.config.ts`:

- **Docs** live under `content/docs` (e.g. `local-development.mdx`,
  `deployment.mdx`, and the `architecture/` section), rendered at `/docs`.
- **Blog** posts live under `content/blog` (one MDX file per post), rendered at
  `/blog/[slug]`. Each post's front matter drives its slug, date, cover images
  (`public/blog/covers`), canonical URL, and optional external mirror links.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for authoring conventions (front
matter, Fumadocs components, Mermaid). Docs and blog posts are the most valuable
contributions here.

## Project structure

```
app/              App Router routes and layouts (incl. /blog)
components/       UI components
content/docs/      MDX documentation (the /docs site)
content/blog/      MDX blog posts (the /blog site)
lib/              Utilities
scripts/          Build/lint helpers (e.g. lint-mermaid.mjs)
public/           Static assets (incl. blog/covers)
source.config.ts   Fumadocs content source config (docs + blog collections)
```

## Related repositories

| Repo | Description |
|---|---|
| [`log0-services`](https://github.com/log0labs/log0-services) | Backend microservices (ingestion, clustering, incidents, AI, auth) |
| [`log0-console`](https://github.com/log0labs/log0-console) | Web dashboard / console UI |

---

## License

The source code of the log0 marketing website is licensed under the
**MIT License** - see [`LICENSE`](./LICENSE).

Note: the MIT license covers the code only. The "log0" and "log0labs" names,
logos, brand assets, and marketing content are trademarks and proprietary content
of log0labs and are **not** covered by the MIT grant.

Copyright (c) 2026 log0labs.

## Contributing

Contributions are welcome - see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup
and docs-authoring conventions, and please review our
[Code of Conduct](./CODE_OF_CONDUCT.md). Contributions are accepted under MIT
(inbound = outbound); no CLA is required for this repository. For security
issues, follow [`SECURITY.md`](./SECURITY.md).
