<docs>
---
order: 1
title:
  zh-CN: 自定义选项
  en-US: Customized
---

## zh-CN

3.0 以上版本，可以传递 `v-slot:option` 来自定义 Option。

## en-US

For 3.0+, You could pass `v-slot:option` to custom option.
</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const value = ref<any>('');
  const options = ref<Array<{ value: string }>>([]);
  function handleSearch(val: string) {
    let res: Array<{ value: string }>;
    if (!val || val.includes('@')) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({ value: `${val}@${domain}` }));
    }
    options.value = res;
  }
</script>

<template>
  <a-auto-complete
    v-model:value="value"
    style="width: 200px"
    placeholder="input here"
    :options="options"
    @search="handleSearch"
  >
    <template #option="{ value: val }">
      {{ val.split('@')[0] }} @
      <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
    </template>
  </a-auto-complete>
</template>
