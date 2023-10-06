import Link from 'next/link'
import { getPosts } from '../lib/posts'
import { formatDate } from '../utils/formats'
import { Logo } from '../components/Logo'
import { SectionTitle } from '../components/SectionTitle'
import { Metadata } from 'next'
import { PostsList } from '../components/PostsList'

export const metadata: Metadata = {
  title: 'Diego Pasquali',
  description: 'Software Engineer and tech entusiast.',
}

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
        <PostsList posts={posts} />
      </div>
    </div>
  )
}
