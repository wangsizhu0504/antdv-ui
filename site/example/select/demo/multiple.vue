<docs>
---
order: 5
title:
  zh-CN: 多选
  en-US: Multiple selection
---

## zh-CN

多选，从已有条目中选择（scroll the menu）

## en-US

Multiple selection, selecting from existing items (scroll the menu).

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  function handleChange(value: string[]) {
    console.log(`selected ${value}`);
  }
  const value = ref<any>(['a1', 'b2']);
</script>

<template>
  <a-select
    v-model:value="value"
    mode="multiple"
    style="width: 100%"
    placeholder="Please select"
    :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
    @change="handleChange"
  />
</template>
