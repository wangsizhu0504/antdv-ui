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

<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
      <a-button>
        <upload-outlined />
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

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from '@antdv/ui'
import type { UploadProps } from '@antdv/ui'

const fileList = ref<UploadProps['fileList']>([])
const uploading = ref<boolean>(false)

const handleRemove: UploadProps['onRemove'] = (file) => {
  const index = fileList.value.indexOf(file)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...fileList.value, file]
  return false
}

const handleUpload = () => {
  const formData = new FormData()
  fileList.value.forEach((file: UploadProps['fileList'][number]) => {
    formData.append('files[]', file as any)
  })
  uploading.value = true
  setTimeout(() => {
    fileList.value = []
    uploading.value = false
    message.success('upload successfully.')
  }, 1000)
}
</script>
