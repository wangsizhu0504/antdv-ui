<docs>
---
order: 4
title:
  zh-CN: 自定义全选文字
  en-US: Custom Select All Labels
---

## zh-CN

自定义穿梭框全选按钮的文字。

## en-US

Custom the labels for select all checkboxs.

</docs>

<script lang="ts" setup>
  import type { SelectAllLabel } from '@antdv/ui/es/transfer';
  import { ref } from 'vue';

  interface MockData {
    key: string;
    title: string;
    description: string;
    disabled: boolean;
  }
  const mockData: MockData[] = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 3 < 1,
    });
  }

  const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
  const disabled = ref<boolean>(false);

  const targetKeys = ref<string[]>(oriTargetKeys);

  const selectedKeys = ref<string[]>(['1', '4']);

  function handleChange(nextTargetKeys: string[], direction: string, moveKeys: string[]) {
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }
  function handleSelectChange(sourceSelectedKeys: string[], targetSelectedKeys: string[]) {
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }
  function handleScroll(direction: string, e: Event) {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  const selectAllLabels: SelectAllLabel[] = [
    'Select All',
    ({ selectedCount, totalCount }) => `${selectedCount}/${totalCount}`,
  ];
</script>

<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      v-model:selected-keys="selectedKeys"
      :data-source="mockData"
      :titles="['Source', 'Target']"
      :render="item => item.title"
      :select-all-labels="selectAllLabels"
      :disabled="disabled"
      @change="handleChange"
      @select-change="handleSelectChange"
      @scroll="handleScroll"
    />
    <a-switch
      v-model:checked="disabled"
      un-checked-children="enabled"
      checked-children="disabled"
      style="margin-top: 16px"
    />
  </div>
</template>
