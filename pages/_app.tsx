import { AppProps } from 'next/app'
import Head from 'next/head'
import 'normalize.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>dgopsq</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        <link
          href='https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Open+Sans:wght@400;700&display=swap'
          rel='stylesheet'
        />

        <style>{`
          html {
            font-size: 100%;
          }

          body {
            font-family: 'Open Sans', sans-serif;
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
