import { Netgrep } from 'netgrep'
import { NetgrepInput } from 'netgrep/src/lib/data/NetgrepInput'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Post } from '../../lib/posts'

const NG = new Netgrep({})

type UseSearchPostValue = {
  search: (input: string) => void
  result: Array<Post> | null
}

/**
 * Hook that manages the search logic. This is
 * using `Netgrep` under the hood in order to perform
 * a `ripgrep` search on every post.
 */
export function useSearchPosts(posts: Array<Post>): UseSearchPostValue {
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

  // Execute the search logic using the `searchBatch`
  // function from `Netgrep`.
  useEffect(() => {
    if (!pattern) {
      setResult(null)
      return
    }

    NG.searchBatch(inputs, pattern).then((res) => {
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
