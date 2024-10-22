<script setup lang="ts">
  import { App } from '@antdv/ui'

  const { message, modal, notification } = App.useApp()

  function showMessage() {
    message.success('Success!')
  }

  function showModal() {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    })
  }

  function showNotification() {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design Vue!!',
      placement: 'topLeft',
    })
  }
</script>

<template>
  <a-space>
    <a-button type="primary" @click="showMessage">Open message</a-button>
    <a-button type="primary" @click="showModal">Open modal</a-button>
    <a-button type="primary" @click="showNotification">Open notification</a-button>
  </a-space>
</template>
