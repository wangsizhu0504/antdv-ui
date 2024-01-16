import process from 'node:process'
import { resolve } from 'node:path'
import consola from 'consola'
import chalk from 'chalk'
import type { Project } from '@pnpm/find-workspace-packages'
import findWorkspacePackages from '@pnpm/find-workspace-packages'

export function errorAndExit(err: Error): never {
  consola.error(err)
  process.exit(1)
}

async function main() {
  const tagVersion = process.env.TAG_VERSION
  const gitHead = process.env.GIT_HEAD
  if (!tagVersion || !gitHead) {
    errorAndExit(
      new Error(
        'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n',
      ),
    )
  }

  consola.log(chalk.cyan('Start updating version'))
  consola.log(chalk.cyan(`$TAG_VERSION: ${tagVersion}`))
  consola.log(chalk.cyan(`$GIT_HEAD: ${gitHead}`))

  consola.debug(chalk.yellow(`Updating package.json`))

  const pkgs = Object.fromEntries(
    (await findWorkspacePackages(resolve(__dirname, '..'))).map(pkg => [pkg.manifest.name!, pkg]),
  )
  console.log('pkgs', pkgs)
  const writeVersion = async (project: Project) => {
    await project.writeProjectManifest({
      ...project.manifest,
      version: tagVersion,
      gitHead,
    } as any)
  }

  try {
    await writeVersion(pkgs['antdv-ui'])
  } catch (err: any) {
    errorAndExit(err)
  }

  consola.debug(chalk.green(`$GIT_HEAD: ${gitHead}`))
  consola.success(chalk.green(`Git head updated to ${gitHead}`))
}

main()
