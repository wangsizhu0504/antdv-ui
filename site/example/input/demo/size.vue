<docs>
---
order: 5
title:
  zh-CN: 三种大小
  en-US: Three sizes of Input
---

## zh-CN

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。

## en-US

There are three sizes of an Input box: `large` (40px)、`default` (32px) and `small` (24px).

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const value = ref<string>('');
</script>

<template>
  <div class="components-input-demo-size">
    <a-input v-model:value="value" size="large" placeholder="large size" />
    <a-input v-model:value="value" placeholder="default size" />
    <a-input v-model:value="value" size="small" placeholder="small size" />
  </div>
</template>

<style scoped>
.components-input-demo-size .ant-input {
  width: 200px;
  margin: 0 8px 8px 0;
}
</style>
