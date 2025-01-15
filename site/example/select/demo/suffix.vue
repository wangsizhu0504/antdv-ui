<docs>
---
order: 11
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

基本使用。

## en-US

Basic Usage

</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui'
  import { MehOutlined, SmileOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'

  function handleChange(value: string) {
    console.log(`selected ${value}`)
  }

  const options1 = ref<SelectProps['options']>([
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'disabled',
      label: 'Disabled',
      disabled: true,
    },
    {
      value: 'yiminghe',
      label: 'Yiminghe',
    },
  ])
  const options2 = ref<SelectProps['options']>([
    {
      value: 'lucy',
      label: 'Lucy',
    },
  ])
  const value1 = ref<any>('lucy')
  const value2 = ref<any>('lucy')
</script>

<template>
  <a-space>
    <a-select
      v-model:value="value1"
      style="width: 120px"
      :options="options1"
      @change="handleChange"
    >
      <template #suffixIcon><SmileOutlined class="ant-select-suffix" /></template>
    </a-select>
    <a-select v-model:value="value2" style="width: 120px" disabled :options="options2">
      <template #suffixIcon><MehOutlined class="ant-select-suffix" /></template>
    </a-select>
  </a-space>
</template>
