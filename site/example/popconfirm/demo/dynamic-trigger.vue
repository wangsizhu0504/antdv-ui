<docs>
---
order: 4
title:
  zh-CN: 条件触发
  en-US: Conditional trigger
---

## zh-CN

可以判断是否需要弹出。

## en-US

Make it pop up under some conditions.

</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui';
  import { ref } from 'vue';

  const visible = ref<boolean>(false);
  const condition = ref<boolean>(true);

  function confirm() {
    visible.value = false;
    message.success('Next step.');
  }

  function cancel() {
    visible.value = false;
    message.error('Click on cancel.');
  }

  function handleVisibleChange(bool: boolean) {
    if (!bool) {
      visible.value = false;
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(condition.value);
    if (condition.value) {
      confirm(); // next step
    } else {
      visible.value = true;
    }
  }
</script>

<template>
  <div>
    <a-popconfirm
      title="Are you sure delete this task?"
      :open="visible"
      ok-text="Yes"
      cancel-text="No"
      @open-change="handleVisibleChange"
      @confirm="confirm"
      @cancel="cancel"
    >
      <a href="#">Delete a task</a>
    </a-popconfirm>
    <br />
    <br />
    Whether directly execute：
    <a-checkbox v-model:checked="condition" />
  </div>
</template>
