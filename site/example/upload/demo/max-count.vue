<docs>
---
order: 10
title:
  zh-CN: 限制数量
  en-US: Max Count
---

## zh-CN

通过 `maxCount` 限制上传数量。当为 `1` 时，始终用最新上传的代替当前。

## en-US

Limit files with `maxCount`. Will replace current one when `maxCount` is `1`.
</docs>

<script lang="ts" setup>
  import type { UploadProps } from '@antdv/ui';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const fileList = ref<UploadProps['fileList']>([]);
  const fileList2 = ref<UploadProps['fileList']>([]);
</script>

<template>
  <a-space direction="vertical" style="width: 100%" size="large">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture"
      :max-count="1"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <a-button>
        <UploadOutlined/>
        Upload (Max: 1)
      </a-button>
    </a-upload>
    <a-upload
      v-model:file-list="fileList2"
      list-type="picture"
      :max-count="3"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <a-button>
        <UploadOutlined/>
        Upload (Max: 3)
      </a-button>
    </a-upload>
  </a-space>
</template>
