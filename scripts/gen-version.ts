import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import consola from 'consola'
import { antdPackage, antdRoot } from '../build/src/path'
import { getPackageManifest } from '../build/src'

function getVersion() {
  const tagVer = process.env.TAG_VERSION
  if (tagVer) {
    return tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
  } else {
    console.log(antdPackage)
    const pkg = getPackageManifest(antdPackage)
    return pkg.version
  }
}

const version = getVersion()

async function main() {
  consola.info(`Version: ${version}`)
  await writeFile(
    path.resolve(antdRoot, 'version', 'version.ts'),
    `export const version = '${version}'\n`,
  )
}

main()
