<docs>
---
order: 3
title:
  zh-CN: 自定义下拉选项
  en-US: Custom dropdown options
---

## zh-CN

自定义下拉选项，例如添加全部选项

## en-US

Customize dropdown options such as adding all options
</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
  const current = ref<any>(1);
  const pageSizeRef = ref<any>(10);
  const total = ref<any>(50);
  function onShowSizeChange(current: number, pageSize: number) {
    console.log(current, pageSize);
    pageSizeRef.value = pageSize;
  }
</script>

<template>
  <a-pagination
    v-model:current="current"
    v-model:page-size="pageSizeRef"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    @show-size-change="onShowSizeChange"
  >
    <template #buildOptionText="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-else>全部</span>
    </template>
  </a-pagination>
</template>
