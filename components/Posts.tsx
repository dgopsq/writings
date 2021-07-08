import Link from 'next/link'
import { Post } from '../lib/posts'
import { getHeaderFontFamily } from '../theme'
import PostTitle from './PostTitle'

type Props = {
  posts: Array<Post>
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <div className='wrapper'>
        {!posts.length ? (
          <div className='fallback'>
            <div className='icon'>👨‍💻</div>
          </div>
        ) : (
          <ul className='posts'>
            {posts.map((post) => (
              <li className='posts-item' key={post.slug}>
                <Link href={`/blog/[slug]`} as={`/blog/${post.slug}`}>
                  <a>
                    <PostTitle
                      value={post.frontmatter.title}
                      date={new Date(post.frontmatter.date)}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          text-align: center;

          font-family: ${getHeaderFontFamily()};
        }

        .fallback .icon {
          font-size: 2em;
        }

        .posts {
          list-style-type: none;
          padding: 0em;
          margin: 0em;
        }

        .posts .posts-item {
          text-align: left;
        }

        .posts .posts-item:not(:first-child) {
          margin-top: 3em;
        }

        .posts .posts-item a {
          text-decoration: none;
        }
      `}</style>
    </>
  )
}

export default Posts
