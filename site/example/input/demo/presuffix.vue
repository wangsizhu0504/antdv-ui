<docs>
---
order: 2
title:
  zh-CN: 前缀和后缀
  en-US: prefix and suffix
---

## zh-CN

在输入框上添加前缀或后缀图标。

## en-US

Add prefix or suffix icons inside input.

</docs>

<script lang="ts" setup>
  import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const userName = ref<string>('');
</script>

<template>
  <div class="components-input-demo-presuffix">
    <a-input v-model:value="userName" placeholder="Basic usage">
      <template #prefix>
        <UserOutlined />
      </template>
      <template #suffix>
        <a-tooltip title="Extra information">
          <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
    <br />
    <br />
    <a-input prefix="￥" suffix="RMB" />
  </div>
</template>
