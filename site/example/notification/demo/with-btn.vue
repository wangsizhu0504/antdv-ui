<docs>
---
order: 4
title:
  zh-CN: 自定义按钮
  en-US: Custom close button
---

## zh-CN

自定义关闭按钮的样式和文字。

## en-US

To customize the style or font of the close button.

</docs>

<script lang="ts" setup>
  import { Button, notification } from '@antdv/ui'
  import { h } from 'vue'

  function close() {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    )
  }
  function openNotification() {
    const key = `open${Date.now()}`
    notification.open({
      message: 'Notification Title',
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn: () =>
        h(
          Button,
          {
            type: 'primary',
            size: 'small',
            onClick: () => notification.close(key),
          },
          { default: () => 'Confirm' },
        ),
      key,
      onClose: close,
    })
  }
</script>

<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>
