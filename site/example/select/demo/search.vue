<docs>
---
order: 9
title:
  zh-CN: 带搜索框
  en-US: Select with search field
---

## zh-CN

展开后可对选项进行搜索。

## en-US

Search the options while expanded.

</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui';
  import { ref } from 'vue';

  const options = ref<SelectProps['options']>([
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ]);
  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }
  function handleBlur() {
    console.log('blur');
  }
  function handleFocus() {
    console.log('focus');
  }
  function filterOption(input: string, option: any) {
    return option.value.toLowerCase().includes(input.toLowerCase());
  }

  const value = ref<string | undefined>(undefined);
</script>

<template>
  <a-select
    v-model:value="value"
    show-search
    placeholder="Select a person"
    style="width: 200px"
    :options="options"
    :filter-option="filterOption"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  />
</template>
