<docs>
---
order: 2
title:
  zh-CN: 使用 iconfont.cn
  en-US: Use iconfont.cn
---

## zh-CN

对于使用 [iconfont.cn](http://iconfont.cn/) 的用户，通过设置 `createFromIconfontCN` 方法参数对象中的 `scriptUrl` 字段， 即可轻松地使用已有项目中的图标。

## en-US

If you are using [iconfont.cn](http://iconfont.cn/), you can use the icons in your project gracefully.

</docs>

<script lang="ts" setup>
  import { createFromIconfontCN } from '@ant-design/icons-vue';

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });
</script>

<template>
  <a-space>
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
  </a-space>
</template>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}
</style>
