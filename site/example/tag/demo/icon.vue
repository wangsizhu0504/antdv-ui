<docs>
---
order: 6
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

当需要在 `Tag` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Tag` 内使用 `Icon` 组件。
如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。

## en-US

`Tag` components can contain an `Icon`. This is done by setting the `icon` property or placing an `Icon` component within the `Tag`.
If you want specific control over the positioning and placement of the `Icon`, then that should be done by placing the `Icon` component within the `Tag` rather than using the `icon` property.
</docs>

<script lang="ts" setup>
  import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <a-tag color="#55acee">
    <template #icon>
      <TwitterOutlined />
    </template>
    Twitter
  </a-tag>
  <a-tag color="#cd201f">
    <template #icon>
      <YoutubeOutlined />
    </template>
    Youtube
  </a-tag>
  <a-tag color="#3b5999">
    <template #icon>
      <FacebookOutlined />
    </template>
    Facebook
  </a-tag>
  <a-tag color="#55acee">
    <template #icon>
      <LinkedinOutlined />
    </template>
    LinkedIn
  </a-tag>
</template>
