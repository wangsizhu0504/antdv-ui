<docs>
---
order: 5
title:
  zh-CN: 选择不超过七天的范围
  en-US: Select range dates in 7 days
---

## zh-CN

这里举例如何用 `onCalendarChange` 和 `disabledDate` 来限制动态的日期区间选择。

## en-US

A example shows how to select a dynamic range by using `onCalendarChange` and `disabledDate`.

</docs>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs'
  import { ref } from 'vue'

  type RangeValue = [Dayjs, Dayjs]
  const dates = ref<RangeValue>()
  const value = ref<RangeValue>()
  const hackValue = ref<RangeValue>()

  function disabledDate(current: Dayjs) {
    if (!dates.value || (dates.value as any).length === 0) {
      return false
    }
    const tooLate = dates.value[0] && current.diff(dates.value[0], 'days') > 7
    const tooEarly = dates.value[1] && dates.value[1].diff(current, 'days') > 7
    return tooEarly || tooLate
  }

  function onOpenChange(open: boolean) {
    if (open) {
      dates.value = [] as any
      hackValue.value = [] as any
    } else {
      hackValue.value = undefined
    }
  }

  function onChange(val: RangeValue) {
    value.value = val
  }

  function onCalendarChange(val: RangeValue) {
    dates.value = val
  }
</script>

<template>
  <a-range-picker
    :value="hackValue || value"
    :disabled-date="disabledDate"
    @change="onChange"
    @open-change="onOpenChange"
    @calendar-change="onCalendarChange"
  />
</template>
