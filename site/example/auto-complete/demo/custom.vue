<docs>
---
order: 2
title:
  zh-CN: 自定义输入组件
  en-US: Customize Input Component
---

## zh-CN

自定义输入组件。

## en-US

Customize Input Component.
</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const value = ref<any>('');
  const options = ref<Array<{ value: string }>>([]);
  function onSelect(value: string) {
    console.log('onSelect', value);
  }
  function handleSearch(value: string) {
    options.value = !value
      ? []
      : [{ value }, { value: value + value }, { value: value + value + value }];
  }
  function handleKeyPress(ev: KeyboardEvent) {
    console.log('handleKeyPress', ev);
  }
</script>

<template>
  <a-auto-complete
    v-model:value="value"
    :options="options"
    style="width: 200px"
    @search="handleSearch"
    @select="onSelect"
  >
    <a-textarea
      placeholder="input here"
      class="custom"
      style="height: 50px"
      @keypress="handleKeyPress"
    />
  </a-auto-complete>
</template>
