<docs>
---
order: 3
title:
  zh-CN: 步骤切换
  en-US: Switch Step
---

## zh-CN

通常配合内容及按钮使用，表示一个流程的处理进度。

## en-US

Cooperate with the content and buttons, to represent the progress of a process.
</docs>

<script lang="ts" setup>
  import { message } from '@antdv/ui';
  import { ref } from 'vue';

  const current = ref<number>(0);
  function next() {
    current.value++;
  }
  function prev() {
    current.value--;
  }
  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];
  const items = steps.map(item => ({ key: item.title, title: item.title }));
</script>

<template>
  <div>
    <a-steps :current="current" :items="items"/>
    <div class="steps-content">
      {{ steps[current].content }}
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div>
  </div>
</template>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
