<docs>
---
order: 10
title:
  zh-CN: 受控面板
  en-US: Controlled Panels
---

## zh-CN

通过组合 `mode` 与 `onPanelChange` 控制要展示的面板。

## en-US

Determing which panel to show with `mode` and `onPanelChange`.

</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs';
  import { ref } from 'vue';

  const mode1 = ref<any>('time');
  const mode2 = ref<any>(['month', 'month']);
  const value = ref<[Dayjs, Dayjs]>();

  function handleOpenChange1(open: boolean) {
    if (open) {
      mode1.value = 'time';
    }
  }

  function handleChange(val: [Dayjs, Dayjs]) {
    value.value = val;
  }

  function handlePanelChange1(_val: [Dayjs, Dayjs], mode: any) {
    mode1.value = mode;
  }

  function handlePanelChange2(val: [Dayjs, Dayjs], mode: any[]) {
    value.value = val;
    mode2.value = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]];
  }
</script>

<template>
  <a-space direction="vertical" :size="12">
    <a-date-picker
      :mode="mode1"
      show-time
      @open-change="handleOpenChange1"
      @panel-change="handlePanelChange1"
    />
    <a-range-picker
      :placeholder="['Start month', 'End month']"
      format="YYYY-MM"
      :value="value"
      :mode="mode2"
      @panel-change="handlePanelChange2"
      @change="handleChange"
    />
  </a-space>
</template>
