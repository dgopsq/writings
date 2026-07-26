import type { MetadataRoute } from 'next/types'
import { getPosts } from '../lib/posts'
import { BASE_URL } from '../utils/configs'

/**
 * Next's sitemap file convention. Emitted as a static /sitemap.xml because the
 * site builds with output: 'export', which is also why the route has to opt
 * into force-static explicitly.
 */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: posts[0] ? new Date(posts[0].frontmatter.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/search`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...postEntries,
  ]
}
