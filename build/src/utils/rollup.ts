import type { OutputOptions, RollupBuild } from 'rollup';
import { antdPackage } from '../path';
import { getPackageDependencies } from '../utils';

export async function generateExternal(options: { full: boolean }) {
  const { dependencies, peerDependencies } = getPackageDependencies(antdPackage);

  return (id: string) => {
    const packages: string[] = [...peerDependencies];
    if (!options.full)
      packages.push('@vue', ...dependencies);

    return [...new Set(packages)].some(
      pkg => id === pkg || id.startsWith(`${pkg}/`),
    );
  };
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)));
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string,
) {
  return `${name}${minify ? '.min' : ''}.${ext}`;
}
