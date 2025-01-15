<docs>
---
order: 8
title:
  zh-CN: 平滑地卸载
  en-US: Smoothly Unmount
---

## zh-CN

平滑、自然的卸载提示。

## en-US

Smoothly and unaffectedly unmount Alert.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const visible = ref<boolean>(true);
  function handleClose() {
    visible.value = false;
  }
</script>

<template>
  <a-alert
    v-if="visible"
    message="Alert Message Text"
    type="success"
    closable
    :after-close="handleClose"
  />
</template>
