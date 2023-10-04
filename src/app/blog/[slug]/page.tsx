import { getSinglePost } from '../../../lib/posts'

type Params = {
  slug: string
}

export default function Page({ params: { slug } }: { params: Params }) {
  const post = getSinglePost(slug)

  return (
    <div>
      <div className='mt-12'>
        <h2 className='text-6xl font-medium leading-snug'>
          {post.frontmatter.title}
        </h2>

        <div className='mt-10'>{post.content}</div>
      </div>
    </div>
  )
}
