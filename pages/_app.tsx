import { AppProps } from 'next/app'
import Head from 'next/head'
import { FunctionComponent } from 'react'
import Seo from '../components/Seo'

function MyApp({ Component, pageProps }: AppProps) {
  const C = Component as FunctionComponent

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Seo />

      <C {...pageProps} />
    </>
  )
}

export default MyApp
