<docs>
---
order: 7
title:
  zh-CN: 预设状态的标签
  en-US: Status Tag
---

## zh-CN

预设五种状态颜色，可以通过设置 `color` 为 `success`、 `processing`、`error`、`default`、`warning` 来代表不同的状态。

## en-US

We preset five different colors, you can set color property such as `success`,`processing`,`error`,`default` and `warning` to indicate specific status.

</docs>

<script lang="ts" setup>
  import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
  } from '@ant-design/icons-vue';
</script>

<template>
  <a-divider orientation="left">Without icon</a-divider>
  <div>
    <a-tag color="success">success</a-tag>
    <a-tag color="processing">processing</a-tag>
    <a-tag color="error">error</a-tag>
    <a-tag color="warning">warning</a-tag>
    <a-tag color="default">default</a-tag>
  </div>
  <a-divider orientation="left">With icon</a-divider>
  <div>
    <a-tag color="success">
      <template #icon>
        <CheckCircleOutlined />
      </template>
      success
    </a-tag>
    <a-tag color="processing">
      <template #icon>
        <SyncOutlined :spin="true" />
      </template>
      processing
    </a-tag>
    <a-tag color="error">
      <template #icon>
        <CloseCircleOutlined />
      </template>
      error
    </a-tag>
    <a-tag color="warning">
      <template #icon>
        <ExclamationCircleOutlined />
      </template>
      warning
    </a-tag>
    <a-tag color="default">
      <template #icon>
        <ClockCircleOutlined />
      </template>
      waiting
    </a-tag>
    <a-tag color="default">
      <template #icon>
        <MinusCircleOutlined />
      </template>
      stop
    </a-tag>
  </div>
</template>
