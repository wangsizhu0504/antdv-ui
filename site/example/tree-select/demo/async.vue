<docs>
---
order: 5
title:
  zh-CN: 异步加载
  en-US: Asynchronous loading
---

## zh-CN

异步加载树节点。

## en-US

Asynchronous loading tree node.

</docs>

<script lang="ts" setup>
  import type { TreeSelectProps } from '@antdv/ui';
  import { ref, watch } from 'vue';

  const value = ref<string>();
  const treeData = ref<TreeSelectProps['treeData']>([
    { id: 1, pId: 0, value: '1', title: 'Expand to load' },
    { id: 2, pId: 0, value: '2', title: 'Expand to load' },
    { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
  ]);

  watch(value, () => {
    console.log(value.value);
  });

  function genTreeNode(parentId: number, isLeaf = false): TreeSelectProps['treeData'][number] {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  }
  function onLoadData(treeNode: TreeSelectProps['treeData'][number]) {
    return new Promise((resolve) => {
      const { id } = treeNode.dataRef;
      setTimeout(() => {
        treeData.value = treeData.value.concat([
          genTreeNode(id, false),
          genTreeNode(id, true),
          genTreeNode(id, true),
        ]);
        console.log(treeData.value);
        resolve(true);
      }, 300);
    });
  }
</script>

<template>
  <a-tree-select
    v-model:value="value"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    placeholder="Please select"
    :load-data="onLoadData"
  />
</template>
