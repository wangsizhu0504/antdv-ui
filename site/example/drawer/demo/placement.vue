<docs>
---
order: 1
title:
  zh-CN: 自定义位置
  en-US: Custom Placement
---

## zh-CN

自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭

## en-US

The Drawer can appear from any edge of the screen.

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
  <a-drawer
    title="Basic Drawer"
    :placement="placement"
    :closable="false"
    :open="open"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
