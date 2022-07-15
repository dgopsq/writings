import { AppProps } from 'next/app'
import Head from 'next/head'
import Seo from '../components/Seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Seo />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
