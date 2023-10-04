import { getPosts } from '../lib/posts'

export default function Page() {
  const posts = getPosts()

  return (
    <div>
      <ul className='divide-gray-50 divide-y'>
        {posts.map((post) => (
          <li className='py-8'>{post.frontmatter.title}</li>
        ))}
      </ul>
    </div>
  )
}
