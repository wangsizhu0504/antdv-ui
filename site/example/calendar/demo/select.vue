<docs>
---
order: 3
title:
  zh-CN: 选择功能
  en-US: Selectable Calendar
---

## zh-CN

一个通用的日历面板，支持年/月切换。

## en-US

A basic calendar component with Year/Month switch.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { Dayjs } from 'dayjs'
  import dayjs from 'dayjs'

  const date = ref<any>(dayjs('2017-01-25'))
  const selectedValue = ref<any>(dayjs('2017-01-25'))

  function onSelect(value: Dayjs) {
    date.value = value
    selectedValue.value = value
  }
  function onPanelChange(value: Dayjs) {
    date.value = value
  }
</script>

<template>
  <a-alert :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />
  <a-calendar :value="date" @select="onSelect" @panel-change="onPanelChange" />
</template>
