<docs>
---
order: 0
title:
  zh-CN: 普通提示
  en-US: Normal prompt
---

## zh-CN

信息提醒反馈。

## en-US

Normal message for information.

</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui';

  function info() {
    message.info('This is a normal message');
  }
</script>

<template>
  <a-button type="primary" @click="info">Display normal message</a-button>
</template>
