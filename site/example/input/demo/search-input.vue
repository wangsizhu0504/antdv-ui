<docs>
---
order: 3
title:
  zh-CN: 搜索框
  en-US: Search box
---

## zh-CN

带有搜索按钮的输入框。

## en-US

Example of creating a search box by grouping a standard input with a search button.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const value = ref<string>('');

  function onSearch(searchValue: string) {
    console.log('use value', searchValue);
    console.log('or use this.value', value.value);
  }
</script>

<template>
  <a-space direction="vertical">
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"
    />
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
    />
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      size="large"
      @search="onSearch"
    >
      <template #enterButton>
        <a-button>Custom</a-button>
      </template>
    </a-input-search>
  </a-space>
</template>
