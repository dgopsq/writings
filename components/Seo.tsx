import React from 'react'
import { BASE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../utils/configs'
import Head from 'next/head'

type Props = {
  title?: string
  description?: string
  image?: string
  url?: string
  canonical?: string
}

const Seo: React.SFC<Props> = ({
  title,
  description,
  image,
  url,
  canonical,
}) => {
  const computedImage = image || `${BASE_URL}/thumbnail.png`
  const computedTitle = title || DEFAULT_TITLE
  const computedDescription = description || DEFAULT_DESCRIPTION
  const computedUrl = url || BASE_URL

  return (
    <Head>
      <title key='baseTitle'>{computedTitle}</title>
      <meta
        key='baseDescription'
        name='description'
        content={computedDescription}
      />

      <meta key='ipName' itemProp='name' content={computedTitle} />
      <meta
        key='ipDescription'
        itemProp='description'
        content={computedDescription}
      />
      <meta key='ipImage' itemProp='image' content={computedImage} />

      <meta key='ogUrl' property='og:url' content={computedUrl} />
      <meta key='ogType' property='og:type' content='website' />
      <meta key='ogTitle' property='og:title' content={computedTitle} />
      <meta
        key='ogDescription'
        property='og:description'
        content={computedDescription}
      />
      <meta key='ogImage' property='og:image' content={computedImage} />

      <meta key='twCard' name='twitter:card' content='summary_large_image' />
      <meta key='twTitle' name='twitter:title' content={computedTitle} />
      <meta
        key='twDescription'
        name='twitter:description'
        content={computedDescription}
      />
      <meta key='twImage' name='twitter:image' content={computedImage} />

      {canonical ? (
        <link key='canonical' rel='canonical' href={canonical} />
      ) : undefined}
    </Head>
  )
}

export default Seo
