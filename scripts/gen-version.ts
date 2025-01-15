import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import consola from 'consola'

import pkg from '../packages/antdv-ui/package.json'

function getVersion() {
  const tagVer = process.env.TAG_VERSION
  if (tagVer)
    return tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
  else
    return pkg.version
}

async function main() {
  const version = getVersion()
  const dirname = path.dirname(new URL(import.meta.url).pathname)
  consola.info(`📦 Version: ${version}`)
  await writeFile(
    path.join(dirname, '..', 'packages', 'version', 'version.ts'),
    `export const version = '${version}'\n`,
    'utf8',
  )
}

main()
