<docs>
---
order: 4
title:
  zh-CN: 获得选项的文本
  en-US: Get value of selected item
---

## zh-CN

默认情况下 `onChange` 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 `labelInValue` 属性。
选中项的 label 会被包装到 value 中传递给 `onChange` 等函数，此时 value 是一个对象。

## en-US

As a default behavior, the onChange callback can only get the value of the selected item. The labelInValue prop can be used to get the label property of the selected item.
The label of the selected item will be packed as an object for passing to the onChange callback.

</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui';
  import { ref } from 'vue';

  const options = ref<SelectProps['options']>([
    {
      value: 'jack',
      label: 'Jack (100)',
    },
    {
      value: 'lucy',
      label: 'Lucy (101)',
    },
  ]);
  const handleChange: SelectProps['onChange'] = (value) => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };

  const value = ref<any>('lucy');
</script>

<template>
  <a-select
    v-model:value="value"
    label-in-value
    style="width: 120px"
    :options="options"
    @change="handleChange"
  />
</template>
