import Link from 'next/link'
import { getPosts } from '../lib/posts'
import { formatDate } from '../utils/formats'
import { Logo } from '../components/Logo'

export default function Page() {
  const posts = getPosts()

  return (
    <div>
      <div>
        <h1>
          <Logo />
        </h1>

        <div className='mt-2'>
          <span className='font-lg'>Software engineer and tech entusiast</span>
        </div>
      </div>

      <ul className='divide-gray-50 divide-y my-10'>
        {posts.map((post) => (
          <li className='py-8'>
            <Link href={`/blog/${post.slug}`}>
              <article>
                <h3 className='text-xl font-medium'>
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
