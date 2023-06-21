import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import md from './plugin/md'
import docs from './plugin/docs'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: 'vue/dist/vue.runtime.esm-bundler.js',
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      {
        find: /^@antdv\/ui(\/(es|lib))?$/,
        replacement: path.resolve(__dirname, '../components/index.ts'),
      },
      {
        find: /^@antdv\/ui\/(es|lib)\/(.*)$/,
        replacement: `${path.resolve(__dirname, '../components')}/$2`,
      },
      {
        find: /@\//,
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
    ],
  },
  server: {
    host: true,
  },
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      mergeProps: false,
      enableObjectSlots: false,
    }),
    docs(),
    md(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
  optimizeDeps: {
    include: [
      'fetch-jsonp',
      '@ant-design/icons-vue',
      'lodash-es',
      'dayjs',
      'vue',
      'vue-router',
      'vue-i18n',
      'async-validator',
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
