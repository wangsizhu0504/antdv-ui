<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

省市区级联。

## en-US

Cascade selection box for selecting province/city/district.

</docs>
<template>
  <a-cascader v-model:value="value" :options="options" placeholder="Please select" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from '@antdv/ui';
const options: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const value = ref<string[]>([]);
</script>
