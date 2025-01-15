<docs>
---
order: 2
title:
  zh-CN: 日期时间选择
  en-US: Choose Time
---

## zh-CN

增加选择时间功能，当 `showTime` 为一个对象时，其属性会传递给内建的 `TimePicker`。

## en-US

This property provide an additional time selection. When `showTime` is an Object, its properties will be passed on to built-in `TimePicker`.

</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs';

  function onChange(value: Dayjs, dateString: string) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value: Dayjs) {
    console.log('onOk: ', value);
  }

  function onRangeChange(value: [Dayjs, Dayjs], dateString: [string, string]) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onRangeOk(value: [Dayjs, Dayjs]) {
    console.log('onOk: ', value);
  }
</script>

<template>
  <a-space direction="vertical" :size="12">
    <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk" />
    <a-range-picker
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['Start Time', 'End Time']"
      @change="onRangeChange"
      @ok="onRangeOk"
    />
  </a-space>
</template>
