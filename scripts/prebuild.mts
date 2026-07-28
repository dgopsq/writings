/**
 * Generates the build-time artifacts that live in `public/` and are therefore
 * copied into `out/` by `next build`:
 *
 *   - public/rss/{feed.xml,atom.xml,feed.json}  (RSS/Atom/JSON feeds)
 *   - public/posts-meta/<slug>.txt              (plaintext search index)
 *
 * Both generators existed already but had been orphaned since the App Router
 * migration, when their call sites in `pages/index.tsx`'s getStaticProps were
 * dropped. This script is the replacement call site; `pnpm build` invokes it
 * as `pnpm generate` so `public/` is populated before Next copies it.
 *
 * It is deliberately NOT named `prebuild`: as an implicit npm pre-hook it
 * depended on the package manager choosing to run pre/post scripts, and a
 * deploy that skipped it produced a site with no feeds and a search index that
 * 404s — with a green build, because nothing fails when the files are absent.
 */

import { generateFeed } from '../src/lib/feed/index.ts'
import { generatePostsSearchTargets, getPosts } from '../src/lib/posts/index.ts'

const posts = getPosts()

generateFeed(posts)
generatePostsSearchTargets(posts)

console.log(
  `prebuild: generated feeds and ${posts.length} search targets for ${posts.length} published posts`,
)
