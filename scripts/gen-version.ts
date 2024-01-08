import path from 'node:path'
import { writeFile } from 'node:fs/promises'
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
    path.join(dirname, '..', 'packages', 'antdv-ui', 'version', 'version.ts'),
    `export default '${version}'\n`,
    'utf8',
  )
  await writeFile(
    path.join(dirname, '..', 'packages', 'components', 'version.ts'),
    `export default '${version}'\n`,
    'utf8',
  )
}

main()
