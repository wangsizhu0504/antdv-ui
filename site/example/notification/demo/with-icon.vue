<docs>
---
order: 2
title:
  zh-CN: 带有图标的通知提醒框
  en-US: Notification with icon
---

## zh-CN

通知提醒框左侧有图标。

## en-US

A notification box with a icon at the left side.

</docs>

<script lang="ts" setup>
  import { notification } from '@antdv/ui';

  function openNotificationWithIcon(type: string) {
    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }
</script>

<template>
  <div>
    <a-button @click="() => openNotificationWithIcon('success')">Success</a-button>
    <a-button @click="() => openNotificationWithIcon('info')">Info</a-button>
    <a-button @click="() => openNotificationWithIcon('warning')">Warning</a-button>
    <a-button @click="() => openNotificationWithIcon('error')">Error</a-button>
  </div>
</template>
