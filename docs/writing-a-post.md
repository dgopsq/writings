# Writing a post

Create `src/posts/<slug>.md`. That is the whole workflow — there is no CMS and
no scaffolding step.

## The slug

The filename minus `.md` is the slug, the public URL, and the dev.to canonical
URL. Kebab-case, ASCII, no dates in the name. **It is permanent**: changing it
breaks the published URL and orphans the dev.to article.

## Frontmatter

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

This block has **two consumers** — this site and the dev.to sync — and most of
the sharp edges come from that.

| Field | Notes |
| --- | --- |
| `title` | Also the `<title>`, rendered as `<title> — Diego Pasquali`. |
| `description` | Used for the meta description and the Open Graph / Twitter cards. Write it; there is no fallback. |
| `date` | Quoted ISO-8601. **If omitted it silently defaults to now**, and the post jumps to the top of the list. |
| `tags` | A comma-separated **string**, not a YAML list. `src/lib/posts/index.ts` calls `.split(',')` on it — a list breaks parsing. Becomes `article:tag` metadata. |
| `published` | `false` keeps the post out of the site, the feeds, the sitemap and the search index. Absent means published. |
| `canonical_url` | `https://diegopasquali.com/blog/<slug>`. Apex, not `www` — `www` 301s, and pointing dev.to at a redirect wastes the canonical. |
| `id` | **Never write this by hand.** dev.to assigns it and the `sinedied/publish-devto` Action commits it back as `chore: update published articles [skip ci]`. Writing one points the sync at someone else's article. |

## Body

Markdown, but compiled through MDX. Consequences:

- A bare `<` or `{` is parsed as JSX and **breaks the build**. Escape them or
  wrap them in backticks.
- Fenced code blocks are highlighted by `rehype-pretty-code` with the
  `github-light` theme, so always tag the language.
- GitHub-flavoured Markdown is on (tables, strikethrough, task lists).
- External links get `target="_blank"` and `rel` attributes automatically.

## Checking it

```
pnpm build
```

Then confirm `out/blog/<slug>.html` exists and reads correctly. The build also
regenerates the feeds and the search index, so the new post becomes findable
in `/search` without any extra step.

`pnpm dev` works for iterating on prose.

## Publishing

Merging to `master` deploys to Cloudflare Pages **and** publishes to dev.to.
There is no staging. See [deployment.md](./deployment.md).
