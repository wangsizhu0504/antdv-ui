import type { OutputOptions } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import vueJsx from '@vitejs/plugin-vue-jsx';
import glob from 'fast-glob';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { buildConfigEntries, target } from '../build-info';
import { antdRoot, pkgRoot } from '../path';
import { excludeFiles, generateExternal, writeBundles } from '../utils';

export async function buildModules() {
  const input = excludeFiles(
    await glob('**/*.{js?(x),ts?(x)}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  const bundle = await rollup({
    input,
    plugins: [
      vueJsx({
        mergeProps: false,
        enableObjectSlots: false,
      }) as any,
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
      }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: { moduleSideEffects: false },
  });
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: antdRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      };
    }),
  );
}
