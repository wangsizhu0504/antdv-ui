<docs>
---
order: 0
title:
  zh-CN: 自定义上传列表
  en-US: Custom Render
---

## zh-CN

使用 `itemRender` 插槽进行完全自定义列表

## en-US

Custom render by using `itemRender` slot.
</docs>

<script lang="ts" setup>
  import type { UploadChangeParam, UploadProps } from '@antdv/ui';
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

  const fileList = ref<UploadProps['fileList']>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ]);
  const headers = { authorization: 'authorization-text' };
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
    <template #itemRender="{ file, actions }">
      <a-space>
        <span :style="file.status === 'error' ? 'color: red' : ''">{{ file.name }}</span>
        <a href="javascript:;" @click="actions.download">download</a>
        <a href="javascript:;" @click="actions.remove">delete</a>
      </a-space>
    </template>
  </a-upload>
</template>
