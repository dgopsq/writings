import Posts from '../components/Posts'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import BigHeader from '../components/BigHeader'
import { generatePostsSearchTargets, getPosts, Post } from '../lib/posts'
import { generateFeed } from '../lib/feed'
import { useSearchPosts } from '../utils/hooks/useSearchPosts'
import { SearchInput } from '../components/SearchInput'

type Props = {
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ posts }) => {
  const { search, result } = useSearchPosts(posts)

  const computedPosts = result !== null ? result : posts
  const isSearching = result !== null

  return (
    <>
      <header className='header'>
        <BigHeader />
      </header>

      <div className='content'>
        <div className='search'>
          <Layout>
            <SearchInput onChangeText={search} />
          </Layout>
        </div>

        <div className='posts'>
          <Layout>
            <Posts posts={computedPosts} isSearching={isSearching} />
          </Layout>
        </div>
      </div>

      <footer className='footer'>
        <Footer />
      </footer>

      <style jsx>{`
        .content {
          padding: 7em 0em;
          min-height: 60em;
        }

        .posts {
          padding-top: 4em;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const posts = getPosts()

  // Generate the RSS feed.
  generateFeed(posts)

  // Generate search targets
  generatePostsSearchTargets(posts)

  return {
    props: {
      posts,
    },
  }
}

export default Home
