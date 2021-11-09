import fs from 'fs'
import matter from 'gray-matter'

export type Post = {
  slug: string
  content: string | null
  frontmatter: {
    date: string
    title: string
    description: string
    tags: Array<string>
  }
}

const rootDir = process.cwd()
const contentDir = 'posts'

function fileIsPost(filename: string) {
  return filename.endsWith('.md')
}

function getPostsFiles() {
  return fs.readdirSync(`${rootDir}/${contentDir}`).filter(fileIsPost)
}

function filenameToSlug(filename: string) {
  return filename.replace('.md', '')
}

function slugToFilename(slug: string) {
  return `${slug}.md`
}

function parseTags(tags: string, divisor: string = ',') {
  const parsedTags = tags.split(divisor).map((t) => t.trim())
  return parsedTags
}

function parsePostFile(filename: string): Post {
  const markdownWithMetadata = fs
    .readFileSync(`${contentDir}/${filename}`)
    .toString()

  const { data, content } = matter(markdownWithMetadata)
  const { title, description } = data
  const date = new Date(data.date).toISOString()

  const slug = filenameToSlug(filename)

  const tags = parseTags(data.tags || '')

  return {
    slug,
    content,

    frontmatter: {
      date,
      title,
      description,
      tags,
    },
  }
}

export function getPosts(): Array<Post> {
  const files = getPostsFiles()
  const posts: Array<Post> = files
    .map(parsePostFile)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    )

  return posts
}

export function getSinglePost(slug: string): Post {
  const filename = slugToFilename(slug)
  const post = parsePostFile(filename)

  return post
}

export function getPostsSlugs(): Array<string> {
  const files = getPostsFiles()
  const paths = files.map(filenameToSlug)

  return paths
}
