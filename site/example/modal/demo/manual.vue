<docs>
---
order: 6
title:
  zh-CN: 手动更新和移除
  en-US: Manual to update destroy
---

## zh-CN

手动更新和关闭 `Modal.method` 方式创建的对话框。

## en-US

Manually updating and destroying a modal from `Modal.method`.

</docs>

<script lang="ts" setup>
  import { Modal } from '@antdv/ui';

  function countDown() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const interval = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      modal.destroy();
    }, secondsToGo * 1000);
  }
</script>

<template>
  <a-button @click="countDown">Open modal to close in 5s</a-button>
</template>
