import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const QUEUE_FILE = path.join(ROOT_DIR, 'src', 'content', 'posts-queue.json')
const PUBLISHED_FILE = path.join(ROOT_DIR, 'src', 'content', 'published-posts.json')
const HISTORY_FILE = path.join(ROOT_DIR, 'src', 'content', 'publish-history.json')

const MIN_WORDS = 1800
const MAX_WORDS = 2400

function readJsonFile(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) return fallback
    const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '').trim()
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message)
    return fallback
  }
}

function wordCount(content = '') {
  return content.match(/\b[\w'-]+\b/g)?.length ?? 0
}

function qualityIssues(post) {
  const content = typeof post?.content === 'string' ? post.content : ''
  const words = wordCount(content)
  const headings = content.match(/^##\s+.+$/gm) ?? []
  const questionHeadings = content.match(/^###\s+.+\?\s*$/gm) ?? []
  const hasAnswerBlock = /quick answer|quick summary|executive summary/i.test(content)
  const hasFaq = /frequently asked questions|##\s+faq/i.test(content)
  const hasSources = /sources and further reading|references|further reading/i.test(content)
  const issues = []

  if (words < MIN_WORDS || words > MAX_WORDS) issues.push(`word count ${words} (target ${MIN_WORDS}-${MAX_WORDS})`)
  if (headings.length < 5) issues.push(`only ${headings.length} H2 sections`)
  if (!hasAnswerBlock) issues.push('missing a direct answer/summary block')
  if (!hasFaq || questionHeadings.length < 3) issues.push('missing an FAQ section with at least 3 question headings')
  if (!hasSources) issues.push('missing sources/references section')

  return issues
}

function isStrongArticle(post) {
  return qualityIssues(post).length === 0
}

if (!fs.existsSync(QUEUE_FILE)) {
  console.log('No posts queue file found for TechVRS.')
  process.exit(0)
}

const queue = readJsonFile(QUEUE_FILE, [])
const publishedList = readJsonFile(PUBLISHED_FILE, [])

if (!Array.isArray(queue) || queue.length === 0) {
  console.log('Queue is empty. No articles to publish.')
  process.exit(0)
}

const publishedSlugs = new Set(publishedList.map((post) => post.slug))
const eligibleIndex = queue.findIndex((post) => !publishedSlugs.has(post.slug) && isStrongArticle(post))

if (eligibleIndex === -1) {
  const firstIssue = queue[0] ? qualityIssues(queue[0]).join('; ') : 'no eligible article'
  console.log(`No article met the TechVRS quality gate. Nothing was published. First queue item: ${firstIssue}`)
  process.exit(0)
}

const [postToPublish] = queue.splice(eligibleIndex, 1)
const now = new Date().toISOString()
postToPublish.publishedAt = now

console.log(`Publishing 1 qualified post for TechVRS: ${postToPublish.title} (${postToPublish.slug})`)

publishedList.unshift(postToPublish)
fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(publishedList, null, 2) + '\n', 'utf8')
fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2) + '\n', 'utf8')

const history = readJsonFile(HISTORY_FILE, [])
history.push({
  slug: postToPublish.slug,
  title: postToPublish.title,
  publishedAt: now,
  wordCount: wordCount(postToPublish.content),
  remainingInQueue: queue.length,
})
fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2) + '\n', 'utf8')

console.log(`[SUCCESS] TechVRS qualified post published: ${postToPublish.title}`)
console.log(`Word count: ${wordCount(postToPublish.content)} | Remaining eligible queue is checked on each run.`)
