import path from 'node:path'

import pkg from '../../../packages/antdv-ui/package.json'
import { PKG_NAME } from '../constants'
import { antdOutput, compRoot, projRoot } from '../path'
import { parseAndWrite } from '../web-types'

export async function generateWebTypes() {
  try {
    const result = await parseAndWrite({
      version: pkg.version,
      name: PKG_NAME,
      path: compRoot,
      typingsPath: path.resolve(projRoot, './typings/volar.d.ts'),
      // default match lang
      test: /en-US\.md/,
      outputDir: antdOutput,
      tagPrefix: 'a-',
    })
    console.log(`generator types success: ${result} tags generated`)
  } catch (error) {
    console.error('generator types error', error)
    return Promise.reject(error)
  }
}
