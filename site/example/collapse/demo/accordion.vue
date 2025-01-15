<docs>
---
order: 1
title:
  zh-CN: 手风琴
  en-US: Accordion
---

## zh-CN

手风琴，每次只打开一个 tab。

## en-US

In accordion mode, only one panel can be expanded at a time.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const activeKey = ref<any>([]);
  const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
</script>

<template>
  <a-collapse v-model:active-key="activeKey" accordion>
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
