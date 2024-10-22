<docs>
---
order: 1
title:
  zh-CN: 带有图标的
  en-US: With an Icon
---

## zh-CN

图标放在文字前面。

## en-US

The icon should be placed in front of the text.

</docs>

<script lang="ts" setup>
  import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item href="">
      <HomeOutlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item href="">
      <UserOutlined />
      <span>Application List</span>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
