<docs>
---
order: 0
title:
  zh-CN: 不可用
  en-US: Disabled
---

## zh-CN

点击按钮切换可用状态。

## en-US

Click the button to toggle between available and disabled states.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const value = ref<number>(3);
  const disabled = ref<boolean>(true);

  function toggle() {
    disabled.value = !disabled.value;
  }
</script>

<template>
  <div>
    <a-input-number v-model:value="value" :min="1" :max="10" :disabled="disabled" />
    <div style="margin-top: 20px">
      <a-button type="primary" @click="toggle">Toggle disabled</a-button>
    </div>
  </div>
</template>
