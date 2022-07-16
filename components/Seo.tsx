import { BASE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../utils/configs'
import Head from 'next/head'
import { Article, Person, WebPage, WebSite } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'

type Props = {
  title?: string
  description?: string
  image?: string
  url?: string
  canonical?: string
  tags?: Array<string>
  date?: Date
}

const Seo: React.FC<Props> = ({
  title,
  description,
  image,
  url,
  canonical,
  tags,
  date,
}) => {
  const computedImage = image || `${BASE_URL}/thumbnail.png`
  const computedTitle = title || DEFAULT_TITLE
  const computedDescription = description || DEFAULT_DESCRIPTION
  const computedUrl = url || BASE_URL
  const isPost = !!tags && !!date

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

      <link
        rel='alternate'
        type='application/rss+xml'
        href={`${BASE_URL}/rss/feed.xml`}
      />

      {canonical ? (
        <link key='canonical' rel='canonical' href={canonical} />
      ) : undefined}

      {tags ? <meta name='keywords' content={tags.join(', ')} /> : undefined}

      <script
        {...jsonLdScriptProps<Person>({
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'Diego Pasquali',
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: ['University of Camerino'],
          },
          knowsAbout: [
            'Software',
            'Computer Science',
            'Frontend',
            'JavaScript',
            'React',
            'React Native',
            'Functional Programming',
          ],
          jobTitle: 'Software Engineer',
        })}
      />

      <script
        {...jsonLdScriptProps<WebSite>({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          author: {
            '@id': `${BASE_URL}/#person`,
          },
        })}
      />

      {isPost ? (
        <script
          {...jsonLdScriptProps<Article>({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            mainEntityOfPage: {
              '@id': `${BASE_URL}/#website`,
            },
            headline: computedTitle,
            datePublished: date.toISOString(),
            image: [computedImage],
            author: {
              '@id': `${BASE_URL}/#person`,
            },
            keywords: tags.join(', '),
          })}
        />
      ) : (
        <script
          {...jsonLdScriptProps<WebPage>({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            mainEntityOfPage: {
              '@id': `${BASE_URL}/#website`,
            },
            author: {
              '@id': `${BASE_URL}/#person`,
            },
            headline: computedTitle,
          })}
        />
      )}
    </Head>
  )
}

export default Seo
