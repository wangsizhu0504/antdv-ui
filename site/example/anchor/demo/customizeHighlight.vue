<docs>
---
order: 3
title:
  zh-CN: 自定义锚点高亮
  en-US: Customize the anchor highlight
---

## zh-CN

自定义锚点高亮。

## en-US

Customize the anchor highlight.
</docs>

<script lang="ts" setup>
  function getCurrentAnchor() {
    return '#site-example-anchor-demo-static';
  }
</script>

<template>
  <a-anchor
    :affix="false"
    :get-current-anchor="getCurrentAnchor"
    :items="[
      {
        key: '1',
        href: '#site-example-anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#site-example-anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]"
  />
</template>
