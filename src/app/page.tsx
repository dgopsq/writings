import Link from 'next/link'
import { getPosts } from '../lib/posts'
import { formatDate } from '../utils/formats'

export default function Page() {
  const posts = getPosts()

  return (
    <div>
      <ul className='divide-gray-50 divide-y'>
        {posts.map((post) => (
          <li className='py-8'>
            <Link href={`/blog/${post.slug}`}>
              <article>
                <h3 className='text-lg font-medium'>
                  {post.frontmatter.title}
                </h3>

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
    </div>
  )
}
