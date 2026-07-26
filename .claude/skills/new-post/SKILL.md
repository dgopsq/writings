---
name: new-post
description: Create a new blog post in src/posts/ with correct frontmatter for both this site and the dev.to sync. Use when the user wants to write, draft, or add a new post or article, or asks to set up the file for one.
---

# Writing a new post

The frontmatter is a contract with **two** consumers — this site and the dev.to
sync — and several of its rules are invisible from the code. Follow this rather
than copying an existing post blindly.

Full prose reference: `docs/writing-a-post.md`.

## 1. Pick the slug

Ask the user if it is not obvious. The filename minus `.md` becomes the slug,
the public URL and the dev.to canonical URL, and it is **permanent** — changing
it later breaks the published URL and orphans the dev.to article.

Kebab-case, ASCII, no dates in the name.

## 2. Create `src/posts/<slug>.md`

```yaml
---
title: '<title>'
description: '<one sentence — used for the meta description and the OG card>'
date: '<ISO-8601, e.g. 2026-07-27T09:00:00Z>'
tags: 'tag-one, tag-two'
published: true
canonical_url: 'https://diegopasquali.com/blog/<slug>'
---
```

Rules that actually bite:

- **`tags` is a comma-separated string, not a YAML list.**
  `src/lib/posts/index.ts` calls `.split(',')` on it; a YAML list breaks
  parsing.
- **Always set `date`, quoted.** If it is missing, `parsePostFile` silently
  defaults to `new Date()` and the post jumps to the top of the list.
- **`canonical_url` must use the apex**, `https://diegopasquali.com/...`, and
  must match the slug. `www` 301s, so pointing dev.to at it wastes the
  canonical.
- **Never write an `id` field.** dev.to assigns it and commits it back. See the
  `devto-id-writeback` entry in `docs/lessons.md`.
- Use `published: false` for a draft. It keeps the post out of the site, the
  feeds, the sitemap, the search index and dev.to.

## 3. Write the body

Markdown, but compiled through MDX:

- A bare `<` or `{` is parsed as JSX and **breaks the build**. Escape it or put
  it in backticks.
- Always tag fenced code blocks with a language — they are highlighted by
  `rehype-pretty-code` with the `github-light` theme.
- GFM is on: tables, strikethrough, task lists.

## 4. Verify

```
pnpm build
```

Confirm `out/blog/<slug>.html` exists and reads correctly. The build's prebuild
hook also regenerates the feeds and the search index, so the post becomes
searchable with no extra step.

## 5. Stop there

Do not commit unless asked, and **do not push**. A push to `master` deploys to
production and publishes to dev.to, with no staging.
