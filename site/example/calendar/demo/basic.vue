<docs>
---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

一个通用的日历面板，支持年/月切换。

## en-US

A basic calendar component with Year/Month switch.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { Dayjs } from 'dayjs'

  const value = ref<Dayjs>()
  function onPanelChange(value: Dayjs, mode: string) {
    console.log(value, mode)
  }
</script>

<template>
  <a-calendar v-model:value="value" @panel-change="onPanelChange" />
</template>
