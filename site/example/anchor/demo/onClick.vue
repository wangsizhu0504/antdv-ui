<docs>
---
order: 2
title:
  zh-CN: 自定义 click 事件
  en-US: Customize the click event
---

## zh-CN

点击锚点不记录历史。

## en-US

Clicking on an anchor does not record history.
</docs>

<script lang="ts" setup>
  import type { AnchorProps } from '@antdv/ui';

  const handleClick: AnchorProps['onClick'] = (e, link) => {
    e.preventDefault();
    console.log(link);
  };
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
    @click="handleClick"
  />
</template>
