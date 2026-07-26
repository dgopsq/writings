# AGENTS.md

Personal blog at **diegopasquali.com**. Next.js App Router, static export,
TypeScript, Tailwind, pnpm. ~15 source files, 6 posts, single author, no tests.

## Read first

- [`docs/lessons.md`](docs/lessons.md) — hard-won rules from previous sessions.
- [`docs/architecture.md`](docs/architecture.md) — routes, content pipeline, module boundaries.
- [`docs/conventions.md`](docs/conventions.md) — code style and import rules.
- [`docs/writing-a-post.md`](docs/writing-a-post.md) — the frontmatter contract, shared with dev.to.
- [`docs/deployment.md`](docs/deployment.md) — what a push to `master` sets off. Read before pushing.

## Verification gates

```
pnpm compile      # tsc --noEmit
pnpm lint         # biome check
pnpm docs:check   # every route must appear in docs/architecture.md
pnpm build        # next build; emits out/ because next.config.mjs sets output:'export'
```

There are no tests. Those four commands are the whole bar, and CI runs exactly
them. Run them before committing.

When a change is meant to alter rendering, also read the built output in
`out/` — that is the only way to catch a silent regression here.

## Do not

- **Do not `git push`.** A push to `master` deploys to production **and**
  publishes every post to dev.to. There is no staging. Ask the human.
- **Do not read or trust `out/` or `.next/`.** Build artifacts, routinely
  stale.
- **Do not hand-edit the `id:` field in post frontmatter.** dev.to assigns it
  and the publish Action commits it back.
- **Do not replace the netgrep search.** It is abandoned upstream, but it is
  also the subject of a published post. If it breaks, say so rather than
  swapping it out.
- Do not add a dependency, linter or test runner without being asked. This repo
  is deliberately small.

## Style

No semicolons, single quotes, single-quoted JSX, trailing commas, 2-space
indent — all enforced by Biome, so let `pnpm lint:fix` apply it.

Imports are **relative**; there is no `@/` alias. Type-only imports must say
`import type`. Modules reachable from `scripts/prebuild.mts` import with
explicit `.ts` extensions, and Node builtins use `node:`. See
`docs/conventions.md` for why.

Server components by default — only `SearchWidget.tsx` and `useSearchPosts.ts`
are `'use client'`.

## Content pipeline

`src/posts/*.md` → `gray-matter` (`src/lib/posts/index.ts`) →
`next-mdx-remote/rsc` (`src/app/blog/[slug]/page.tsx`) → static HTML in `out/`.

The filename minus `.md` **is** the slug and the public URL. Post bodies are
Markdown compiled *through MDX*, so a bare `<` or `{` breaks the build.

## Hard-won rules

<!-- Promoted from docs/lessons.md by the prune-lessons skill.
     HARD CAP: 12 bullets. Adding a 13th means deleting the least useful one.
     One imperative sentence each. -->

- (none yet)
