<docs>
---
order: 3
title:
  zh-CN: 自定义图标
  en-US: Customized Icon
---

## zh-CN

图标可以被自定义。

## en-US

The icon can be customized to any vue node or (h) => vue node.

</docs>

<script lang="ts" setup>
  import { SmileOutlined } from '@ant-design/icons-vue'
  import { notification } from '@antdv/ui'
  import { h } from 'vue'

  function openNotification() {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
    })
  }
</script>

<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>
