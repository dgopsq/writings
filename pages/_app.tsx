import { AppProps } from 'next/app'
import Head from 'next/head'
import 'normalize.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>dgopsq</title>
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>'
        />

        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='Diego Pasquali, full stack engineer and tech enthusiast.'
        />

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
