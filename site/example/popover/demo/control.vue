<docs>
---
order: 3
title:
  zh-CN: 从浮层内关闭
  en-US: Controlling the close of the dialog
---

## zh-CN

使用 `visible` 属性控制浮层显示。

## en-US

Use `visible` prop to control the display of the card.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const visible = ref<boolean>(false);

  function hide() {
    visible.value = false;
  }
</script>

<template>
  <a-popover v-model:open="visible" title="Title" trigger="click">
    <template #content>
      <a @click="hide">Close</a>
    </template>
    <a-button type="primary">Click me</a-button>
  </a-popover>
</template>
