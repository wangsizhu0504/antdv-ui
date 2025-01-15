import type { Options, VueTag } from './type';
import { dirname, join } from 'node:path';
import glob from 'fast-glob';
import { outputFileSync, readFileSync } from 'fs-extra';
import { flatMap } from 'lodash';
import { formatter } from './formatter';
import { mdParser } from './parser';
import { getComponentName, normalizePath, toKebabCase } from './utils';

async function readMarkdown(options: Options): Promise<Map<string, VueTag>> {
  const mdPaths = await glob(normalizePath(`${options.path}/**/*.md`));
  const data = mdPaths
    .filter(md => options.test.test(md))
    .map((path) => {
      const docPath = dirname(path);
      const kebabComponentName
        = options.tagPrefix + docPath.substring(docPath.lastIndexOf('/') + 1) || '';
      const componentName = getComponentName(docPath.substring(docPath.lastIndexOf('/') + 1) || '');
      const fileContent = readFileSync(path, 'utf-8');
      return formatter(mdParser(fileContent), componentName, kebabComponentName, options.tagPrefix);
    })
    .filter(item => item) as VueTag[][];
  const tags = new Map<string, VueTag>();
  flatMap(data, item => item).forEach(mergedTag => mergeTag(tags, mergedTag));
  return tags;
}

async function readTypings(options: Options): Promise<Map<string, VueTag>> {
  const tags = new Map<string, VueTag>();
  const fileContent = readFileSync(options.typingsPath, 'utf-8');
  fileContent
    .split('\n')
    .filter(line => line && line.includes('typeof'))
    .map((line) => {
      const l = line.trim();
      return toKebabCase(l.substring(0, l.indexOf(':')));
    })
    .forEach(tagName =>
      tags.set(tagName, {
        name: tagName,
        filename: tagName.split('-')[1],
        slots: [],
        events: [],
        attributes: [],
      }),
    );
  return tags;
}

function mergeTag(tags: Map<string, VueTag>, mergedTag: VueTag) {
  const tagName = mergedTag.name;
  const vueTag = tags.get(tagName);
  if (vueTag) {
    vueTag.slots = [...vueTag.slots, ...mergedTag.slots];
    vueTag.events = [...vueTag.events, ...mergedTag.events];
    vueTag.attributes = [...vueTag.attributes, ...mergedTag.attributes];
  } else {
    tags.set(tagName, mergedTag);
  }
}

function mergeTags(mergedTagsArr: Array<Map<string, VueTag>>): VueTag[] {
  if (mergedTagsArr.length === 1) return [...mergedTagsArr[0].values()];
  const tags = new Map<string, VueTag>();
  if (mergedTagsArr.length === 0) return [];
  mergedTagsArr.forEach((mergedTags) => {
    mergedTags.forEach(mergedTag => mergeTag(tags, mergedTag));
  });
  return [...tags.values()];
}

export async function parseAndWrite(options: Options) {
  if (!options.outputDir)
    throw new Error('outputDir can not be empty.');

  const tagsFromMarkdown = await readMarkdown(options);
  const tagsFromTypings = await readTypings(options);
  const tags = mergeTags([tagsFromMarkdown, tagsFromTypings]);
  const webTypes = {
    '$schema': 'http://json.schemastore.org/web-types',
    'framework': 'vue',
    'name': options.name,
    'version': options.version,
    'js-types-syntax': 'typescript',
    'description-markup': 'markdown',
    'contributions': {
      html: {
        'types-syntax': 'typescript',
        tags,
      },
    },
  };
  outputFileSync(join(options.outputDir, 'web-types.json'), JSON.stringify(webTypes, null, 2));
  return tags.length;
}
