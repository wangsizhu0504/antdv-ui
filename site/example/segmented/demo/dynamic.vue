<docs>
---
order: 6
title:
 zh-CN: 动态数据
 en-US: Dynamic
---

## zh-CN

动态加载数据。

## en-US
Load dynamically.
</docs>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'

  const data = reactive(['Daily', 'Weekly', 'Monthly'])
  const isDisabled = ref<any>(false)
  function loadMore() {
    data.push(...['Quarterly', 'Yearly'])
    isDisabled.value = true
  }
  const value = ref<any>(data[0])
</script>

<template>
  <a-segmented v-model:value="value" :options="data"/>
  <br />
  <br />
  <a-button type="primary" :disabled="isDisabled" @click="loadMore">Load More</a-button>
</template>
