// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. normalize internal links to end with `.html`

import type MarkdownIt from 'markdown-it'
import type { MarkdownParsedData } from '../markdown'

// eslint-disable-next-line node/prefer-global/url
import { URL } from 'node:url'

const indexRE = /(^|.*\/)index.md(#?.*)$/i

export function linkPlugin(md: MarkdownIt, externalAttrs: Record<string, string>) {
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const hrefAttr = token.attrs![hrefIndex]
      const url = hrefAttr[1]
      const isExternal = /^https?:/.test(url)
      if (isExternal) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
      } else if (
        // internal anchor links
        !url.startsWith('#')
        // mail links
        && !url.startsWith('mailto:')
      ) {
        normalizeHref<any>(hrefAttr)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  function normalizeHref<any>(hrefAttr: [string, string]) {
    let url = hrefAttr[1]

    const indexMatch = url.match(indexRE)
    if (indexMatch) {
      const [, path, hash] = indexMatch
      url = path + hash
    } else {
      let cleanUrl = url.replace(/\#.*$/, '').replace(/\?.*$/, '')
      // .md -> .html
      if (cleanUrl.endsWith('.md'))
        cleanUrl = cleanUrl.replace(/\.md$/, '.html')

      // // ./foo -> ./foo.html
      // if (!cleanUrl.endsWith('.html') && !cleanUrl.endsWith('/')) {
      //   cleanUrl += '.html';
      // }
      const parsed = new URL(url, 'http://a.com')
      url = cleanUrl + parsed.search + parsed.hash
    }

    // ensure leading . for relative paths
    if (!url.startsWith('/') && !/^\.\//.test(url))
      url = `./${url}`

    // export it for existence check
    const data = (md as any).__data as MarkdownParsedData
    const links = data.links || (data.links = [])
    links.push(url.replace(/\.html$/, ''))

    // markdown-it encodes the uri
    hrefAttr[1] = decodeURI(url)
  }
}
