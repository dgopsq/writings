import { SearchWidget } from '../../components/SearchWidget'
import { getPosts } from '../../lib/posts'

export default function Page() {
  const posts = getPosts()

  return <SearchWidget posts={posts} />
}
