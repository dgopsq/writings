import { BASE_URL } from './configs'

export function formatDate(d: Date): string {
  const formatted = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return formatted
}

export function generatePostUrl(slug: string): string {
  return `${BASE_URL}/posts/${slug}`
}
