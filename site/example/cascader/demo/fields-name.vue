<docs>
---
order: 10
title:
  zh-CN: 自定义字段名
  en-US: Custom Field Names
---

## zh-CN

自定义字段名。

## en-US

Custom Field Names

</docs>

<script lang="ts" setup>
  import type { CascaderProps } from '@antdv/ui'
  import { ref } from 'vue'

  const options: CascaderProps['options'] = [
    {
      code: 'zhejiang',
      name: 'Zhejiang',
      items: [
        {
          code: 'hangzhou',
          name: 'Hangzhou',
          items: [
            {
              code: 'xihu',
              name: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      code: 'jiangsu',
      name: 'Jiangsu',
      items: [
        {
          code: 'nanjing',
          name: 'Nanjing',
          items: [
            {
              code: 'zhonghuamen',
              name: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ]
  const value = ref<string[]>([])
</script>

<template>
  <a-cascader
    v-model:value="value"
    :field-names="{ label: 'name', value: 'code', children: 'items' }"
    :options="options"
    placeholder="Please select"
  />
</template>
