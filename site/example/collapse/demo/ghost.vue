<docs>
---
order: 6
title:
  zh-CN: 幽灵折叠面板
  en-US: Ghost Collapse
---

## zh-CN

将折叠面板的背景变成透明。

## en-US

Making collapse's background to transparent.

</docs>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
  const activeKey = ref<any>(['1'])

  watch(activeKey, (val) => {
    console.log(val)
  })
</script>

<template>
  <a-collapse v-model:active-key="activeKey" ghost>
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3" collapsible="disabled">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
