<docs>
---
order: 5
title:
  zh-CN: 多层抽屉
  en-US: Multi-level drawer
---

## zh-CN

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

## en-US

Open a new drawer on top of an existing drawer to handle multi branch tasks.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const open = ref<boolean>(false);

  const childrenDrawer = ref<boolean>(false);

  function showDrawer() {
    open.value = true;
  }
  function onClose() {
    open.value = false;
  }
  function showChildrenDrawer() {
    childrenDrawer.value = true;
  }
</script>

<template>
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <a-drawer
    v-model:open="open"
    title="Multi-level drawer"
    width="520"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-button type="primary" @click="showChildrenDrawer">Two-level drawer</a-button>
    <a-drawer v-model:open="childrenDrawer" title="Two-level Drawer" width="320" :closable="false">
      <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>
    </a-drawer>

    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
  </a-drawer>
</template>
