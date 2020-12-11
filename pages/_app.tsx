import { AppProps } from 'next/app'
import Head from 'next/head'
import { typography } from '../theme'
import { useEffect } from 'react'
import Seo from '../components/Seo'
import { TypographyStyle } from 'react-typography'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Typography.js
    typography.injectStyles()
  }, [])

  return (
    <>
      <Seo />

      <Head>
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>'
        />

        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        <link
          href='https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Open+Sans:wght@400;700&display=swap'
          rel='stylesheet'
        />

        <style>{`
          html,
          body {
            padding: 0em;
            margin: 0em;
          }

          @media all and (max-width: 42em) {
            body {
              font-size: 90%;
            }
          }
        `}</style>

        <TypographyStyle typography={typography} />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
