<docs>
---
order: 3
title:
  zh-CN: 多色图标
  en-US: Two-tone icon and colorful icon
---

## zh-CN

双色图标可以通过 `two-tone-color` 属性设置主题色。

## en-US

You can set `two-tone-color` prop to specific primary color for two-tone icons.

</docs>

<script lang="ts" setup>
  import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons-vue';
</script>

<template>
  <a-space>
    <SmileTwoTone />
    <HeartTwoTone two-tone-color="#eb2f96" />
    <CheckCircleTwoTone two-tone-color="#52c41a" />
  </a-space>
</template>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}
</style>
