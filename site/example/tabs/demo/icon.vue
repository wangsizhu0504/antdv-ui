<docs>
---
order: 2
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN

有图标的标签。

## en-US

The Tab with Icon.

</docs>

<script lang="ts" setup>
  import { AndroidOutlined, AppleOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'

  const activeKey = ref<any>('1')
</script>

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1">
      <template #tab>
        <span>
          <AppleOutlined />
          Tab 1
        </span>
      </template>
      Tab 1
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #tab>
        <span>
          <AndroidOutlined />
          Tab 2
        </span>
      </template>
      Tab 2
    </a-tab-pane>
  </a-tabs>
</template>
