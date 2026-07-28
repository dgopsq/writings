import type { Metadata } from 'next/types'
import { Footer } from '../components/Footer'
import { BASE_URL, DEFAULT_DESCRIPTION, SITE_NAME } from '../utils/configs'
import './global.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  // Without metadataBase every relative URL below stays relative, and Open
  // Graph consumers require absolute ones.
  metadataBase: new URL(BASE_URL),

  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: BASE_URL }],

  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: '/rss/feed.xml', title: `${SITE_NAME} RSS` },
      ],
      'application/atom+xml': [
        { url: '/rss/atom.xml', title: `${SITE_NAME} Atom` },
      ],
      'application/json': [
        { url: '/rss/feed.json', title: `${SITE_NAME} JSON` },
      ],
    },
  },

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    locale: 'en_US',
    images: [
      { url: '/thumbnail.png', width: 1200, height: 630, alt: SITE_NAME },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ['/thumbnail.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
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
