<docs>
---
order: 15
title:
  zh-CN: 自定义进度条样式
  en-US: Customize Progress Bar
---

## zh-CN

使用 `progress` 属性自定义进度条样式。

## en-US

Use `progress` for customize progress bar.

</docs>

<script lang="ts" setup>
  import type { UploadChangeParam, UploadProps } from '@antdv/ui'
  import { UploadOutlined } from '@ant-design/icons-vue'
  import { message } from '@antdv/ui'
  import { ref } from 'vue'

  function handleChange(info: UploadChangeParam) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const fileList = ref<any>([])
  const progress: UploadProps['progress'] = {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: percent => `${Number.parseFloat(percent.toFixed(2))}%`,
    class: 'test',
  }
  const headers = { authorization: 'authorization-text' }
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    :progress="progress"
    @change="handleChange"
  >
    <a-button>
      <UploadOutlined/>
      Click to Upload
    </a-button>
  </a-upload>
</template>
