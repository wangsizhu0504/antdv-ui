<docs>
---
order: 6
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

不同大小的级联选择器。

## en-US

Cascade selection box of different sizes.

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

<template>
  <a-cascader v-model:value="value" placeholder="Please select" size="large" :options="options" />
  <br />
  <br />
  <a-cascader v-model:value="value" placeholder="Please select" :options="options" />
  <br />
  <br />
  <a-cascader v-model:value="value" placeholder="Please select" size="small" :options="options" />
  <br />
  <br />
</template>
