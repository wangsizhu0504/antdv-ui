<docs>
---
order: 2
title:
  zh-CN: 额外操作
  en-US: Extra Actions
---

## zh-CN

在 Ant Design 规范中，操作按钮建议放在抽屉的右上角，可以使用 extra 属性来实现。

## en-US

Extra actions should be placed at corner of drawer in Ant Design, you can using `extra` prop for that.

</docs>

<script lang="ts" setup>
  import type { DrawerProps } from '@antdv/ui';
  import { ref } from 'vue';

  const placement = ref<DrawerProps['placement']>('left');
  const open = ref<boolean>(false);

  function showDrawer() {
    open.value = true;
  }

  function onClose() {
    open.value = false;
  }
</script>

<template>
  <a-radio-group v-model:value="placement" style="margin-right: 8px">
    <a-radio value="top">top</a-radio>
    <a-radio value="right">right</a-radio>
    <a-radio value="bottom">bottom</a-radio>
    <a-radio value="left">left</a-radio>
  </a-radio-group>
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <a-drawer :width="500" title="Basic Drawer" :placement="placement" :open="open" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
