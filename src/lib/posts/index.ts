import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import strip from 'strip-markdown'
import { SEARCH_TARGET_DIR } from '../../utils/configs.ts'
import matter from 'gray-matter'

export type Post = {
  slug: string
  content: string | null
  searchTarget: string

  frontmatter: {
    date: string
    title: string
    description: string
    tags: Array<string>
    devToId: string | null
    published: boolean
  }
}

const rootDir = process.cwd()
const contentDir = path.join('src', 'posts')

function fileIsPost(filename: string) {
  return filename.endsWith('.md')
}

function getPostsFiles() {
  return fs.readdirSync(path.join(rootDir, contentDir)).filter(fileIsPost)
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
    .readFileSync(path.join(contentDir, filename))
    .toString()

  const { data, content } = matter(markdownWithMetadata)
  const { title, description, id } = data

  const postDate = data.date ? new Date(data.date) : new Date()
  const date = postDate.toISOString()

  const slug = filenameToSlug(filename)

  const tags = parseTags(data.tags || '')

  const devToId = id ? `${id}` : null

  // Absent `published` means published: the flag only ever appears on drafts,
  // and dev.to reads it the same way.
  const published = data.published !== false

  const searchTarget = `/${SEARCH_TARGET_DIR}/${slug}.txt`

  return {
    slug,
    content,
    searchTarget,

    frontmatter: {
      date,
      title,
      description,
      tags,
      devToId,
      published,
    },
  }
}

export function getPosts(): Array<Post> {
  const files = getPostsFiles()
  const posts: Array<Post> = files
    .map(parsePostFile)
    .filter((post) => post.frontmatter.published)
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

export function generatePostsSearchTargets(posts: Array<Post>): void {
  // Must match SEARCH_TARGET_DIR: `Post.searchTarget` points the search widget
  // at `/${SEARCH_TARGET_DIR}/<slug>.txt`, so writing anywhere else produces an
  // index nothing can fetch.
  const outputDir = path.join('./public', SEARCH_TARGET_DIR)

  fs.mkdirSync(outputDir, { recursive: true })

  posts.forEach((post) => {
    const computedContent = `${post.frontmatter.title}\n${post.content}`
    const strippedContent = remark().use(strip).processSync(computedContent)
    const compressedContent = strippedContent.value
      .toString()
      .replaceAll('\n', '')

    fs.writeFileSync(
      path.join(outputDir, `${post.slug}.txt`),
      compressedContent,
    )
  })
}
