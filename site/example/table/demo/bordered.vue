<docs>
---
order: 12
title:
  en-US: border, title and footer
  zh-CN: 带边框
---

## zh-CN

添加表格边框线，页头和页脚。

## en-US

Add border, title and footer for table.
</docs>

<script lang="ts" setup>
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ];
</script>

<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #title>Header</template>
    <template #footer>Footer</template>
  </a-table>
</template>

<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
