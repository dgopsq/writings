# Conventions

## Formatting and linting

Biome does both. `biome.json` is the only config; there is no ESLint and no
Prettier.

```
pnpm lint       # check
pnpm lint:fix   # check and apply safe fixes
pnpm format     # format only
```

Style, all enforced by Biome so you should never need to apply it by hand: no
semicolons, single quotes, single-quoted JSX attributes, trailing commas,
2-space indent.

## Imports

Relative, and **not** aliased — there is no `@/` path mapping. From
`src/app/blog/[slug]/page.tsx` that means `../../../lib/posts`.

Two exceptions, both deliberate:

- Modules reachable from `scripts/prebuild.mts` import each other with an
  explicit `.ts` extension. Node runs that script directly and resolves as
  ESM, which requires the extension. Currently: `src/lib/posts/index.ts`,
  `src/lib/feed/index.ts`, `src/utils/configs.ts`, `src/utils/formats.ts`.
- Node builtins use the `node:` protocol (`node:fs`, `node:path`).

Type-only imports must say `import type`. Biome enforces it, and the prebuild
script genuinely depends on it: Node's type stripping cannot tell a type-only
export from a value one, so a plain `import { Post }` fails at runtime.

## Components

Server components by default. Only add `'use client'` when the code needs
browser APIs — today that is just `SearchWidget.tsx` and `useSearchPosts.ts`.
Everything reachable from a server component runs at build time, including
`fs` access.

Components live flat in `src/components/`, one per file, named export, typed
with an explicit `Props` type.

## TypeScript

`strict` is on. `pnpm compile` (`tsc --noEmit`) must pass before any commit;
`next build` type-checks too, but `pnpm compile` is faster and gives better
errors.

The `Metadata` type comes from `next/types`, not `next` — Next 16's top-level
re-export does not surface it to TypeScript.

## CSS

Tailwind 4, configured in CSS. There is no `tailwind.config.js`; theme values
are CSS custom properties.

`src/app/global.css` imports Tailwind. `src/app/blog/[slug]/style.css` holds
prose styles for rendered post bodies and needs `@reference "tailwindcss"` at
the top so build-time `theme()` substitution works inside `@media`, where
`var()` is not allowed.

Use `var(--text-base)`, `var(--color-gray-100)`, `calc(var(--spacing) * 4)`.
The v3 spellings — `theme(fontSize.base)` dot notation and `screen(md)` — are
gone.

## Testing

There are none, and that is a deliberate choice for a six-post blog. The
verification bar is `pnpm compile && pnpm lint && pnpm build`, plus looking at
the built output in `out/` when a change is meant to alter rendering.
