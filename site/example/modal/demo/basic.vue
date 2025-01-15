<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic usage
---

## zh-CN

第一个对话框。

## en-US

Basic modal.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const open = ref<boolean>(false);

  function showModal() {
    open.value = true;
  }

  function handleOk(e: MouseEvent) {
    console.log(e);
    open.value = false;
  }
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
