import './style.css'

import { notFound } from 'next/navigation'
import { getSinglePost } from '../../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeExternalLinks from 'rehype-external-links'

type Params = {
  slug: string
}

export default function Page({ params: { slug } }: { params: Params }) {
  const post = getSinglePost(slug)

  if (!post.content) return notFound()

  return (
    <div>
      <div className='mt-12'>
        <h2 className='text-6xl font-medium leading-snug'>
          {post.frontmatter.title}
        </h2>

        <div className='post-content mt-10'>
          <MDXRemote
            options={{
              mdxOptions: {
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
    </div>
  )
}
