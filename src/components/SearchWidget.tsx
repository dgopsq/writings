'use client'

import { ChangeEventHandler, useCallback, useMemo, useRef } from 'react'
import { Post } from '../lib/posts'
import { useSearchPosts } from '../utils/hooks/useSearchPosts'
import { debounce } from '../utils/debounce'
import { A } from './A'
import Link from 'next/link'
import { PostsList } from './PostsList'

const disclaimerLinkClasses = 'underline font-medium'

type Props = {
  posts: Array<Post>
}

/**
 * The client-side search widget.
 */
export const SearchWidget: React.FC<Props> = ({ posts }) => {
  const inputRef = useRef<HTMLInputElement>(null)
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
      <p className='text-base text-gray-400 leading-relaxed'>
        This search engine uses{' '}
        <A
          href='https://github.com/BurntSushi/ripgrep'
          className={disclaimerLinkClasses}
        >
          ripgrep
        </A>{' '}
        under the hood through the{' '}
        <A
          href='https://github.com/dgopsq/netgrep'
          className={disclaimerLinkClasses}
        >
          netgrep
        </A>{' '}
        library. To learn more, try searching for{' '}
        <code className='px-1 py-0.5 border border-gray-200 rounded-md'>
          netgrep
        </code>{' '}
        in the input below! 🙂
      </p>

      <div className='mt-6'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search...'
          onChange={handleSearchQueryChange}
          className='p-4 border border-gray-100 rounded-md w-full bg-gray-50 focus:border-gray-200 outline-none'
        />
      </div>

      {result ? (
        <div className='mt-10'>
          <div className='relative'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-t border-gray-100' />
            </div>
            <div className='relative flex justify-center'>
              <span className='bg-white px-2 text-sm text-gray-300'>
                {result.length > 0 ? `Results` : 'No posts found 😔'}
              </span>
            </div>
          </div>

          {result.length > 0 ? <PostsList posts={result} /> : undefined}
        </div>
      ) : undefined}
    </div>
  )
}
