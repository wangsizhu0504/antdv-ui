<docs>
---
order: 2
title:
  zh-CN: 按钮尺寸
  en-US: Size
---

## zh-CN

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

## en-US

Ant Design supports a default button size as well as a large and small size.

If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.
</docs>

<script lang="ts" setup>
  import type { SizeType } from '@antdv/ui';
  import { DownloadOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const size = ref<SizeType>('large');
</script>

<template>
  <a-space direction="vertical">
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">
        Large
      </a-radio-button>
      <a-radio-button value="default">
        Default
      </a-radio-button>
      <a-radio-button value="small">
        Small
      </a-radio-button>
    </a-radio-group>
    <a-space>
      <a-button type="primary" :size="size">
        Primary
      </a-button>
      <a-button :size="size">
        Normal
      </a-button>
      <a-button type="dashed" :size="size">
        Dashed
      </a-button>
      <a-button danger :size="size">
        Danger
      </a-button>
      <a-button type="link" :size="size">
        Link
      </a-button>
    </a-space>
    <a-space>
      <a-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" shape="circle" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>
      <a-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>
    </a-space>
  </a-space>
</template>
