<docs>
---
order: 3
title:
  zh-CN: 可勾选
  en-US: Checkable
---

## zh-CN

使用勾选框实现多选功能。

## en-US

Multiple and checkable.

</docs>

<script lang="ts" setup>
  import type { TreeSelectProps } from '@antdv/ui'
  import { TreeSelect } from '@antdv/ui'
  import { ref, watch } from 'vue'

  const SHOW_PARENT = TreeSelect.SHOW_PARENT

  const treeData: TreeSelectProps['treeData'] = [
    {
      label: 'Node1',
      value: '0-0',
      children: [
        {
          label: 'Child Node1',
          value: '0-0-0',
        },
      ],
    },
    {
      label: 'Node2',
      value: '0-1',

      children: [
        {
          label: 'Child Node3',
          value: '0-1-0',
          disabled: true,
        },
        {
          label: 'Child Node4',
          value: '0-1-1',
        },
        {
          label: 'Child Node5',
          value: '0-1-2',
        },
      ],
    },
  ]

  const value = ref<string[]>(['0-0-0'])

  watch(value, () => {
    console.log(value.value)
  })
</script>

<template>
  <a-tree-select
    v-model:value="value"
    style="width: 100%"
    :tree-data="treeData"
    tree-checkable
    allow-clear
    :show-checked-strategy="SHOW_PARENT"
    placeholder="Please select"
    tree-node-filter-prop="label"
  />
</template>
