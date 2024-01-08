import path from 'node:path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import type { Plugin } from 'rollup'
import { glob } from 'glob'
import { antdOutput, antdPackage, antdRoot, localeRoot } from '../path'
import { PKG_BRAND_NAME, PKG_CAMELCASE_NAME } from '../constants'
import { formatBundleFilename, generateExternal, getPackageManifest, withTaskName, writeBundles } from '../utils'
import { target } from '../build-info'

const { version } = getPackageManifest(antdPackage)
const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    vueJsx({
      mergeProps: false,
      enableObjectSlots: false,
    }) as any,
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      target,
      loaders: {
        '.vue': 'ts',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      treeShaking: true,
      legalComments: 'eof',
    }),
  ]
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true,
      }),
    )
  }

  const bundle = await rollup({
    input: path.resolve(antdRoot, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }),
    treeshake: true,
  })
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        antdOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js'),
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        'vue': 'Vue',
        '@ant-design/icons-vue': 'AntdIcon',
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        antdOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs'),
      ),
      sourcemap: minify,
      banner,
    },
  ])
}
async function buildFullLocale(minify: boolean) {
  const files = await glob(`**/*.ts`, {
    cwd: path.resolve(localeRoot, 'lang'),
    absolute: true,
  })
  return Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file, '.ts')

      const bundle = await rollup({
        input: file,
        plugins: [
          esbuild({
            minify,
            sourceMap: minify,
            target,
          }),
        ],
      })
      await writeBundles(bundle, [
        {
          format: 'umd',
          file: path.resolve(
            antdOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'js'),
          ),
          exports: 'default',
          name: `AntdLocal${filename}`,
          sourcemap: minify,
          banner,
        },
        {
          format: 'esm',
          file: path.resolve(
            antdOutput,
            'dist/locale',
            formatBundleFilename(filename, minify, 'mjs'),
          ),
          sourcemap: minify,
          banner,
        },
      ])
    }),
  )
}

export function buildFull(minify: boolean) {
  return async () =>
    Promise.all([buildFullEntry(minify), buildFullLocale(minify)])
}
export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false)),
)
