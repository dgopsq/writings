import React from 'react'
import { Post } from '../lib/posts'
import Link from 'next/link'
import { formatDate } from '../utils/formats'

type Props = {
  posts: Array<Post>
}

/**
 * The main posts list used in the website.
 */
export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className='divide-gray-50 divide-y'>
      {posts.map((post) => (
        <li className='py-8' key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <article>
              <h3 className='text-xl font-medium'>{post.frontmatter.title}</h3>

              <div className='mt-2'>
                <time className='text-sm text-gray-400'>
                  {formatDate(new Date(post.frontmatter.date))}
                </time>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  )
}
