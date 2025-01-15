<docs>
---
order: 3
title:
  zh-CN: 滑动
  en-US: Slide
---

## zh-CN

可以左右、上下滑动，容纳更多标签。

## en-US

In order to fit in more tabs, they can slide left and right (or up and down).

</docs>

<script lang="ts" setup>
  import type { TabsProps } from '@antdv/ui'
  import { ref } from 'vue'

  const mode = ref<TabsProps['tabPosition']>('top')
  const activeKey = ref<any>(1)
  const callback: TabsProps['onTabScroll'] = (val) => {
    console.log(val)
  }
</script>

<template>
  <div>
    <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group>
    <a-tabs
      v-model:active-key="activeKey"
      :tab-position="mode"
      :style="{ height: '200px' }"
      @tab-scroll="callback"
    >
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane>
    </a-tabs>
  </div>
</template>
