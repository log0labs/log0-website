# Contributing to the log0 website

Thanks for your interest in improving the **log0 website** - the marketing site
and documentation for log0 (**https://log0.in**), an intelligent incident copilot
that turns raw logs into actionable incidents.

Documentation for the product itself lives at **https://log0.in/docs**.

---

## License

Unlike the log0 product repositories (which are AGPL-3.0), the **source code of
this website is licensed under the [MIT License](./LICENSE)**. By submitting a
contribution you agree that it is licensed under MIT (inbound = outbound), so no
separate CLA is required here. A `Signed-off-by` line
(`git commit -s`, per the [DCO](https://developercertificate.org)) is appreciated
but not mandatory.

Note: the MIT license covers the code only. The "log0" and "log0labs" names,
logos, and brand assets remain trademarks/proprietary content - please don't use
them to imply endorsement or to stand up a look-alike site.

Please also read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19
- [Fumadocs](https://fumadocs.dev) (`fumadocs-ui` / `fumadocs-mdx`) for docs
- MDX content in `content/docs`
- [Mermaid](https://mermaid.js.org) for diagrams
- Tailwind CSS 4
- AI-powered docs search (Vercel AI SDK + OpenRouter) and GitHub-backed content
  (Octokit)

## Prerequisites

- **Node.js** 20+
- **npm** (this repo uses `package-lock.json`)

## Getting started

```bash
npm install
cp .env.example .env     # optional - only needed for GitHub-backed content
npm run dev              # starts the site on http://localhost:3000
```

### Environment variables

See [`.env.example`](./.env.example). These are only needed for features that
pull content from GitHub; the site runs for most local work without them:

| Variable | Purpose |
|---|---|
| `GITHUB_APP_ID` | GitHub App ID for server-side GitHub content |
| `GITHUB_APP_PRIVATE_KEY` | GitHub App private key (server-side only - never expose to the browser) |

## Useful scripts

```bash
npm run dev           # dev server on port 3000
npm run lint          # ESLint
npm run lint:mermaid  # validate Mermaid diagrams in the docs
npm run build         # runs lint:mermaid, then a production build
npm run start         # serve the production build on port 3000
```

Run `npm run lint` and `npm run build` before opening a PR (the build also
validates Mermaid diagrams).

---

## Editing content (docs & blog)

Both the docs and the blog are Fumadocs MDX collections defined in
`source.config.ts`. Content is the highest-impact contribution here.

### Documentation (`content/docs`, rendered at `/docs`)

```
content/docs/
  index.mdx
  local-development.mdx
  deployment.mdx
  roadmap.mdx
  changelog.mdx
  timeline.mdx
  architecture/
    index.mdx
    high-level-system-architecture.mdx
    flow-diagrams.mdx
    lld-uml.mdx
    async-api.mdx
    decisions.mdx
```

Guidelines:

- Each page starts with front matter (`title`, `description`).
- Use the Fumadocs `Tabs`/`Tab`, `Cards`/`Card`, and callout components already
  used across the docs for consistency (see existing pages for examples).
- Prefer `bash` fenced blocks for shell examples, with OS-specific `Tabs`
  (Linux/macOS, Windows PowerShell, Windows CMD) when commands differ.
- Diagrams use Mermaid fenced blocks; run `npm run lint:mermaid` to validate.
- Keep terminology consistent with the product (services, ports, topic names).

### Blog (`content/blog`, rendered at `/blog/[slug]`)

Each post is a single MDX file under `content/blog`. Match the front-matter
schema in `source.config.ts` - notably:

- `title`, `description`, `slug` (keep the `slug` equal to the route segment),
  `date` (YYYY-MM-DD), and `order`.
- `coverDark` (required) and optional `coverLight` - cover art lives in
  `public/blog/covers`.
- `keywords` for SEO; optional `seoTitle` / `seoDescription` overrides.
- `canonical` - `"self"` (log0.in) or an absolute external URL if the post is
  canonically published elsewhere.
- `links` - only the mirrors you set (`hashnode`, `medium`, `linkedin`,
  `commune`) render a button.

Copy an existing post as a template, and run `npm run build` to validate front
matter and Mermaid diagrams before opening the PR.

## Project layout

```
app/            Next.js App Router routes and layouts (incl. /blog)
components/      UI components
content/docs/    MDX documentation (the /docs site)
content/blog/    MDX blog posts (the /blog site)
lib/            Utilities
scripts/        Build/lint helpers (e.g. lint-mermaid.mjs)
public/         Static assets (incl. blog/covers)
source.config.ts  Fumadocs content source config (docs + blog collections)
```

---

## Development workflow

1. **Open or find an issue** for anything beyond a small copy/typo fix.
2. **Fork and branch** from `main`: `git checkout -b docs/clarify-local-dev`.
3. **Keep PRs focused.** For content, check spelling/links; for UI, verify light
   and dark themes and mobile layout.
4. **Verify** `npm run lint` and `npm run build` pass.
5. **Write clear commits** - Conventional Commit prefixes (`docs`, `feat`,
   `fix`, `chore`) are encouraged; `git commit -s` to add a DCO sign-off.
6. **Open a PR** against `main` describing what changed and why. Screenshots are
   very welcome for visual changes.

## Pull request checklist

- [ ] Focused change with a clear description.
- [ ] `npm run lint` and `npm run build` pass (Mermaid diagrams validated).
- [ ] Links and front matter are correct; no broken internal links.
- [ ] No secrets committed (`GITHUB_APP_PRIVATE_KEY` stays server-side).
- [ ] Visual changes verified in light/dark themes and on mobile.

---

## Reporting security issues

**Do not open a public issue for security vulnerabilities.** Please follow
[`SECURITY.md`](./SECURITY.md) (or email ashmitgupta.official@outlook.com).

## Questions

- Product docs: **https://log0.in/docs**
- General questions: open a GitHub Discussion or issue.

Thank you for helping make log0 better.
