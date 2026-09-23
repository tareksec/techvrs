import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const QUEUE_FILE = path.join(ROOT_DIR, 'src', 'content', 'posts-queue.json')
const PUBLISHED_FILE = path.join(ROOT_DIR, 'src', 'content', 'published-posts.json')
const HISTORY_FILE = path.join(ROOT_DIR, 'src', 'content', 'publish-history.json')

if (!fs.existsSync(QUEUE_FILE)) {
  console.log('No posts queue file found for TechVrs.')
  process.exit(0)
}

let queue = []
try {
  queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'))
} catch {
  queue = []
}

if (!Array.isArray(queue) || queue.length === 0) {
  console.log('Queue is empty. No articles to publish today.')
  process.exit(0)
}

// 1. Pop exactly 1 post
const postToPublish = queue.shift()
postToPublish.publishedAt = new Date().toISOString()
console.log(`Publishing 1 post for TechVrs: ${postToPublish.title} (${postToPublish.slug})`)

// 2. Append to published-posts.json
let publishedList = []
if (fs.existsSync(PUBLISHED_FILE)) {
  try {
    publishedList = JSON.parse(fs.readFileSync(PUBLISHED_FILE, 'utf8'))
  } catch {
    publishedList = []
  }
}

publishedList.unshift(postToPublish)
fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(publishedList, null, 2), 'utf8')

// 3. Update queue
fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8')

// 4. Update history
let history = []
if (fs.existsSync(HISTORY_FILE)) {
  try {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'))
  } catch {
    history = []
  }
}

history.push({
  slug: postToPublish.slug,
  title: postToPublish.title,
  publishedAt: new Date().toISOString(),
  remainingInQueue: queue.length
})

fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8')

console.log(`\n[SUCCESS] TechVrs post published: ${postToPublish.title}`)
console.log(`Remaining in TechVrs queue: ${queue.length}`)
