<docs>
---
order: 11
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

自定义后缀图标

## en-US

Custom suffix icon

</docs>

<script lang="ts" setup>
  import type { CascaderProps } from '@antdv/ui';
  import { SmileOutlined } from '@ant-design/icons-vue';
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
  const value1 = ref<string[]>([]);
  const value2 = ref<string[]>([]);
</script>

<template>
  <a-space>
    <a-cascader
      v-model:value="value1"
      style="margin-top: 1rem"
      :options="options"
      placeholder="Please select"
    >
      <template #suffixIcon><SmileOutlined class="test" /></template>
    </a-cascader>
    <a-cascader
      v-model:value="value2"
      suffix-icon="ab"
      style="margin-top: 1rem"
      :options="options"
      placeholder="Please select"
    />
  </a-space>
</template>
