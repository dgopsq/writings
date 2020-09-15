import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { getPosts } from './lib/posts'
import { generatePostUrl } from './utils/formats'
import { BASE_URL } from './utils/configs'
import fs from 'fs'

interface ILink {
  url: string
  changefreq?: string
  priority?: number
}

const sitemapPath = './public/sitemap.xml'

const posts = getPosts()

const postLinks: Array<ILink> = posts.map((post) => ({
  url: generatePostUrl(post.slug),
  changefreq: 'never',
}))

const links: Array<ILink> = [
  {
    url: BASE_URL,
    changefreq: 'weekly',
  },

  ...postLinks,
]

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://dgopsq.space' })

streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => data.toString())
  .then((data) => {
    const strSitemap = data.toString()

    fs.writeFileSync(sitemapPath, strSitemap)

    console.log(`Sitemap generated successfully at '${sitemapPath}' 🔥`)
  })
  .catch((err) => console.error(err))
