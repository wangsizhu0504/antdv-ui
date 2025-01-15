<docs>
---
order: 1
title:
  zh-CN: 附加内容
  en-US: Addon
---

## zh-CN

在 TimePicker 选择框底部显示自定义的内容。

## en-US

Render addon contents to timepicker panel's bottom.

</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs'
  import { ref } from 'vue'

  const open = ref<any>(false)
  const open2 = ref<any>(false)
  const value = ref<Dayjs>()

  function handleOpenChange(openStatus: boolean) {
    console.log('open', openStatus)
    open.value = openStatus
  }

  function handleClose() {
    open.value = false
    open2.value = false
  }
</script>

<template>
  <a-space direction="vertical">
    <a-time-picker v-model:value="value" v-model:open="open" @open-change="handleOpenChange">
      <template #renderExtraFooter="{ prefixCls }">
        <a-button size="small" type="primary" @click="handleClose">OK {{ prefixCls }}</a-button>
      </template>
    </a-time-picker>
    <a-time-picker v-model:value="value" v-model:open="open2">
      <template #renderExtraFooter>
        <a-button size="small" type="primary" @click="handleClose">OK</a-button>
      </template>
    </a-time-picker>
  </a-space>
</template>
