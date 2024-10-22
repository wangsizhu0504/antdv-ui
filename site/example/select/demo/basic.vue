<docs>
---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。

## en-US

Basic Usage

</docs>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { SelectProps } from '@antdv/ui'

  const value1 = ref<any>('lucy')
  const value2 = ref<any>('lucy')
  const value3 = ref<any>('lucy')
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
  const options3 = ref<SelectProps['options']>([
    {
      value: 'lucy',
      label: 'Lucy',
    },
  ])
  function focus() {
    console.log('focus')
  }

  function handleChange(value: string) {
    console.log(`selected ${value}`)
  }
</script>

<template>
  <h2>use a-select-option</h2>
  <a-space>
    <a-select
      v-model:value="value1"
      style="width: 120px"
      @focus="focus"
      @change="handleChange"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-select v-model:value="value2" style="width: 120px" disabled>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
    <a-select v-model:value="value3" style="width: 120px" loading>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
  </a-space>
  <h2 style="margin-top: 10px">use options (recommend)</h2>
  <a-space>
    <a-select
      v-model:value="value1"
      style="width: 120px"
      :options="options1"
      @focus="focus"
      @change="handleChange"
    />
    <a-select v-model:value="value2" style="width: 120px" disabled :options="options2"/>
    <a-select v-model:value="value3" style="width: 120px" loading :options="options3"/>
  </a-space>
</template>
