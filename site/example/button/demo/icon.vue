<docs>
---
order: 1
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。

如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。

## en-US

`Button` components can contain an `Icon`. This is done by setting the `icon` property or placing an `Icon` component within the `Button`.

If you want specific control over the positioning and placement of the `Icon`, then that should be done by placing the `Icon` component within the `Button` rather than using the `icon` property.
</docs>

<script lang="ts" setup>
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { h } from 'vue';
</script>

<template>
  <a-space direction="vertical">
    <a-space warp>
      <a-tooltip title="search">
        <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button type="primary" shape="circle">A</a-button>
      <a-button type="primary" :icon="h(SearchOutlined)">Search</a-button>
      <a-tooltip title="search">
        <a-button shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button :icon="h(SearchOutlined)">Search</a-button>
    </a-space>
    <a-space warp>
      <a-tooltip title="search">
        <a-button shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button :icon="h(SearchOutlined)">Search</a-button>
      <a-tooltip title="search">
        <a-button type="dashed" shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button type="dashed" :icon="h(SearchOutlined)">Search</a-button>
      <a-button :icon="h(SearchOutlined)" href="https://www.google.com" />
    </a-space>
  </a-space>
</template>
