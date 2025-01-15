import type { ProjectManifest } from '@pnpm/types';
import type { Module } from '../build-info';
import findWorkspacePackages from '@pnpm/find-workspace-packages';
import { buildConfig } from '../build-info';
import { NPM_PKG_NAME, PKG_NAME, PKG_PREFIX } from '../constants';
import { projRoot } from '../path';

export function excludeFiles(files: string[]) {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter(
    path => !excludes.some(exclude => path.includes(exclude)),
  );
}

export function getPackageManifest(pkgPath: string) {
  // eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
  return require(pkgPath) as ProjectManifest;
}

export function getPackageDependencies(pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
}

export const getWorkspacePackages = () => findWorkspacePackages(projRoot);

/** used for type generator */
export function pathRewriter(module: Module) {
  const config = buildConfig[module];

  return (id: string) => {
    id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path.replaceAll(PKG_NAME, NPM_PKG_NAME)}/`);
    return id;
  };
}
