<docs>
---
order: 19
version: 3.3.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 AutoComplete 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to AutoComplete with `status`, which could be `error` or `warning`.

</docs>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  interface MockVal {
    value: string;
  }
  function mockVal(str: string, repeat = 1): MockVal {
    return {
      value: str.repeat(repeat),
    };
  }
  const value = ref<any>('');
  const value1 = ref<any>('');
  const options = ref<MockVal[]>([]);
  function onSearch(searchText: string) {
    console.log('searchText');
    options.value = !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  }
  function onSelect(value: string) {
    console.log('onSelect', value);
  }
  function onClear() {
    console.log('onClear');
  }
  watch(value, () => {
    console.log('value', value.value);
  });
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-auto-complete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="input here"
      status="error"
      @select="onSelect"
      @search="onSearch"
    />
    <a-auto-complete
      v-model:value="value1"
      :options="options"
      style="width: 200px"
      placeholder="input here"
      status="warning"
      allow-clear
      @select="onSelect"
      @search="onSearch"
      @clear="onClear"
    />
  </a-space>
</template>
