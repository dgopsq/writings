# 📚 Writings

This is my personal 🪐 **s p a c e** ☄️, here I write stuff about technology
(and maybe something else too in the future). It lives at
**[diegopasquali.com](https://diegopasquali.com)**.

## Stack

A statically exported **Next.js** App Router site written in **TypeScript**.
There is no server, no database and no API — `next build` turns a handful of
Markdown files into HTML, and a CDN serves them. For a blog that is the whole
job, and it makes the site free to host and impossible to take down with
traffic.

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Language | TypeScript 7, React 19 |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Content | Markdown → `gray-matter` → `next-mdx-remote/rsc` |
| Highlighting | `rehype-pretty-code` + Shiki |
| Search | [`netgrep`](https://github.com/dgopsq/netgrep) — ripgrep, compiled to WASM |
| Tooling | Biome (lint + format), pnpm, Node 24 |

Everything renders as a server component except the search widget.

## How content works

A post is one Markdown file in `src/posts/`. The filename minus `.md` is the
slug and the public URL.

```
src/posts/<slug>.md  →  gray-matter  →  <MDXRemote>  →  out/blog/<slug>.html
```

Frontmatter is shaped for **two** consumers — this site and the dev.to sync:

```yaml
---
title: 'A ripgrep-powered Search Engine on the web'
description: 'How I ported ripgrep to WASM in order to create a Search Engine for my blog.'
date: '2022-09-09T09:49:23Z'
tags: 'search, typescript, rust, grep'
published: true
canonical_url: 'https://diegopasquali.com/blog/ripgrep-powered-search-engine-on-the-web'
---
```

Two things worth knowing: `tags` is a comma-separated **string**, not a YAML
list, and `id` (absent above) is the dev.to article id — dev.to assigns it and
commits it back, so it should never be written by hand. `published: false`
keeps a post off the site, out of the feeds and sitemap, and off dev.to.

Bodies are Markdown compiled *through* MDX, so a bare `<` or `{` in prose is
parsed as JSX and breaks the build.

Before each build, `scripts/prebuild.mts` regenerates two sets of artifacts
from `src/posts` into `public/` — the RSS/Atom/JSON feeds, and the plaintext
search index. Both are gitignored; they are build output, not source.

Full details in [`docs/writing-a-post.md`](docs/writing-a-post.md).

## Search

The search field runs [**ripgrep**](https://github.com/BurntSushi/ripgrep) in
your browser. `netgrep` is a WASM build of ripgrep's matching engine that
fetches the plaintext copy of each post over HTTP and runs a real regex search
against it — no index, no server, no search-as-a-service.

It is a deliberate experiment rather than the sensible choice, and there is
[a post about how it works](https://diegopasquali.com/blog/ripgrep-powered-search-engine-on-the-web).

## Local development

Requires [pnpm](https://pnpm.io) and the Node version pinned in
`.node-version` (24.18.0).

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Runs `prebuild`, then builds the static site into `out/` |
| `pnpm start` | Serves a production build |
| `pnpm compile` | `tsc --noEmit` |
| `pnpm lint` | Biome lint + format check |
| `pnpm lint:fix` | Biome, applying safe fixes |
| `pnpm format` | Format only |
| `pnpm docs:check` | Fails if a route is missing from `docs/architecture.md` |
| `pnpm prebuild` | Regenerates the feeds and the search index |

There are no tests. `pnpm compile && pnpm lint && pnpm build` is the bar, and
CI runs exactly that on every pull request.

## Deployment

A push to `master` sets off two independent things, and there is no staging.

**1. [Cloudflare Pages](https://pages.cloudflare.com/)** rebuilds and deploys.
Its configuration lives in the Cloudflare dashboard rather than in this repo,
so for the record: build command `pnpm build`, output directory `out`, Node
version from `.node-version`, production branch `master`.

**2. The dev.to sync** (`.github/workflows/main.yml`) pushes every post to
[dev.to](https://dev.to/dgopsq) via `sinedied/publish-devto`, matching articles
on the `id` frontmatter field and writing it back as a bot commit. The
`canonical_url` field tells dev.to that this site is the original, so the
syndicated copy does not compete with it in search results.

The apex domain is canonical — `www.diegopasquali.com` redirects to it.

More in [`docs/deployment.md`](docs/deployment.md).

## Repo map

```
src/
  app/          routes: / , /blog/[slug] , /search , sitemap.ts , layout + global.css
  components/   presentational components, one per file
  lib/
    posts/      reads and parses src/posts, generates the search index
    feed/       generates the RSS/Atom/JSON feeds
  utils/        config constants, formatting, the search hook
  posts/        the actual writing — one Markdown file per post
scripts/        prebuild (feeds + search index), docs freshness check
docs/           architecture, conventions, writing a post, deployment, lessons
public/         static assets; also where generated feeds and search index land
```

## Working on this with an AI agent

The repo is set up for coding agents: [`AGENTS.md`](AGENTS.md) is the
tool-agnostic entry point, with the detail split across [`docs/`](docs). Claude
Code additionally gets skills for the repetitive jobs (writing a post,
recording a lesson) and a small memory loop that keeps
[`docs/lessons.md`](docs/lessons.md) — mistakes worth not repeating — read at
the start of every session and appended to at the end of one that hit
something.
