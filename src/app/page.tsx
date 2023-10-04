import Link from 'next/link'
import { getPosts } from '../lib/posts'
import { formatDate } from '../utils/formats'
import { Logo } from '../components/Logo'
import { SectionTitle } from '../components/SectionTitle'

export default function Page() {
  const posts = getPosts()

  return (
    <div>
      <div>
        <Logo />
      </div>

      <div className='mt-16'>
        <SectionTitle>About me</SectionTitle>

        <p className='mt-6 text-base leading-relaxed'>
          Ehi 👋 I'm an experienced Software Engineer with a strong knowledge in
          React / React Native and NodeJS. I also played with almost every other
          language out there including TypeScript, Scala, Rust and PureScript.
          Functional programming is my go-to paradigm when possible and I had
          the opportunity to use it extensively in my career.
        </p>
      </div>

      <div className='mt-20'>
        <SectionTitle>Writings</SectionTitle>

        <ul className='divide-gray-50 divide-y'>
          {posts.map((post) => (
            <li className='py-8'>
              <Link href={`/blog/${post.slug}`}>
                <article>
                  <h3 className='text-xl font-medium'>
                    {post.frontmatter.title}
                  </h3>

                  <div className='mt-2'>
                    <time className='text-sm text-gray-400'>
                      {formatDate(new Date(post.frontmatter.date))}
                    </time>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
