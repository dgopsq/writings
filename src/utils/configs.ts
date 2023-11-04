/**
 * Misc
 */

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_TEST = process.env.NODE_ENV === 'test'

/**
 * Meta configs
 */

export const DEFAULT_TITLE = process.env.NEXT_PUBLIC_DEFAULT_TITLE || 'dgopsq'

export const DEFAULT_DESCRIPTION =
  process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION ||
  'Diego Pasquali, full stack engineer and tech enthusiast.'

/**
 * App base url
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://dgopsq.space'

/**
 * Insights (https://getinsights.io/)
 */

export const INSIGHTS_TOKEN =
  process.env.NEXT_PUBLIC_INSIGHTS_TOKEN || 'opLWOailQyAMF0c4'

/**
 * Search
 */

export const SEARCH_TARGET_DIR = process.env.SEARCH_TARGET_DIR || 'posts-meta'
