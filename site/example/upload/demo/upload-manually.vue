<docs>
---
order: 7
title:
  zh-CN: 手动上传
  en-US: Upload manually
---

## zh-CN

`beforeUpload` 返回 `false` 后，手动上传文件。

## en-US

Upload files manually after `beforeUpload` returns `false`.
</docs>

<script lang="ts" setup>
  import type { UploadProps } from '@antdv/ui';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { message } from '@antdv/ui';
  import request from 'axios';
  import { ref } from 'vue';

  const fileList = ref<UploadProps['fileList']>([]);
  const uploading = ref<boolean>(false);

  const handleRemove: UploadProps['onRemove'] = (file) => {
    const index = fileList.value?.indexOf(file);
    const newFileList = fileList.value?.slice();
    index && newFileList?.splice(index, 1);
    fileList.value = newFileList;
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    fileList.value = [...(fileList.value || []), file];
    return false;
  };

  function handleUpload() {
    const formData = new FormData();
    fileList.value?.forEach((file: UploadProps['fileList'][number]) => {
      formData.append('files[]', file as any);
    });
    uploading.value = true;

    // You can use any AJAX library you like
    request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'post',
      data: formData,
    })
      .then(() => {
        fileList.value = [];
        uploading.value = false;
        message.success('upload successfully.');
      })
      .catch(() => {
        uploading.value = false;
        message.error('upload failed.');
      });
  }
</script>

<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
      <a-button>
        <UploadOutlined/>
        Select File
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
  </div>
</template>
