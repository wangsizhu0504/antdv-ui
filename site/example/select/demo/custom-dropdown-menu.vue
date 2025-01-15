<docs>
---
order: 13
title:
  zh-CN: 扩展菜单
  en-US: Custom dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。

## en-US

Customize the dropdown menu via `dropdownRender`.

</docs>

<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';

  const VNodes = defineComponent({
    props: {
      vnodes: {
        type: Object,
        required: true,
      },
    },
    render() {
      return this.vnodes;
    },
  });

  let index = 0;
  const items = ref<any>(['jack', 'lucy']);
  const value = ref<any>('lucy');

  function addItem() {
    console.log('addItem');
    items.value.push(`New item ${(index += 1)}`);
  }
</script>

<template>
  <a-select
    v-model:value="value"
    style="width: 120px"
    :options="items.map(item => ({ value: item }))"
  >
    <template #dropdownRender="{ menuNode: menu }">
      <VNodes :vnodes="menu" />
      <a-divider style="margin: 4px 0" />
      <div
        style="padding: 4px 8px; cursor: pointer"
        @mousedown="e => e.preventDefault()"
        @click="addItem"
      >
        <PlusOutlined />
        Add item
      </div>
    </template>
  </a-select>
</template>
