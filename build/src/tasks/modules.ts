import { rollup } from 'rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { antdRoot } from '../path'
import { excludeFiles, generateExternal, writeBundles } from '../utils'
import { buildConfigEntries, target } from '../build-info'
import type { OutputOptions } from 'rollup'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('*.{js?(x),ts?(x)}', {
      cwd: antdRoot,
      absolute: true,
      onlyFiles: true,
    }),
  )
  const bundle = await rollup({
    input,
    plugins: [
      vueJsx({
        mergeProps: false,
        enableObjectSlots: false,
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        // logOverride: { 'this-is-undefined-in-esm': 'silent' },
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  })
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
      }
    }),
  )
}
