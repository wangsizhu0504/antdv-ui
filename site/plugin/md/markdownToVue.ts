import type { HeadConfig, PageData } from '../shared';

import type { MarkdownOptions, MarkdownParsedData, MarkdownRenderer } from './markdown/markdown';
import fs from 'node:fs';

// import Buffer from 'node:buffer'
import path from 'node:path';
import escapeHtml from 'escape-html';
import matter from 'gray-matter';
import { LRUCache } from 'lru-cache';
import slash from 'slash';
import { createMarkdownRenderer } from './markdown/markdown';
import fetchCode from './utils/fetchCode';
import { deeplyParseHeader } from './utils/parseHeader';
import tsToJs from './utils/tsToJs';

const cache = new LRUCache<string, MarkdownCompileResult>({ max: 1024 });

interface MarkdownCompileResult {
  vueSrc: string
  pageData: PageData
}
function inferTitle(frontmatter: any, content: string) {
  if (frontmatter.home)
    return 'Home';

  if (frontmatter.title)
    return deeplyParseHeader(frontmatter.title);

  const match = content.match(/^\s*#+\s+(.*)/m);
  if (match)
    return deeplyParseHeader(match[1]?.trim());

  return '';
}

function getHeadMetaContent(head: HeadConfig[], name: string): string | undefined {
  if (!head || !head.length)
    return undefined;

  const meta = head.find(([tag, attrs = {}]) => {
    return tag === 'meta' && attrs.name === name && attrs.content;
  });

  return meta && meta[1].content;
}

function inferDescription(frontmatter: Record<string, any>) {
  if (!frontmatter.head)
    return '';

  return getHeadMetaContent(frontmatter.head, 'description') || '';
}

export function createMarkdownToVueRenderFn(
  root: string = process.cwd(),
  options: MarkdownOptions = {},
) {
  const md = createMarkdownRenderer(options);

  return async (src: string, file: string): Promise<MarkdownCompileResult> => {
    const relativePath = slash(path.relative(root, file));

    const cached = cache.get(src);
    if (cached)
      return cached;

    const { content, data: frontmatter } = matter(src);

    let { html, data } = md.render(content);
    // avoid env variables being replaced by vite
    html = html
      .replace(/import\.meta/g, 'import.<wbr/>meta')
      .replace(/process\.env/g, 'process.<wbr/>env');
    // TODO validate data.links?
    const pageData: PageData = {
      title: inferTitle(frontmatter, content),
      description: inferDescription(frontmatter),
      frontmatter,
      headers: data.headers,
      relativePath,
      content: escapeHtml(content),
      html,
      // TODO use git timestamp?
      lastUpdated: Math.round(fs.statSync(file).mtimeMs),
    };
    const newContent = data.vueCode
      ? await genComponentCode(md, data, pageData)
      : await genDocCode(content, pageData);

    const result = {
      vueSrc: newContent?.trim(),
      pageData,
    };
    cache.set(src, result);
    return result;
  };
}

async function genComponentCode(md: MarkdownRenderer, data: PageData, pageData: PageData) {
  const { vueCode = '', headers = [] } = data as MarkdownParsedData;
  const cn = headers.find(h => h.title === 'zh-CN')?.content;
  const us = headers.find(h => h.title === 'en-US')?.content;
  let { html } = md.render(`\`\`\`vue
${vueCode?.trim()}
\`\`\``);
  html = html
    .replace(/import\.meta/g, 'import.<wbr/>meta')
    .replace(/process\.env/g, 'process.<wbr/>env');
  const template = fetchCode(vueCode, 'template');
  const script = fetchCode(vueCode, 'script');
  const style = fetchCode(vueCode, 'style');
  const scriptContent = fetchCode(vueCode, 'scriptContent');
  let jsCode = (await tsToJs(scriptContent))?.trim();
  jsCode = jsCode
    ? `<script>
${jsCode}
</script>`
    : '';
  const jsSourceCode = `
${template}
${jsCode}
${style}
  `.trim();

  let { html: jsVersion } = md.render(`\`\`\`vue
${jsSourceCode}
\`\`\``);
  jsVersion = jsVersion
    .replace(/import\.meta/g, 'import.<wbr/>meta')
    .replace(/process\.env/g, 'process.<wbr/>env');

  const jsfiddle = escapeHtml(
    JSON.stringify({
      us,
      cn,
      docHtml: pageData?.html?.split('<pre class="language-vue" v-pre>')[0],
      ...pageData.frontmatter,
      relativePath: pageData.relativePath,
      // htmlCode: Buffer.from(html).toString('base64'),
      // jsVersionHtml: Buffer.from(jsVersion).toString('base64'),
      sourceCode: (Buffer as any).from(vueCode).toString('base64'),
      jsSourceCode: (Buffer as any).from(jsSourceCode).toString('base64'),
    }),
  );

  const newContent = `
    <template>
      <demo-box :jsfiddle="${jsfiddle}">
        ${template.replace('<template>', '<template v-slot:default>')}
        <template #htmlCode>${html}</template>
        <template #jsVersionHtml>${jsVersion}</template>
      </demo-box>
    </template>
    ${script}
    ${style}
    `;
  return newContent;
}

async function genDocCode(content: string, pageData: PageData) {
  return `
<template><article class="markdown">${pageData.html}</article></template>

<script>
import ColorChunk from '@/components/ColorChunk';
import TokenTable from '@/components/TokenTable';
import ComponentTokenTable from '@/components/ComponentTokenTable';

export default {
    components: {
        ColorChunk,
        TokenTable,
        ComponentTokenTable
    },
    pageData: ${JSON.stringify(pageData)}
}
</script>
${fetchCode(content, 'style')}
`;
}
