<docs>
---
order: 5
title:
  zh-CN: 监听锚点链接改变
  en-US: Listening for anchor link change
---

## zh-CN

监听锚点链接改变。

## en-US

Listening for anchor link change.
</docs>

<script lang="ts" setup>
  function onChange(link: string) {
    console.log('Anchor:OnChange', link);
  }
</script>

<template>
  <a-anchor
    :affix="false"
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
    @change="onChange"
  />
</template>
