# AGENTS.md

Personal blog at **diegopasquali.com**. Next.js App Router, static export, TypeScript,
Tailwind, pnpm. ~15 source files, 6 posts, single author. No tests.

## Verification gates

```
pnpm compile   # tsc --noEmit — run after touching any .ts/.tsx
pnpm build     # next build; emits out/ because next.config.mjs sets output:'export'
```

"It compiles and builds" is the whole bar. Always run both before committing.

## Do not

- **Do not `git push`.** A push to `master` deploys to production **and** publishes
  every post to dev.to. There is no staging. Ask the human to push.
- **Do not read or trust `out/` or `.next/`.** They are build artifacts, routinely
  stale, and have previously contained posts that no longer exist in `src/posts/`.
- **Do not hand-edit the `id:` field in post frontmatter.** dev.to assigns it and the
  `sinedied/publish-devto` Action commits it back as a bot commit. Writing one by hand
  points the sync at someone else's article.
- Do not add a dependency, linter, or test runner without being asked. This repo is
  deliberately small.

## Style

Formatting: no semicolons, single quotes, `jsxSingleQuote`, trailing commas, 2-space indent.

All imports are **relative** (`../../lib/posts`) — there are no path aliases.

Everything is a **server component** unless it needs browser APIs. Only
`src/components/SearchWidget.tsx` and `src/utils/hooks/useSearchPosts.ts` carry
`'use client'`.

## Content pipeline

`src/posts/*.md` → `gray-matter` (`src/lib/posts/index.ts`) → `next-mdx-remote/rsc`
(`src/app/blog/[slug]/page.tsx`) → static HTML in `out/`.

The filename minus `.md` **is** the slug and the public URL. Post bodies are Markdown
rendered *through MDX*, so bare `<` and `{` are parsed as JSX and will break the build.
