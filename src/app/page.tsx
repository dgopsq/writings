import { getPosts } from '../lib/posts'

export default function Page() {
  const posts = getPosts()

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li>{post.frontmatter.title}</li>
        ))}
      </ul>
    </div>
  )
}
