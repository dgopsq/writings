import { Metadata } from 'next'
import { Footer } from '../components/Footer'
import './global.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Diego Pasquali',
  description: 'Software Engineer and tech entusiast.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <link
          rel='icon'
          href='/icon?<generated>'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>

      <body>
        <div className='mx-auto max-w-3xl px-4 pt-28 pb-48'>
          <div>{children}</div>

          <div className='mt-16'>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
