<docs>
---
order: 6
title:
  zh-CN: Error
  en-US: Error
---

## zh-CN

复杂的错误反馈。

## en-US

Complex error feedback.

</docs>

<script lang="ts" setup>
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <a-result
    status="error"
    title="Submission Failed"
    sub-title="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
      <a-button key="buy">Buy Again</a-button>
    </template>

    <div class="desc">
      <p style="font-size: 16px">
        <strong>The content you submitted has the following error:</strong>
      </p>
      <p>
        <CloseCircleOutlined :style="{ color: 'red' }" />
        Your account has been frozen
        <a>Thaw immediately &gt;</a>
      </p>
      <p>
        <CloseCircleOutlined :style="{ color: 'red' }" />
        Your account is not yet eligible to apply
        <a>Apply Unlock &gt;</a>
      </p>
    </div>
  </a-result>
</template>

<style scoped>
.desc p {
  margin-bottom: 1em;
}
</style>
