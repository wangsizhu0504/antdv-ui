<docs>
---
order: 0
title:
  zh-CN: 自定义 label、value、options 字段
  en-US: Custom `label` `value` `options` field
---

## zh-CN

方便数据结构转换。

仅支持 options 传递，不支持 a-select-option 构造节点。

## en-US

Easy data structure conversion.

Only options passing is supported, a-select-option construction node is not supported.

</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui';
  import { ref } from 'vue';

  const value = ref<any>('lucy');
  const options = ref<SelectProps['options']>([
    {
      id: 'jack',
      name: 'Jack',
      children: [
        {
          id: 'small jack',
          name: 'small Jack',
        },
      ],
    },
    {
      id: 'lucy',
      name: 'Lucy',
    },
    {
      id: 'disabled',
      name: 'Disabled',
      disabled: true,
    },
    {
      id: 'yiminghe',
      name: 'Yiminghe',
    },
  ]);

  function focus() {
    console.log('focus');
  }

  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }
</script>

<template>
  <a-select
    ref="select"
    v-model:value="value"
    style="width: 120px"
    :options="options"
    :field-names="{ label: 'name', value: 'id', options: 'children' }"
    @focus="focus"
    @change="handleChange"
  />
</template>
