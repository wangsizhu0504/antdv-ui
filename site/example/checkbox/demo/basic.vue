<docs>
---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

简单的 checkbox

## en-US

Basic usage of checkbox

</docs>

<script lang="ts" setup>
  import { ref } from 'vue';

  const checked = ref<any>(false);
</script>

<template>
  <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
</template>
