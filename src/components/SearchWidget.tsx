'use client'

import { ChangeEventHandler, useMemo } from 'react'
import { Post } from '../lib/posts'
import { useSearchPosts } from '../utils/hooks/useSearchPosts'
import { debounce } from '../utils/debounce'

type Props = {
  posts: Array<Post>
}

/**
 *
 */
export const SearchWidget: React.FC<Props> = ({ posts }) => {
  const { search, result } = useSearchPosts(posts)

  const handleSearchQueryChange = useMemo<ChangeEventHandler<HTMLInputElement>>(
    () =>
      debounce((event) => {
        const { value } = event.target
        search(value)
      }, 500),
    [search],
  )

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        onChange={handleSearchQueryChange}
      />

      {result ? (
        <ul>
          {result.map((post) => (
            <li key={post.slug}>{post.frontmatter.title}</li>
          ))}
        </ul>
      ) : undefined}
    </div>
  )
}
