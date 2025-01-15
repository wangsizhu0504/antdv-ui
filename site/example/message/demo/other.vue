<docs>
---
order: 3
title:
  zh-CN: 其他提示类型
  en-US: Other types of message
---

## zh-CN

包括成功、失败、警告。

## en-US

Messages of success, error and warning types.

</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui';

  function success() {
    message.success('This is a success message');
  }
  function error() {
    message.error('This is an error message');
  }
  function warning() {
    message.warning('This is a warning message');
  }
</script>

<template>
  <a-space>
    <a-button @click="success">Success</a-button>
    <a-button @click="error">Error</a-button>
    <a-button @click="warning">Warning</a-button>
  </a-space>
</template>
