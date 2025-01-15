<docs>
---
order: 0
title:
  zh-CN: 点击上传
  en-US: Upload by clicking
---

## zh-CN

经典款式，用户点击按钮弹出文件选择框。

## en-US

Classic mode. File selection dialog pops up when upload button is clicked.
</docs>

<script lang="ts" setup>
  import type { UploadChangeParam } from '@antdv/ui';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { message } from '@antdv/ui';
  import { ref } from 'vue';

  function handleChange(info: UploadChangeParam) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const fileList = ref<any>([]);
  const headers = {
    authorization: 'authorization-text',
  };
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>
      <UploadOutlined/>
      Click to Upload
    </a-button>
  </a-upload>
</template>
