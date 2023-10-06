import { Logo } from '../../components/Logo'
import { SearchWidget } from '../../components/SearchWidget'
import { getPosts } from '../../lib/posts'

export default function Page() {
  const posts = getPosts()

  return (
    <div>
      <div>
        <Logo />
      </div>

      <div className='mt-12'>
        <SearchWidget posts={posts} />
      </div>
    </div>
  )
}
