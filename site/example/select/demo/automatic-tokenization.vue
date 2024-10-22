<docs>
---
order: 3
title:
  zh-CN: 自动分词
  en-US: Automatic tokenization
---

## zh-CN

试下复制 `露西,杰克` 到输入框里。只在 tags 和 multiple 模式下可用。

## en-US

Try to copy `Lucy,Jack` to the input. Only available in tags and multiple mode.

</docs>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { SelectProps } from '@antdv/ui'

  const options = ref<SelectProps['options']>([
    {
      value: 'a1',
      label: 'a1',
    },
  ])
  const value = ref<string[]>([])
  function handleChange(value: []) {
    console.log(`selected ${value}`)
  }
  watch(value, () => {
    console.log('value', value.value)
  })
</script>

<template>
  <a-select
    v-model:value="value"
    mode="tags"
    style="width: 100%"
    :token-separators="[',']"
    placeholder="Automatic tokenization"
    :options="options"
    @change="handleChange"
  />
</template>
