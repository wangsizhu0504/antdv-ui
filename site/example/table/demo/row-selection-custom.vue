<docs>
---
order: 4
title:
  en-US: Custom selection
  zh-CN: 自定义选择项
---

## zh-CN
通过 `rowSelection.selections` 自定义选择项，默认不显示下拉选项，设为 `true` 时显示默认选择项。

## en-US
Use `rowSelection.selections` custom selections, default no select dropdown, show default selections via setting to `true`.

</docs>

<script lang="ts" setup>
  import { Table } from '@antdv/ui';
  import { computed, ref, unref } from 'vue';

  interface DataType {
    key: string | number;
    name: string;
    age: number;
    address: string;
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const selectedRowKeys = ref<Array<DataType['key']>>([]); // Check here to configure the default column

  function onSelectChange(changableRowKeys: string[]) {
    console.log('selectedRowKeys changed: ', changableRowKeys);
    selectedRowKeys.value = changableRowKeys;
  }

  const rowSelection = computed(() => {
    return {
      selectedRowKeys: unref<any>(selectedRowKeys),
      onChange: onSelectChange,
      hideDefaultSelections: true,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            selectedRowKeys.value = newSelectedRowKeys;
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            selectedRowKeys.value = newSelectedRowKeys;
          },
        },
      ],
    };
  });
</script>

<template>
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
</template>
