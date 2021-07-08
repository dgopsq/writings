import Posts from '../components/Posts'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import BigHeader from '../components/BigHeader'
import { getPosts, Post } from '../lib/posts'

type Props = {
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <header className='header'>
        <BigHeader />
      </header>

      <div className='posts'>
        <Layout>
          <Posts posts={posts} />
        </Layout>
      </div>

      <footer className='footer'>
        <Footer />
      </footer>

      <style jsx>{`
        .posts {
          padding: 7em 0em;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  const posts = getPosts()

  return {
    props: {
      posts,
    },
  }
}

export default Home
