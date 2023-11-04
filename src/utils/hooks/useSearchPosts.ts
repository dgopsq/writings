'use client'

import { NetgrepInput } from '@netgrep/netgrep/src/lib/data/NetgrepInput'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Post } from '../../lib/posts'
import type { Netgrep } from '@netgrep/netgrep'

type UseSearchPostValue = {
  search: (input: string) => void
  result: Array<Post> | null
}

/**
 * Hook that manages the search logic. This is
 * using `Netgrep` under the hood in order to perform
 * a `ripgrep` search on every post.
 *
 * Disclaimer: This is just an example of how to use Ripgrep. It doesn't
 * actually make sense to load each post in order to perform a search, instead
 * you should just use posts metadata from somewhere else.
 */
export function useSearchPosts(posts: Array<Post>): UseSearchPostValue {
  const [ng, setNg] = useState<Netgrep | null>(null)
  const [pattern, setPattern] = useState('')
  const [result, setResult] = useState<Array<Post> | null>(null)

  // Compute the `Netgrep` input just when the given
  // `posts` array changes.
  const inputs: Array<NetgrepInput<{ post: Post }>> = useMemo(
    () =>
      posts.map((post) => ({
        url: post.searchTarget,
        metadata: { post },
      })),
    [posts],
  )

  useEffect(() => {
    const load = async () => {
      const Netgrep = (await import('@netgrep/netgrep')).Netgrep
      setNg(new Netgrep())
    }

    load()
  }, [])

  // Execute the search logic using the `searchBatch`
  // function from `Netgrep`.
  useEffect(() => {
    if (!pattern || !ng) {
      setResult(null)
      return
    }

    ng.searchBatch(inputs, pattern).then((res) => {
      const filtered: Array<Post> = []

      res.forEach((single) =>
        single.result && single.metadata
          ? filtered.push(single.metadata.post)
          : undefined,
      )

      setResult(filtered)
    })
  }, [pattern, inputs, setResult])

  // Create a search method.
  const search = useCallback((input: string) => setPattern(input), [setPattern])

  return {
    search,
    result,
  }
}
