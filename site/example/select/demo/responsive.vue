<docs>
---
order: 24
title:
  zh-CN: 最多显示多少个选项及选项最大长度
  en-US: set maxTagCount or maxTagTextLength
---

## zh-CN

设置一个数字，超过后自动折叠。

maxTagCount 也可以设置成响应式，但响应式对性能有所消耗，不推荐在大表单场景下使用。

## en-US

Set a number and automatically fold after exceeding.

`maxTagCount` can also be set to responsive, but responsive consumes performance and is not recommended for use in large-form scenarios.
</docs>

<script lang="ts" setup>
  import type { SelectProps } from '@antdv/ui';
  import { ref } from 'vue';

  const options = ref<SelectProps['options']>([]);

  for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.value.push({
      label: `Long Label: ${value}`,
      value,
    });
  }
  const maxTagCount = ref<any>(2);
  const maxTagTextLength = ref<any>(10);
  const value = ref<any>(['a10', 'c12', 'h17', 'j19', 'k20']);
</script>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-space>
      <a-button type="primary" @click="maxTagCount++">maxTagCount++</a-button>
      <a-button type="primary" @click="maxTagCount--">maxTagCount--</a-button>
    </a-space>

    <h2>maxTagCount: {{ maxTagCount }}</h2>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Select Item..."
      :max-tag-count="maxTagCount"
      :options="options"
    >
      <template #maxTagPlaceholder="omittedValues">
        <span style="color: red">+ {{ omittedValues.length }} ...</span>
      </template>
    </a-select>
    <h2>maxTagCount: responsive</h2>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Select Item..."
      max-tag-count="responsive"
      :options="options"
    />
    <a-space>
      <a-button type="primary" @click="maxTagTextLength++">maxTagTextLength++</a-button>
      <a-button type="primary" @click="maxTagTextLength--">maxTagTextLength--</a-button>
    </a-space>
    <h2>maxTagTextLength: {{ maxTagTextLength }}</h2>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Select Item..."
      :max-tag-text-length="maxTagTextLength"
      :options="options"
    />
  </a-space>
</template>
