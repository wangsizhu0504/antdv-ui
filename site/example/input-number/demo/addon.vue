<docs>
---
order: 2
title:
  zh-CN: 前置/后置标签
  en-US: Pre / Post tab
---

## zh-CN

用于配置一些固定组合。

## en-US

Using pre & post tabs example.

</docs>

<script lang="ts" setup>
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const value1 = ref<any>(100);
  const value2 = ref<any>(100);
  const value3 = ref<any>(100);
  const value4 = ref<any>(100);
  const addonBeforeValue = ref<any>('add');
  const addonAfterValue = ref<any>('USD');
</script>

<template>
  <a-space direction="vertical">
    <a-input-number v-model:value="value1" addon-before="+" addon-after="$"/>
    <a-input-number v-model:value="value2">
      <template #addonBefore>
        <a-select v-model:value="addonBeforeValue" style="width: 60px">
          <a-select-option value="add">+</a-select-option>
          <a-select-option value="minus">-</a-select-option>
        </a-select>
      </template>
      <template #addonAfter>
        <a-select v-model:value="addonAfterValue" style="width: 60px">
          <a-select-option value="USD">$</a-select-option>
          <a-select-option value="EUR">€</a-select-option>
          <a-select-option value="GBP">£</a-select-option>
          <a-select-option value="CNY">¥</a-select-option>
        </a-select>
      </template>
    </a-input-number>
    <a-input-number v-model:value="value3">
      <template #addonAfter><SettingOutlined /></template>
    </a-input-number>
    <a-input-number v-model:value="value4">
      <template #addonAfter>
        <a-cascader placeholder="cascader" style="width: 150px" />
      </template>
    </a-input-number>
  </a-space>
</template>
