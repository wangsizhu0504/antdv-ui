<docs>
---
order: 8
title:
  zh-CN: 自定义清除按钮
  en-US: Customize clear button
---

## zh-CN

自定义清除按钮。

## en-US

Customize clear button.
</docs>

<script lang="ts" setup>
  import { CloseOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'

  interface MockVal {
    value: string;
  }

  function mockVal(str: string, repeat = 1): MockVal {
    return {
      value: str.repeat(repeat),
    }
  }
  const value = ref<any>('')
  const options = ref<MockVal[]>([])
  function onSearch(searchText: string) {
    console.log('searchText')
    options.value = !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
  }
  function onSelect(value: string) {
    console.log('onSelect', value)
  }
</script>

<template>
  <a-auto-complete
    v-model:value="value"
    :options="options"
    style="width: 200px"
    placeholder="Clearable"
    :allow-clear="true"
    @select="onSelect"
    @search="onSearch"
  />
  <br />
  <br />
  <a-auto-complete
    v-model:value="value"
    :options="options"
    style="width: 200px"
    placeholder="Customized clear icon"
    :allow-clear="true"
    @select="onSelect"
    @search="onSearch"
  >
    <template #clearIcon>
      <CloseOutlined />
    </template>
  </a-auto-complete>
</template>
