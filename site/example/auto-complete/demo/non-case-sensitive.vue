<docs>
---
order: 3
title:
  zh-CN: 不区分大小写
  en-US: Non-case-sensitive AutoComplete
---

## zh-CN

不区分大小写的 AutoComplete。

## en-US

A non-case-sensitive AutoComplete.
</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  interface Option {
    value: string;
  }
  function filterOption(input: string, option: Option) {
    return option.value.toUpperCase().includes(input.toUpperCase());
  }
  const value = ref<any>('');
  const options = ref<Option[]>([
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ]);
</script>

<template>
  <a-auto-complete
    v-model:value="value"
    :options="options"
    style="width: 200px"
    placeholder="input here"
    :filter-option="filterOption"
  />
</template>
