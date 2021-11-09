import { getPostsSlugs, getSinglePost, Post } from '../../lib/posts'
import Markdown from '../../components/Markdown'
import Layout from '../../components/Layout'
import SmallHeader from '../../components/SmallHeader'
import Footer from '../../components/Footer'
import PostTitle from '../../components/PostTitle'
import Head from 'next/head'
import Seo from '../../components/Seo'
import { generatePostUrl } from '../../utils/formats'
import { DEFAULT_TITLE } from '../../utils/configs'

type Props = {
  post?: Post
}

const SinglePost: React.FC<Props> = ({ post }) => {
  if (!post) return null

  const postDate = new Date(post.frontmatter.date)

  return (
    <>
      <Seo
        title={`${post.frontmatter.title} — ${DEFAULT_TITLE}`}
        description={post.frontmatter.description}
        url={generatePostUrl(post.slug)}
        canonical={generatePostUrl(post.slug)}
        tags={post.frontmatter.tags}
        date={postDate}
      />

      <header className='header'>
        <SmallHeader />
      </header>

      <article>
        <Layout>
          <PostTitle
            value={post.frontmatter.title}
            date={postDate}
            tags={post.frontmatter.tags}
            big
          />

          <div className='post-content'>
            <Markdown source={post.content} />
          </div>
        </Layout>
      </article>

      <footer className='footer'>
        <Footer />
      </footer>

      <style jsx>{`
        article {
          padding: 7em 0em;
        }

        article .post-content {
          margin-top: 3em;
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getPostsSlugs()

  const paths = slugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const post = getSinglePost(slug)

  return {
    props: {
      post,
    },
  }
}

export default SinglePost
