<docs>
---
order: 7
version: 3.0
title:
  zh-CN: 基于 Promise 的异步关闭 (3.0+)
  en-US: Asynchronously close on Promise (3.0+)
---

## zh-CN

点击确定后异步关闭 Popconfirm，例如提交表单。

## en-US

Asynchronously close a popconfirm when the OK button is pressed. For example, you can use this pattern when you submit a form.

</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui';

  function confirm(e: MouseEvent) {
    console.log(e);
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 3000);
    });
  }

  function cancel(e: MouseEvent) {
    console.log(e);
    message.error('Click on No');
  }
</script>

<template>
  <a-popconfirm title="Title" @confirm="confirm" @cancel="cancel">
    <a-button type="primary">Open Popconfirm with Promise</a-button>
  </a-popconfirm>
</template>
