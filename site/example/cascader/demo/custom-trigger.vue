<docs>
---
order: 2
title:
  zh-CN: 可以自定义显示
  en-US: Custom trigger
---

## zh-CN

切换按钮和结果分开。

## en-US

Separate trigger button and result.

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
  const text = ref<string>('Unselect');

  const onChange: CascaderProps['onChange'] = (_value, selectedOptions) => {
    text.value = selectedOptions.map(o => o.label).join(', ');
  };
</script>

<template>
  <span>
    {{ text }} &nbsp;
    <a-cascader
      v-model:value="value"
      placeholder="Please select"
      :options="options"
      @change="onChange"
    >
      <a href="#">Change city</a>
    </a-cascader>
  </span>
</template>
