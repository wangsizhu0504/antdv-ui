<docs>
---
order: 0
title:
  en-US: Basic Usage
  zh-CN: 基本用法
---

## zh-CN

简单的表格，最后一列是各种操作。

## en-US

Simple table with actions.
</docs>

<script lang="ts" setup>
  import { DownOutlined, SmileOutlined } from '@ant-design/icons-vue';

  const columns = [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
  ];

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
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="scope">
      <template v-if="scope?.column.key === 'name'">
        <span>
          <SmileOutlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="scope">
      <template v-if="scope?.column.key === 'name'">
        <a>
          {{ scope?.record.name }}
        </a>
      </template>
      <template v-else-if="scope?.column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in scope?.record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="scope?.column.key === 'action'">
        <span>
          <a>Invite 一 {{ scope?.record.name }}</a>
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
