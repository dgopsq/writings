import { useEffect } from 'react'
import useFetch from 'use-http'

type DevToResponse = {
  url: string
}

type Props = {
  id: string
}

/**
 * Component used to generate the dev.to link.
 * It will trigger an HTTP request to fetch the article
 * using the relative id.
 */
export const DevToLink: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useFetch<DevToResponse>(
    `https://dev.to/api/articles/${id}`,
    { retries: 3 },
    [],
  )

  if (loading || error) return null

  const url = `${data.url || '#'}`

  return (
    <a href={url} target='_blank' rel='noopener'>
      Read on DEV
    </a>
  )
}
