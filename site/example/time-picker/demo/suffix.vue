<docs>
---
order: 7
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

## en-US

Click `TimePicker`, and then we could select or input a time in panel.

</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs';
  import { SmileOutlined } from '@ant-design/icons-vue';
  import dayjs from 'dayjs';
  import { ref } from 'vue';

  const value = ref<Dayjs>();
</script>

<template>
  <a-time-picker v-model:value="value" :default-value="dayjs('00:00:00', 'HH:mm:ss')">
    <template #suffixIcon><SmileOutlined /></template>
  </a-time-picker>
</template>
