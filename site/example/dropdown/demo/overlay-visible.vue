<docs>
---
order: 7
title:
  zh-CN: 菜单隐藏方式
  en-US: The way of hiding menu.
---

## zh-CN

默认是点击关闭菜单，可以关闭此功能。

## en-US

The default is to close the menu when you click on menu items, this feature can be turned off.

</docs>

<script lang="ts" setup>
  import type { MenuProps } from '@antdv/ui';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const visible = ref<any>(false);
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      visible.value = false;
    }
  };
</script>

<template>
  <a-dropdown v-model:open="visible">
    <a class="ant-dropdown-link" @click.prevent>
      Hover me
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="1">Clicking me will not close the menu.</a-menu-item>
        <a-menu-item key="2">Clicking me will not close the menu also.</a-menu-item>
        <a-menu-item key="3">Clicking me will close the menu</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
