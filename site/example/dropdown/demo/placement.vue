<docs>
---
order: 1
title:
  zh-CN: 弹出位置
  en-US: Placement
---

## zh-CN

支持 6 个弹出位置。

## en-US

Support 6 placements.

</docs>

<script lang="ts" setup>
  import type { DropdownProps } from '@antdv/ui';

  const placements = [
    'bottomLeft',
    'bottom',
    'bottomRight',
    'topLeft',
    'top',
    'topRight',
  ] as Array<DropdownProps['placement']>;
</script>

<template>
  <div id="site-example-dropdown-demo-placement">
    <template v-for="(placement, index) in placements" :key="placement">
      <a-dropdown :placement="placement">
        <a-button>{{ placement }}</a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
              </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
              </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <br v-if="index === 2" />
    </template>
  </div>
</template>

<style scoped>
#components-dropdown-demo-placement .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
