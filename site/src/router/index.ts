// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import Iframe from '../layouts/Iframe.vue';
import Layout from '../layouts/index.vue';
import demoRoutes from './demoRoutes';

// import otherRoutes from './otherRoutes';
const routes = [
  // ...otherRoutes,
  {
    path: '/components',
    component: Layout,
    children: [
      {
        path: 'overview:lang(.*)',
        component: () => import('../views/ComponentOverview.vue'),
      },
      ...demoRoutes,
    ],
  },
  {
    path: '/iframe',
    component: Iframe,
    children: [
      {
        path: 'layout:lang(.*)',
        meta: {
          category: 'Components',
          subtitle: '布局',
          type: '布局',
          cols: 1,
          title: 'Layout',
          cover: 'https://gw.alipayobjects.com/zos/alicdn/hzEndUVEx/Layout.svg',
        },
        props: (route) => {
          const hash = route.hash.replace('#', '');
          return { iframeName: hash };
        },
        component: () => import('../../example/layout/demo/index.vue'),
      },
      {
        path: 'float-button:lang(.*)',
        meta: {
          category: 'Components',
          subtitle: '悬浮按钮',
          type: '悬浮按钮',
          cols: 1,
          title: 'FloatButton',
          cover:
            'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HS-wTIIwu0kAAAAAAAAAAAAADrJ8AQ/original',
        },
        props: (route) => {
          const hash = route.hash.replace('#', '');
          return { iframeName: hash };
        },
        component: () => import('../../example/float-button/demo/index.vue'),
      },
    ],
  },
  {
    path: '/docs',
    component: Layout,
    children: [
      {
        path: 'vue/introduce-cn',
        meta: { enTitle: 'Ant Design of Vue', title: 'Ant Design of Vue', category: 'docs' },
        component: () => import('../vueDocs/introduce.zh-CN.md'),
      },
      {
        path: 'vue/introduce',
        meta: { enTitle: 'Ant Design of Vue', title: 'Ant Design of Vue', category: 'docs' },
        component: () => import('../vueDocs/introduce.en-US.md'),
      },
      {
        path: 'vue/getting-started-cn',
        meta: { enTitle: 'Getting Started', title: '快速上手', category: 'docs' },
        component: () => import('../vueDocs/getting-started.zh-CN.md'),
      },
      {
        path: 'vue/getting-started',
        meta: { enTitle: 'Getting Started', title: '快速上手', category: 'docs' },
        component: () => import('../vueDocs/getting-started.en-US.md'),
      },
      {
        path: 'vue/compatible-style-cn',
        meta: { enTitle: 'Compatible Style', title: '样式兼容', category: 'docs' },
        component: () => import('../vueDocs/compatible-style.zh-CN.md'),
      },
      {
        path: 'vue/compatible-style',
        meta: { enTitle: 'Compatible Style', title: '样式兼容', category: 'docs' },
        component: () => import('../vueDocs/compatible-style.en-US.md'),
      },
      {
        path: 'vue/customize-theme-cn',
        meta: { enTitle: 'Customize Theme', title: '定制主题', category: 'docs' },
        component: () => import('../vueDocs/customize-theme.zh-CN.md'),
      },
      {
        path: 'vue/customize-theme',
        meta: { enTitle: 'Customize Theme', title: '定制主题', category: 'docs' },
        component: () => import('../vueDocs/customize-theme.en-US.md'),
      },
      {
        path: 'vue/replace-date-cn',
        meta: { enTitle: 'Custom Date Library', title: '自定义时间库', category: 'docs' },
        component: () => import('../vueDocs/replace-date.zh-CN.md'),
      },
      {
        path: 'vue/replace-date',
        meta: { enTitle: 'Custom Date Library', title: '自定义时间库', category: 'docs' },
        component: () => import('../vueDocs/replace-date.en-US.md'),
      },
      {
        path: 'vue/i18n-cn',
        meta: { enTitle: 'Internationalization', title: '国际化', category: 'docs' },
        component: () => import('../vueDocs/i18n.zh-CN.md'),
      },
      {
        path: 'vue/i18n',
        meta: { enTitle: 'Internationalization', title: '国际化', category: 'docs' },
        component: () => import('../vueDocs/i18n.en-US.md'),
      },
      {
        path: 'vue/faq-cn',
        meta: { enTitle: 'FAQ', title: '常见问题', category: 'docs' },
        component: () => import('../vueDocs/faq.zh-CN.md'),
      },
      {
        path: 'vue/faq',
        meta: { enTitle: 'FAQ', title: '常见问题', category: 'docs' },
        component: () => import('../vueDocs/faq.en-US.md'),
      },
      {
        path: 'vue/download-cn',
        meta: { enTitle: 'Download Design Resources', title: '下载设计资源', category: 'docs' },
        component: () => import('../vueDocs/download.zh-CN.md'),
      },
      {
        path: 'vue/download',
        meta: { enTitle: 'Download Design Resources', title: '下载设计资源', category: 'docs' },
        component: () => import('../vueDocs/download.en-US.md'),
      },
      { path: '', redirect: '/docs/vue/introduce/' },
    ],
  },
  {
    path: '/theme-editor',
    component: () => import('../views/theme-editor/index.vue'),
  },
  {
    path: '/theme-editor-cn',
    component: () => import('../views/theme-editor/index.vue'),
  },
  { path: '/:lang(.*)', redirect: '/components/overview' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 是否禁止尾部斜杠。
  strict: true,
  scrollBehavior: (to) => {
    if (to.hash)
      return { el: to.hash, top: 80, behavior: 'auto' };
  },
});

export function registerRouter(app: App) {
  app.use(router);
  return router;
}
