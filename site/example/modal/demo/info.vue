<docs>
---
order: 4
title:
  zh-CN: 信息提示
  en-US: Information modal dialog
---

## zh-CN

各种类型的信息提示，只提供一个按钮用于关闭。

## en-US

In the various types of information modal dialog, only one button to close dialog is provided.

</docs>

<script lang="ts" setup>
  import { Modal } from '@antdv/ui';
  import { h } from 'vue';

  function info() {
    Modal.info({
      title: 'This is a notification message',
      content: h('div', {}, [
        h('p', 'some messages...some messages...'),
        h('p', 'some messages...some messages...'),
      ]),
      onOk() {
        console.log('ok');
      },
    });
  }
  function success() {
    Modal.success({
      title: 'This is a success message',
      content: h('div', {}, [
        h('p', 'some messages...some messages...'),
        h('p', 'some messages...some messages...'),
      ]),
    });
  }

  function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }

  function warning() {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  }
</script>

<template>
  <a-space wrap>
    <a-button @click="info">Info</a-button>
    <a-button @click="success">Success</a-button>
    <a-button @click="error">Error</a-button>
    <a-button @click="warning">Warning</a-button>
  </a-space>
</template>
