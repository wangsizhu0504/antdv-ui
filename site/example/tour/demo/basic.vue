<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic usage
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

</docs>

<script lang="ts" setup>
  import type { TourProps } from '@antdv/ui';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { createVNode, ref } from 'vue';

  const open = ref<boolean>(false);

  const ref1 = ref<any>(null);
  const ref2 = ref<any>(null);
  const ref3 = ref<any>(null);
  const current = ref<any>(0);
  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: createVNode('img', {
        alt: 'tour.png',
        src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png',
      }),
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
  ];

  function handleOpen(val: boolean): void {
    open.value = val;
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

  <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
</template>
