<docs>
---
order: 0
title:
  en-US: Resizable column
  zh-CN: 可伸缩列
---

## zh-CN

设置 resizable 开启拖动列

鼠标 hover 到 Name、 Age 分割线上体验一下吧

## en-US

set resizable for drag column
</docs>

<script lang="ts" setup>
  import type { TableColumnsType } from '@antdv/ui';
  import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const columns = ref<TableColumnsType>([
    {
      dataIndex: 'name',
      key: 'name',
      resizable: true,
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      resizable: true,
      width: 100,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ]);
  function handleResizeColumn(w, col) {
    col.width = w;
  }
</script>

<template>
  <a-table :columns="columns" :data-source="data" @resize-column="handleResizeColumn">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <SmileOutlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <DownOutlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>
