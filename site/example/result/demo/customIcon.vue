<docs>
---
order: 7
title:
  zh-CN: 自定义 icon
  en-US: Custom icon
---

## zh-CN

自定义 icon。

## en-US

Custom icon.

</docs>

<script lang="ts" setup>
  import { SmileTwoTone } from '@ant-design/icons-vue';
</script>

<template>
  <a-result title="Great, we have done all the operations!">
    <template #icon>
      <SmileTwoTone />
    </template>
    <template #extra>
      <a-button type="primary">Next</a-button>
    </template>
  </a-result>
</template>
