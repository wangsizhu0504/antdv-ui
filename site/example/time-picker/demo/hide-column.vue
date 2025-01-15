<docs>
---
order: 4
title:
  zh-CN: 选择时分
  en-US: Hour and minute
---

## zh-CN

TimePicker 浮层中的列会随着 `format` 变化，当略去 `format` 中的某部分时，浮层中对应的列也会消失。

## en-US

While part of `format` is omitted, the corresponding column in panel will disappear, too.

</docs>

<script lang="ts" setup>
  import dayjs from 'dayjs'
  import { ref } from 'vue'

  const value = ref<any>(dayjs('12:08', 'HH:mm'))
</script>

<template>
  <a-time-picker v-model:value="value" format="HH:mm" />
</template>
