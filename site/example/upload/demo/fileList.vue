<docs>
---
order: 4
title:
  zh-CN: 完全控制的上传列表
  en-US: Complete control over file list
---

## zh-CN

使用 `fileList` 对列表进行完全控制，可以实现各种自定义功能，以下演示二种情况：

1. 上传列表数量的限制。

2. 读取远程路径并显示链接。

## en-US

You can gain full control over filelist by configuring `fileList`. You can accomplish all kinds of customed functions. The following shows two circumstances:

1. limit the number of uploaded files.

2. read from response and show file link.
</docs>

<script lang="ts" setup>
  import type { UploadChangeParam, UploadProps } from '@antdv/ui';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const fileList = ref<UploadProps['fileList']>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);
  function handleChange(info: UploadChangeParam) {
    let resFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    resFileList = resFileList.slice(-2);

    // 2. read from response and show file link
    resFileList = resFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    fileList.value = resFileList;
  }
</script>

<template>
  <a-upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :multiple="true"
    :file-list="fileList"
    @change="handleChange"
  >
    <a-button>
      <UploadOutlined/>
      Upload
    </a-button>
  </a-upload>
</template>
