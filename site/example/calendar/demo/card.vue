<docs>
---
order: 1
title:
  zh-CN: 卡片模式
  en-US: Card
---

## zh-CN

用于嵌套在空间有限的容器中。

## en-US

Nested inside a container element for rendering in limited space.
</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs';
  import { ref } from 'vue';

  const value = ref<Dayjs>();
  function onPanelChange(value: Dayjs, mode: string) {
    console.log(value, mode);
  }
</script>

<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" @panel-change="onPanelChange" />
  </div>
</template>
