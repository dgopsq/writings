import './style.css'

import { notFound } from 'next/navigation'
import { getSinglePost } from '../../../lib/posts'
import { formatDate } from '../../../utils/formats'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'

type Params = {
  slug: string
}

export default function Page({ params: { slug } }: { params: Params }) {
  const post = getSinglePost(slug)

  if (!post.content) return notFound()

  return (
    <div>
      <div className='mt-4'>
        <h2 className='text-4xl font-medium leading-normal md:text-6xl md:leading-snug'>
          {post.frontmatter.title}
        </h2>
      </div>

      <div className='mt-6'>
        <time className='text-base text-gray-400'>
          {formatDate(new Date(post.frontmatter.date))}
        </time>
      </div>

      <div className='post-content mt-16'>
        <MDXRemote
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  { theme: 'github-light', keepBackground: false },
                ],
                rehypeExternalLinks,
              ],
            },
          }}
          source={post.content}
        />
      </div>
    </div>
  )
}
