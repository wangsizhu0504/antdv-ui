<docs>
---
order: 4
title:
  zh-CN: 可搜索
  en-US: Searchable
---

## zh-CN

可搜索的树。

## en-US

Searchable Tree.

</docs>

<script lang="ts" setup>
  import type { TreeProps } from '@antdv/ui';
  import { ref, watch } from 'vue';

  const x = 3;
  const y = 2;
  const z = 1;
  const genData: TreeProps['treeData'] = [];

  function generateData(_level: number, _preKey?: string, _tns?: TreeProps['treeData']) {
    const preKey = _preKey || '0';
    const tns = _tns || genData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: key, key });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return generateData(level, key, tns[index].children);
    });
  }
  generateData(z);

  const dataList: TreeProps['treeData'] = [];
  function generateList(data: TreeProps['treeData']) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }
  }
  generateList(genData);

  function getParentKey(key: string | number, tree: TreeProps['treeData']): string | number | undefined {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  }
  const expandedKeys = ref<Array<string | number>>([]);
  const searchValue = ref<string>('');
  const autoExpandParent = ref<boolean>(true);
  const gData = ref<TreeProps['treeData']>(genData);

  function onExpand(keys: string[]) {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  }

  watch(searchValue, (value) => {
    const expanded = dataList
      .map((item: TreeProps['treeData'][number]) => {
        if (item.title.includes(value)) {
          return getParentKey(item.key, gData.value);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    expandedKeys.value = expanded;
    searchValue.value = value;
    autoExpandParent.value = true;
  });
</script>

<template>
  <div>
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      @expand="onExpand"
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>
