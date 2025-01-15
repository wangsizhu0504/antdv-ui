<docs>
---
order: 6
title:
  zh-CN: 自定义图标
  en-US: Customize Icon
---

## zh-CN

可以针对不同的节点定制图标。

## en-US

You can customize icons for different nodes.

</docs>

<script lang="ts" setup>
  import type { TreeProps } from '@antdv/ui';
  import { DownOutlined, FrownFilled, FrownOutlined, SmileOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const treeData: TreeProps['treeData'] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        { title: 'leaf', key: '0-0-0' },
        { title: 'leaf', key: '0-0-1' },
      ],
    },
  ];
  const selectedKeys = ref<any>(['0-0-0']);
</script>

<template>
  <a-tree v-model:selected-keys="selectedKeys" :tree-data="treeData" show-icon default-expand-all>
    <template #switcherIcon="{ switcherCls }"><DownOutlined :class="switcherCls" /></template>
    <template #icon="{ key, selected }">
      <template v-if="key === '0-0'">
        <SmileOutlined />
      </template>
      <template v-else-if="key === '0-0-0'">
        <SmileOutlined />
      </template>
      <template v-else>
        <FrownFilled v-if="selected" />
        <FrownOutlined v-else />
      </template>
    </template>
  </a-tree>
</template>
