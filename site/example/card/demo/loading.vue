<docs>
---
order: 6
title:
  zh-CN: 预加载的卡片
  en-US: Loading card
---

## zh-CN

数据读入前会有文本块样式

## en-US

Shows a loading indirector while the contents of the card is being featched

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const loading = ref<any>(true);

  function handleClick() {
    loading.value = !loading.value;
  }
</script>

<template>
  <a-card :loading="loading" title="Card title">whatever content</a-card>
  <a-button style="margin-top: 16px" @click="handleClick">Toggle loading</a-button>
</template>
