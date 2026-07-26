import './style.css'

import { notFound } from 'next/navigation'
import { getPosts, getSinglePost } from '../../../lib/posts'
import { formatDate } from '../../../utils/formats'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next/types'

type Params = {
  slug: string
}

// Next 16 always passes `params` as a Promise; the sync-access shim added in
// 15 was removed.
type PageProps = {
  params: Promise<Params>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params
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
