<docs>
---
order: 4
title:
  zh-CN: 加载中状态
  en-US: Loading
---

## zh-CN

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

## en-US

A loading indicator can be added to a button by setting the `loading` property on the `Button`.
</docs>

<script lang="ts" setup>
  import { PoweroffOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'

  interface DelayLoading {
    delay: number;
  }
  const loading = ref<boolean>(false)
  const iconLoading = ref<boolean | DelayLoading>(false)
  function enterIconLoading() {
    iconLoading.value = { delay: 1000 }

    setTimeout(() => {
      iconLoading.value = false
    }, 6000)
  }
</script>

<template>
  <a-space direction="vertical">
    <a-space>
      <a-button type="primary" loading>Loading</a-button>
      <a-button type="primary" size="small" loading>Loading</a-button>
    </a-space>
    <a-space>
      <a-button type="primary" :loading="loading" @mouseenter="loading = true">
        mouseenter me!
      </a-button>
      <a-button type="primary" :loading="iconLoading" @click="enterIconLoading">
        <template #icon><PoweroffOutlined /></template>
        延迟1s
      </a-button>
    </a-space>
    <a-space>
      <a-button type="primary" loading />
      <a-button type="primary" shape="circle" loading />
      <a-button danger shape="round" loading />
    </a-space>
  </a-space>
</template>
