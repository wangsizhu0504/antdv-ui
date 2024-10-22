<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic usage
---

## zh-CN

基本用法

## en-US

Basic usage.

</docs>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const value = ref<string>('@afc163')
  watch(value, () => {
    console.log('value', value)
  })
  function onSelect(option: { value: string }) {
    console.log('select', option)
  }

  const options = [
    {
      value: 'afc163',
      label: 'afc163',
    },
    {
      value: 'zombieJ',
      label: 'zombieJ',
    },
    {
      value: 'yesmeck',
      label: 'yesmeck',
    },
  ]
</script>

<template>
  <a-mentions v-model:value="value" autofocus :options="options" @select="onSelect"/>
</template>
