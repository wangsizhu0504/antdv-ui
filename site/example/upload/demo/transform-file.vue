<docs>
---
order: 10
title:
  zh-CN: 上传前转换文件
  en-US: Transform file before request
---

## zh-CN

使用 `beforeUpload` 转换上传的文件（例如添加水印）。

## en-US

Use `beforeUpload` for transform file before request such as add a watermark.
</docs>

<script lang="ts" setup>
  import type { UploadProps } from '@antdv/ui';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img: HTMLImageElement = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText('Ant Design Vue', 20, 20);
          canvas.toBlob(resolve);
        };
      };
    });
  };

  const fileList = ref<UploadProps['fileList']>([]);
</script>

<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :before-upload="beforeUpload"
    >
      <a-button>
        <UploadOutlined />
        Upload
      </a-button>
    </a-upload>
  </div>
</template>
