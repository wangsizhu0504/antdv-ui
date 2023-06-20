import path from 'node:path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { parallel } from 'gulp'
import type { Plugin } from 'rollup'
import { antdOutput, antdPackage, antdRoot } from '../path'
import {
  PKG_BRAND_NAME,
  PKG_CAMELCASE_NAME,
} from '../constants'
import {
  formatBundleFilename,
  generateExternal,
  getPackageManifest,
  withTaskName,
  writeBundles,
} from '../utils'
import { target } from '../build-info'

const { version } = getPackageManifest(antdPackage)
const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    vueJsx() as unknown as Plugin,
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

export const buildFull = (minify: boolean) => async () => buildFullEntry(minify)

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false)),
)
