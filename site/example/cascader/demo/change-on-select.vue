<docs>
---
order: 5
title:
  zh-CN: 选择即改变
  en-US: Change on select
---

## zh-CN

这种交互允许只选中父级选项。

## en-US

Allow only select parent options.

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
  <a-cascader
    v-model:value="value"
    :options="options"
    placeholder="Please select"
    change-on-select
  />
</template>
