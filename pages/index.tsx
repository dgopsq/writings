import { colors } from '../theme'
import Posts from '../components/Posts'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import BigHeader from '../components/BigHeader'

const Home = () => {
  return (
    <>
      <header className='header'>
        <BigHeader />
      </header>

      <div className='posts'>
        <Layout>
          <Posts />
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

export default Home
