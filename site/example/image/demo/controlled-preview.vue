<docs>
---
order: 4
title:
  zh-CN: 受控的预览
  en-US: Controlled Preview
---

## zh-CN

可以使预览受控。

## en-US

You can make preview controlled.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const visible = ref<boolean>(false);
  function setVisible(value): void {
    visible.value = value;
  }
</script>

<template>
  <div>
    <a-button type="primary" @click="() => setVisible(true)">show image preview</a-button>
    <a-image
      :width="200"
      :style="{ display: 'none' }"
      :preview="{
        visible,
        onVisibleChange: setVisible,
      }"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  </div>
</template>
