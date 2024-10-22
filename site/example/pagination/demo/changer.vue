<docs>
---
order: 2
title:
  zh-CN: 改变
  en-US: Changer
---

## zh-CN

改变每页显示条目数。

## en-US

Change `pageSize`.
</docs>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const pageSize = ref<any>(20)
  const current1 = ref<any>(3)
  const current2 = ref<any>(4)
  function onShowSizeChange(current: number, pageSize: number) {
    console.log(current, pageSize)
  }
  watch(pageSize, () => {
    console.log('pageSize', pageSize.value)
  })
  watch(current1, () => {
    console.log('current', current1.value)
  })
</script>

<template>
  <div>
    <a-pagination
      v-model:current="current1"
      v-model:pageSize="pageSize"
      show-size-changer
      :total="500"
      @show-size-change="onShowSizeChange"
    />
    <br />
    <a-pagination
      v-model:current="current2"
      show-size-changer
      :total="500"
      disabled
      @show-size-change="onShowSizeChange"
    />
  </div>
</template>
