<docs>
---
order: 7
title:
  zh-CN: 更新消息内容
  en-US: Update Message Content
---

## zh-CN

可以通过唯一的 key 来更新内容, 或者通过响应式数据更新。

## en-US

Update content with unique key, or use reactive data.

</docs>

<script lang="ts" setup>
  import { notification } from '@antdv/ui';
  import { ref } from 'vue';

  const key = 'updatable';
  function openNotification() {
    notification.open({
      key,
      message: 'Notification Title',
      description: 'description.',
    });
    setTimeout(() => {
      notification.open({
        key,
        message: 'New Title',
        description: 'New description.',
      });
    }, 1000);
  }
  const message = ref<any>('Notification Title');
  const description = ref<any>('description');
  function openNotification2() {
    // content must use function
    notification.open({
      message: () => message.value,
      description: () => description.value,
    });
    setTimeout(() => {
      message.value = 'New Title';
      description.value = 'New description.';
    }, 1000);
  }
</script>

<template>
  <a-button type="primary" @click="openNotification">
    Open the notification box (update by key)
  </a-button>
  <br />
  <br />
  <a-button type="primary" @click="openNotification2">
    Open the notification box (update by reactive)
  </a-button>
</template>
