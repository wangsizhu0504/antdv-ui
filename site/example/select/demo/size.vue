<docs>
---
order: 1
title:
  zh-CN: 三种大小
  en-US: Sizes
---

## zh-CN

三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。

## en-US

The height of the input field for the select defaults to 32px. If size is set to large, the height will be 40px, and if set to small, 24px.

</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui';
  import { ref } from 'vue';

  function popupScroll() {
    console.log('popupScroll');
  }
  const size = ref<SelectProps['size']>('middle');
  const value1 = ref<any>('a1');
  const value2 = ref<any>(['a1', 'b2']);
  const value3 = ref<any>(['a1', 'b2']);
  const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));
</script>

<template>
  <a-radio-group v-model:value="size">
    <a-radio-button value="large">Large</a-radio-button>
    <a-radio-button value="middle">Middle</a-radio-button>
    <a-radio-button value="small">Small</a-radio-button>
  </a-radio-group>
  <br />
  <br />
  <a-space direction="vertical">
    <a-select
      v-model:value="value1"
      :size="size"
      style="width: 200px"
      :options="options"
    />
    <a-select
      v-model:value="value2"
      :options="options"
      mode="multiple"
      :size="size"
      placeholder="Please select"
      style="width: 200px"
      @popup-scroll="popupScroll"
    />
    <a-select
      v-model:value="value3"
      :options="options"
      mode="tags"
      :size="size"
      placeholder="Please select"
      style="width: 200px"
    />
  </a-space>
</template>
