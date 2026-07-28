# Deployment

A push to `master` does two independent things. Neither is reversible from the
repo, and there is no staging environment.

## 1. Cloudflare Pages

Cloudflare watches `master` and rebuilds on every commit. **The configuration
lives in the Cloudflare dashboard, not in this repository** — there is no
`wrangler.toml`. Recorded here because nothing else records it:

| Setting | Value |
| --- | --- |
| Build command | `pnpm build` |
| Output directory | `out` |
| Node version | from `.node-version` (currently 24.18.0) |
| Production branch | `master` |

The build command must be **`pnpm build`**, not `next build` or `npx next
build`. `pnpm build` runs `pnpm generate` first, which regenerates the feeds
and the search index from `src/posts`. They are gitignored and never
committed, so a build that skips the generator deploys a site whose feeds and
whose every search result 404 — and it deploys green, because nothing in the
build fails when they are absent.

After a deploy, `curl -I https://diegopasquali.com/rss/feed.xml` is the
cheapest check that the generator ran.

The apex `diegopasquali.com` is canonical; `www` 301s to it.

## 2. dev.to sync

`.github/workflows/main.yml` pushes `src/posts/*.md` to dev.to on every push to
`master`, using `sinedied/publish-devto`.

- It matches articles by the `id` frontmatter field, and writes that field back
  as a bot commit (`chore: update published articles [skip ci]`) for posts that
  did not have one.
- `canonical_url` tells dev.to this site is the original, which is what keeps
  the syndicated copy from competing in search results.
- `published: false` keeps a post out of dev.to as well as off the site.
- Because it fires on every push to `master`, **any** merge re-syncs all six
  posts, even one that only touched CSS.

Secrets: `DEVTO_TOKEN` and `PERSONAL_GITHUB_TOKEN`, both in repository
settings.

## CI

`.github/workflows/ci.yml` runs on pull requests and on `master`: install with
a frozen lockfile, then `pnpm compile`, `pnpm lint` and `pnpm build`. It is the
only thing standing between a broken build and production, since Cloudflare
deploys whatever `master` contains.

## Verifying a deploy

1. Watch the Actions tab for the CI run and the dev.to publish.
2. Check the Cloudflare Pages dashboard for the build.
3. Confirm the change is live, and that `https://diegopasquali.com/sitemap.xml`
   and `/rss/feed.xml` still list the expected posts.

## Rolling back

Cloudflare Pages keeps previous deployments and can promote an older one from
the dashboard — that is the fastest fix for a bad deploy. Reverting the commit
on `master` also works but triggers another dev.to sync.
