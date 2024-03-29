import './style.css'

import { notFound } from 'next/navigation'
import { getPosts, getSinglePost } from '../../../lib/posts'
import { formatDate } from '../../../utils/formats'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import { Metadata } from 'next'

type Params = {
  slug: string
}

export async function generateMetadata({
  params: { slug },
}: {
  params: Params
}): Promise<Metadata> {
  const post = getSinglePost(slug)

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default function Page({ params: { slug } }: { params: Params }) {
  const post = getSinglePost(slug)

  if (!post.content) return notFound()

  return (
    <article>
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
    </article>
  )
}
