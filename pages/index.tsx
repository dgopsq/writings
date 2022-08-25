import { Netgrep } from 'netgrep'
import Posts from '../components/Posts'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import BigHeader from '../components/BigHeader'
import { generatePostsSearchTargets, getPosts, Post } from '../lib/posts'
import { generateFeed } from '../lib/feed'
import { useCallback, useEffect } from 'react'

type Props = {
  posts: Array<Post>
}

const NG = new Netgrep({})

const Home: React.FC<Props> = ({ posts }) => {
  const evt = useCallback(
    () =>
      NG.search(
        'https://sherlock-holm.es/stories/plain-text/advs.txt',
        'Sherlock',
      ).then(console.log),
    [],
  )

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
