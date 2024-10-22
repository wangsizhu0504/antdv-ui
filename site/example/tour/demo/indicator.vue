<docs>
---
order: 4
title:
  zh-CN: 自定义指示器
  en-US: custom indicator
---

## zh-CN

自定义指示器。

## en-US

Custom indicator.

</docs>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { EllipsisOutlined } from '@ant-design/icons-vue'
  import type { TourProps } from '@antdv/ui'

  const open = ref<boolean>(false)

  const ref1 = ref<any>(null)
  const ref2 = ref<any>(null)
  const ref3 = ref<any>(null)

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.value && ref1.value.$el,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.value && ref2.value.$el,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.value && ref3.value.$el,
    },
  ]

  function handleOpen(val: boolean): void {
    open.value = val
  }
</script>

<template>
  <a-button type="primary" @click="handleOpen(true)">Begin Tour</a-button>

  <a-divider />

  <a-space>
    <a-button ref="ref1">Upload</a-button>
    <a-button ref="ref2" type="primary">Save</a-button>
    <a-button ref="ref3"><EllipsisOutlined /></a-button>
  </a-space>

  <a-tour :open="open" :steps="steps" @close="handleOpen(false)">
    <template #indicatorsRender="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
  </a-tour>
</template>
