<docs>
---
order: 7
title:
  zh-CN: 自定义已选项
  en-US: Custom render
---

## zh-CN

例如给最后一项加上邮编链接。

## en-US

For instance, add an external link after the selected value.

</docs>

<script lang="ts" setup>
  import type { CascaderProps } from '@antdv/ui';
  import { ref } from 'vue';

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
              code: 752100,
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
              code: 453400,
            },
          ],
        },
      ],
    },
  ];

  function handleAreaClick(e: Event, label: string, option: CascaderProps['options'][number]) {
    e.stopPropagation();
    console.log('clicked', label, option);
  }

  const value = ref<string[]>(['zhejiang', 'hangzhou', 'xihu']);
</script>

<template>
  <a-cascader
    v-model:value="value"
    placeholder="Please select"
    :options="options"
    style="width: 100%"
  >
    <template #displayRender="{ labels, selectedOptions }">
      <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
        <span v-if="index === labels.length - 1">
          {{ label }} (
          <a @click="e => handleAreaClick(e, label, selectedOptions[index])">
            {{ selectedOptions[index].code }}
          </a>
          )
        </span>
        <span v-else>{{ label }} /</span>
      </span>
    </template>
  </a-cascader>
</template>
