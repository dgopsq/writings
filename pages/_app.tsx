import { AppProps } from 'next/app'
import { useEffect } from 'react'
import Seo from '../components/Seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
