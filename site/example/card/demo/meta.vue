<docs>
---
order: 7
title:
  zh-CN: 支持更多内容配置
  en-US: Support more content configuration
---

## zh-CN

一种支持封面、头像、标题和描述信息的卡片。

## en-US

A Card that supports `cover`, `avatar`, `title` and `description`.

</docs>

<script lang="ts" setup>
  import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-card hoverable style="width: 300px">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <template #actions>
      <SettingOutlined key="setting" />
      <EditOutlined key="edit" />
      <EllipsisOutlined key="ellipsis" />
    </template>
    <a-card-meta title="Card title" description="This is the description">
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
      </template>
    </a-card-meta>
  </a-card>
</template>
