<docs>
---
order: 2
title:
  zh-CN: 文字和图标
  en-US: Text & icon
---

## zh-CN

带有文字和图标。

## en-US

With text and icon.

</docs>

<script lang="ts" setup>
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { reactive } from 'vue';

  const state = reactive({
    checked1: true,
    checked2: false,
    checked3: false,
  });
</script>

<template>
  <a-space direction="vertical">
    <a-switch v-model:checked="state.checked1" checked-children="开" un-checked-children="关" />
    <a-switch v-model:checked="state.checked2" checked-children="1" un-checked-children="0" />
    <a-switch v-model:checked="state.checked3">
      <template #checkedChildren><CheckOutlined /></template>
      <template #unCheckedChildren><CloseOutlined /></template>
    </a-switch>
  </a-space>
</template>
