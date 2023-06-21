import { LRUCache } from 'lru-cache'
import fetchCode from '../md/utils/fetchCode'

const cache = new LRUCache<string, MarkdownCompileResult>({ max: 1024 })

interface MarkdownCompileResult {
  vueSrc: string
}

export function createVueToMarkdownRenderFn(root: string = process.cwd()): any {
  return (src: string, file: string): MarkdownCompileResult => {
    const cached = cache.get(src)
    if (cached)
      return cached
    const docs = fetchCode(src, 'docs')?.trim()
    const template = fetchCode(src, 'template')
    const script = fetchCode(src, 'script')
    const style = fetchCode(src, 'style')
    const newContent = `${docs}
\`\`\`vue
${template}
${script}
${style}
\`\`\`
`
    const result = {
      vueSrc: newContent?.trim(),
      ignore: !docs,
    }
    cache.set(src, result)
    return result
  }
}
