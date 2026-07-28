'use client'

import type { Netgrep } from '@netgrep/netgrep'
import type { NetgrepInput } from '@netgrep/netgrep/src/lib/data/NetgrepInput'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Post } from '../../lib/posts'

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
      const filtered = res
        .filter((single) => single.result && single.metadata)
        .map((single) => (single.metadata as { post: Post }).post)

      setResult(filtered)
    })
    // `ng` belongs here: it starts null and is set once the netgrep WASM
    // module finishes loading. Without it a pattern typed before that point
    // would never be searched.
  }, [pattern, inputs, ng])

  // Create a search method.
  const search = useCallback((input: string) => setPattern(input), [])

  return {
    search,
    result,
  }
}
