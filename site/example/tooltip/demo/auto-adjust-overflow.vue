<docs>
---
order: 3
title:
  zh-CN: 自动调整位置
  en-US: Adjust placement automatically
---

## zh-CN

气泡框不可见时自动调整位置。

## en-US

Adjust popup placement automatically when popup is invisible.

</docs>

<script lang="ts" setup>
  const wrapStyles: Record<string, string> = {
    overflow: 'hidden',
    position: 'relative',
    padding: '24px',
    border: '1px solid #e9e9e9',
  };
  function getPopupContainer(trigger: HTMLElement) {
    return trigger.parentElement;
  }
</script>

<template>
  <div :style="wrapStyles">
    <a-tooltip placement="left" title="Prompt Text" :get-popup-container="getPopupContainer">
      <a-button>Adjust automatically / 自动调整</a-button>
    </a-tooltip>
    <br />
    <a-tooltip
      placement="left"
      title="Prompt Text"
      :get-popup-container="getPopupContainer"
      :auto-adjust-overflow="false"
    >
      <a-button style="margin-top: 10px">Ingore / 不处理</a-button>
    </a-tooltip>
  </div>
</template>
