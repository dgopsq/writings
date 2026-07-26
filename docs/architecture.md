# Architecture

A personal blog rendered entirely at build time. There is no server, no
database and no API: `next build` turns six Markdown files into static HTML,
and Cloudflare Pages serves the result.

## Routes

| Route | File | Rendering |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Static. Lists all published posts. |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | One static page per post via `generateStaticParams`. |
| `/search` | `src/app/search/page.tsx` | Static shell; the widget inside is `'use client'`. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Static route handler (`dynamic = 'force-static'`). |

`src/app/layout.tsx` is the root layout: Inter via `next/font/google`, a
`max-w-3xl` container, the footer, and all the site-wide metadata.
`src/app/blog/[slug]/layout.tsx` adds the logo above post bodies.

## Content pipeline

```
src/posts/<slug>.md
  │
  ├─ src/lib/posts/index.ts ─ readdirSync + gray-matter → Post
  │     • the filename minus .md IS the slug and the public URL
  │     • `tags` is a comma-separated STRING, split into string[]
  │     • `id` (the dev.to article id) surfaces as frontmatter.devToId
  │     • `published: false` is filtered out by getPosts()
  │     • a missing `date` silently defaults to now — always set it
  │
  ├─ src/app/blog/[slug]/page.tsx ─ <MDXRemote> from next-mdx-remote/rsc
  │     remark:  remark-gfm
  │     rehype:  rehype-pretty-code (github-light, via shiki), rehype-external-links
  │
  └─ out/blog/<slug>.html
```

Post bodies are Markdown compiled **through MDX**, so a bare `<` or `{` in
prose is parsed as JSX and breaks the build.

## Build-time artifacts

`scripts/prebuild.mts` runs from the `prebuild` npm hook, before `next build`,
and writes into `public/` so Next copies the results into `out/`:

- `public/rss/{feed.xml,atom.xml,feed.json}` — from `src/lib/feed/index.ts`
- `public/posts-meta/<slug>.txt` — plaintext post bodies (remark +
  strip-markdown) that the search widget fetches

Both directories are gitignored. They are build output, not source.

The script runs under Node's native TypeScript support. That is why the
handful of modules it pulls in import each other with explicit `.ts`
extensions — Node resolves them as ESM, which requires them — and why
`tsconfig.json` sets `allowImportingTsExtensions`.

## Search

`src/components/SearchWidget.tsx` and `src/utils/hooks/useSearchPosts.ts` are
the only client components in the app. They dynamically import
`@netgrep/netgrep`, a ripgrep build compiled to WebAssembly, and run regex
queries against the `posts-meta` text files over HTTP. Nothing is indexed
server-side.

`@netgrep/netgrep` has had no release since 2022. It works under Turbopack —
verified — but it is the most likely thing to break in a future Next upgrade.
The subject of one of the posts, so do not quietly replace it.

## Configuration

`src/utils/configs.ts` holds `BASE_URL`, `SITE_NAME`, `DEFAULT_DESCRIPTION`
and `SEARCH_TARGET_DIR`. The apex domain is canonical — `www` 301s to it — so
generated URLs must use `BASE_URL` rather than hardcoding a host.

`next.config.mjs` sets `output: 'export'`, `trailingSlash: false`,
`typedRoutes` (a bad `<Link href>` is a compile error, not a runtime 404) and
`experimental.useTypeScriptCli`, which is needed because TypeScript 7 is the
Go-native compiler and does not expose the JS compiler API Next expects.
