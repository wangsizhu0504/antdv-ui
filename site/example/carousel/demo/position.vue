<docs>
---
order: 1
title:
  zh-CN: 位置
  en-US: Position
---

## zh-CN

位置有 4 个方向。

## en-US

There are 4 position options available.
</docs>

<script lang="ts" setup>
  import type { CarouselProps } from '@antdv/ui';
  import { ref } from 'vue';

  const dotPosition = ref<CarouselProps['dotPosition']>('top');
</script>

<template>
  <a-radio-group v-model:value="dotPosition" style="margin-bottom: 8px">
    <a-radio-button value="top">Top</a-radio-button>
    <a-radio-button value="bottom">Bottom</a-radio-button>
    <a-radio-button value="left">Left</a-radio-button>
    <a-radio-button value="right">Right</a-radio-button>
  </a-radio-group>
  <a-carousel :dot-position="dotPosition">
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
