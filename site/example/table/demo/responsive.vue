<docs>
---
order: 30
title:
  en-US: Responsive
  zh-CN: 响应式
---

## zh-CN

响应式配置列的展示。

## en-US

Responsive columns.
</docs>

<script lang="ts" setup>
  import type { ColumnsType } from '@antdv/ui/es/table/interface';

  const columns: ColumnsType = [
    {
      title: 'Name (all screens)',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age (medium screen or bigger)',
      dataIndex: 'age',
      key: 'age',
      responsive: ['md'],
    },
    {
      title: 'Address (large screen or bigger)',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
  ];
</script>

<template>
  <a-table :columns="columns" :row-key="record => record.key" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
    </template>
  </a-table>
</template>
