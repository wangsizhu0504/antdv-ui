<docs>
---
order: 8
debugger: true
title:
  zh-CN: 受控组件
  en-US: Under Control
---

## zh-CN

value 和 onChange 需要配合使用。也可以直接使用v-model。

## en-US

`value` and `@change` should be used together or use v-model.

</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs';
  import dayjs from 'dayjs';
  import { ref } from 'vue';

  const value = ref<Dayjs>();

  function onChange(time: Dayjs) {
    console.log(time);
    value.value = time;
  }

  const value2 = ref<any>(dayjs());
</script>

<template>
  <a-space direction="vertical">
    <p>use value and @change</p>
    <a-time-picker :value="value" @change="onChange" />
    <p>v-model</p>
    <a-time-picker v-model:value="value" />
    <p>Do not change</p>
    <a-time-picker :value="value2" />
  </a-space>
</template>
