<docs>
---
order: 6
title:
  en-US: Editable Cells
  zh-CN: 可编辑单元格
---

## zh-CN

带单元格编辑功能的表格。

## en-US

Table with editable cells.

</docs>

<script lang="ts" setup>
  import type { Ref, UnwrapRef } from 'vue';
  import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { computed, reactive, ref } from 'vue';

  interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
    },
  ];
  const dataSource: Ref<DataItem[]> = ref<any>([
    {
      key: '0',
      name: 'Edward King 0',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
  ]);
  const count = computed(() => dataSource.value.length + 1);
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

  function edit(key: string) {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  }
  function save(key: string) {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
  }

  function onDelete(key: string) {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
  }
  function handleAdd() {
    const newData = {
      key: `${count.value}`,
      name: `Edward King ${count.value}`,
      age: 32,
      address: `London, Park Lane no. ${count.value}`,
    };
    dataSource.value.push(newData);
  }
</script>

<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @press-enter="save(record.key)" />
            <CheckOutlined class="editable-cell-icon-check" @click="save(record.key)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <EditOutlined class="editable-cell-icon" @click="edit(record.key)" />
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
