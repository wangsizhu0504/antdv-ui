<docs>
---
order: 4
title:
  zh-CN: 动态展示
  en-US: Dynamic
---

## zh-CN

会动的进度条才是好进度条。

## en-US

A dynamic progress bar is better.

</docs>

<script lang="ts" setup>
  import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const defaultPercent = ref<number>(0);

  function increase() {
    const percent = defaultPercent.value + 10;
    defaultPercent.value = percent > 100 ? 100 : percent;
  }

  function decline() {
    const percent = defaultPercent.value - 10;
    defaultPercent.value = percent < 0 ? 0 : percent;
  }
</script>

<template>
  <div>
    <a-progress :percent="defaultPercent" />
    <a-button-group>
      <a-button @click="decline">
        <template #icon><MinusOutlined /></template>
      </a-button>
      <a-button @click="increase">
        <template #icon><PlusOutlined /></template>
      </a-button>
    </a-button-group>
  </div>
</template>
