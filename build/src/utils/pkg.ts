import type { ProjectManifest } from '@pnpm/types'
import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { buildConfig } from '../build-info'
import type { Module } from '../build-info'
import { projRoot } from '../path'

export function excludeFiles(files: string[]) {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    path => !excludes.some(exclude => path.includes(exclude)),
  )
}

/** used for type generator */
export function pathRewriter(module: Module) {
  const config = buildConfig[module]

  return (id: string) => {
    id = id.replaceAll('@/', `${config.bundle.path}/`)
    return id
  }
}

export function getPackageManifest(pkgPath: string) {
  // eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
  return require(pkgPath) as ProjectManifest
}

export function getPackageDependencies(pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)
