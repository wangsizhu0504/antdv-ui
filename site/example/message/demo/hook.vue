<docs>
---
order: 10
title:
  zh-CN: Hooks 调用（推荐）
  en-US: Hooks Usage (Recommend)
---

## zh-CN

通过 `message.useMessage` 创建支持读取 context 的 `contextHolder`。请注意，我们推荐通过顶层注册的方式代替 `message` 静态方法，因为静态方法无法消费上下文，因而 ConfigProvider 的数据也不会生效。

## en-US

Use `message.useMessage` to get `contextHolder` with context accessible issue. Please note that, we recommend to use top level registration instead of `message` static method, because static method cannot consume context, and ConfigProvider data will not work.

</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui';

  const [messageApi, contextHolder] = message.useMessage();

  function info() {
    messageApi.info('Hello, Ant Design Vue!');
  }
</script>

<template>
  <context-holder />
  <a-button type="primary" @click="info">Display normal message</a-button>
</template>
