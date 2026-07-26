/**
 * App base url.
 *
 * The apex is canonical: www.diegopasquali.com 301s here, so every generated
 * URL (feeds, canonical tags, sitemap) must use this form.
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://diegopasquali.com'

/**
 * Site identity, shared by page metadata and the generated feeds.
 */

export const SITE_NAME = 'Diego Pasquali'

export const DEFAULT_DESCRIPTION = 'Software Engineer and tech enthusiast.'

/**
 * Directory under `public/` holding the plaintext search index, one file per
 * post. Written by scripts/prebuild.mts, fetched at runtime by the search
 * widget via `Post.searchTarget`.
 */

export const SEARCH_TARGET_DIR = process.env.SEARCH_TARGET_DIR || 'posts-meta'
