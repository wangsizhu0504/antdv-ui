<docs>
---
order: 5
title:
  zh-CN: 自定义样式
  en-US: Customized style
---

## zh-CN

使用 `style` 和 `class` 来定义样式。

## en-US

The `style` and `class` are available to customize Notification.

</docs>

<script>
  import { notification } from '@antdv/ui';
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      const openNotification = () => {
        notification.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          style: {
            width: '600px',
            marginLeft: `${335 - 600}px`,
          },
          class: 'notification-custom-class',
        });
      };
      return {
        openNotification,
      };
    },
  });
</script>

<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<style scoped>
.notification-custom-class {
  color: red;
}
</style>
