<docs>
---
order: 12
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.
</docs>

<script lang="ts" setup>
  import type { TreeSelectProps } from '@antdv/ui';
  import { SmileOutlined } from '@ant-design/icons-vue';
  import { ref, watch } from 'vue';

  const value = ref<string>();
  const value1 = ref<string[]>([]);
  const treeData = ref<TreeSelectProps['treeData']>([
    {
      title: 'parent 1',
      value: 'parent 1',
      children: [
        {
          title: 'parent 1-0',
          value: 'parent 1-0',
          children: [
            {
              title: 'my leaf',
              value: 'leaf1',
            },
            {
              title: 'your leaf',
              value: 'leaf2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          value: 'parent 1-1',
        },
      ],
    },
  ]);
  watch(value, () => {
    console.log('select', value.value);
  });
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
      :field-names="{
        children: 'children',
        value: 'value',
        label: 'title',
      }"
      tree-node-filter-prop="title"
    >
      <template #suffixIcon><SmileOutlined /></template>
    </a-tree-select>

    <a-tree-select
      v-model:value="value1"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      multiple
      show-arrow
      tree-default-expand-all
      :tree-data="treeData"
      :field-names="{
        children: 'children',
        value: 'value',
        label: 'title',
      }"
      tree-node-filter-prop="title"
    >
      <template #suffixIcon><SmileOutlined /></template>
    </a-tree-select>
  </a-space>
</template>
