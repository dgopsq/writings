import fs from 'fs'
import { Feed } from 'feed'
import { BASE_URL } from '../../utils/configs'
import { generatePostUrl } from '../../utils/formats'
import { Post } from '../posts'

/**
 * Generate the RSS feed.
 */
function generateFeedContent(posts: Array<Post>): Feed {
  const year = new Date().getFullYear()

  const feed = new Feed({
    title: `Diego Pasquali's writing space`,
    description: 'Writing about technology and stuff.',
    id: BASE_URL,
    link: BASE_URL,
    language: 'en',
    image: `${BASE_URL}/thumbnail.png`,
    favicon:
      'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>',
    copyright: `All rights reserved ${year}, Diego Pasquali`,
    feedLinks: {
      json: 'https://example.com/json',
      atom: 'https://example.com/atom',
    },
    author: {
      name: 'Diego Pasquali',
      link: BASE_URL,
    },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: generatePostUrl(post.slug),
      link: generatePostUrl(post.slug),
      description: post.frontmatter.description,
      content: post.content,
      author: [
        {
          name: 'Diego Pasquali',
          link: BASE_URL,
        },
      ],
      date: new Date(post.frontmatter.date),
    })
  })

  feed.addCategory('Technology')
  feed.addCategory('Programming')

  return feed
}

/**
 * Generate the feeds files from a list of posts.
 */
export function generateFeed(posts: Array<Post>): void {
  const feed = generateFeedContent(posts)

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}
