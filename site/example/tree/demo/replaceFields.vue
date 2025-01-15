<docs>
---
order: 9
title:
  zh-CN: 自定义字段
  en-US: ReplaceFields
---

## zh-CN

替换treeNode中 title,key,children字段为treeData中对应的字段

## en-US

Replace the title,key and children fields in treeNode with the corresponding fields in treeData.

</docs>

<script lang="ts" setup>
  import type { TreeProps } from '@antdv/ui'
  import type { Ref } from 'vue'
  import { ref, watch } from 'vue'

  const expandedKeys = ref<string[]>(['0-0-0', '0-0-1'])
  const selectedKeys = ref<string[]>(['0-0-0', '0-0-1'])
  const checkedKeys = ref<string[]>(['0-0-0', '0-0-1'])

  const fieldNames: TreeProps['fieldNames'] = {
    children: 'child',
    title: 'name',
  }

  const treeData: Ref<TreeProps['treeData']> = ref<any>([
    {
      name: 'parent 1',
      key: '0-0',
      child: [
        {
          name: '张晨成',
          key: '0-0-0',
          disabled: true,
          child: [
            { name: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { name: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          name: 'parent 1-1',
          key: '0-0-1',
          child: [{ key: '0-0-1-0', name: 'zcvc' }],
        },
      ],
    },
  ])
  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys)
  })
  watch(selectedKeys, () => {
    console.log('selectedKeys', selectedKeys)
  })
  watch(checkedKeys, () => {
    console.log('checkedKeys', checkedKeys)
  })
</script>

<template>
  <a-tree
    v-model:expanded-keys="expandedKeys"
    v-model:selected-keys="selectedKeys"
    v-model:checked-keys="checkedKeys"
    checkable
    :tree-data="treeData"
    :field-names="fieldNames"
  >
    <template #title="{ name, key }">
      <span v-if="key === '0-0-1'" style="color: #1890ff">{{ name }}</span>
      <template v-else>{{ name }}</template>
    </template>
  </a-tree>
</template>
