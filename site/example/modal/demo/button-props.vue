<docs>
---
order: 11
title:
  zh-CN: 自定义页脚按钮属性
  en-US: Customize footer buttons props
---

## zh-CN

传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。

## en-US

Passing `okButtonProps` and `cancelButtonProps` can customize the ok button and cancel button props.

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
    <a-button type="primary" @click="showModal">Open Modal with customized button props</a-button>
    <a-modal
      v-model:open="open"
      title="Basic Modal"
      :ok-button-props="{ disabled: true }"
      :cancel-button-props="{ disabled: true }"
      @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
