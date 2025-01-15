<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Avatar from './avatar.vue'
  import Basic from './basic.vue'
  import customRenderVue from './custom-render.vue'
  import customizeProgressBarVue from './customize-progress-bar.vue'
  import DefaultFileList from './defaultFileList.vue'
  import Directory from './directory.vue'
  import Drag from './drag.vue'
  import FileList from './fileList.vue'
  import maxCountVue from './max-count.vue'
  import PictureCard from './picture-card.vue'
  import PictureStyle from './picture-style.vue'
  import PreviewFile from './preview-file.vue'
  import TransformFile from './transform-file.vue'
  import uploadCustomActionIconVue from './upload-custom-action-icon.vue'
  import UploadManually from './upload-manually.vue'
  import uploadPngOnlyVue from './upload-png-only.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Avatar,
      DefaultFileList,
      PictureCard,
      FileList,
      Drag,
      PictureStyle,
      UploadManually,
      Directory,
      PreviewFile,
      TransformFile,
      CustomizeProgressBarVue: customizeProgressBarVue,
      MaxCountVue: maxCountVue,
      UploadCustomActionIconVue: uploadCustomActionIconVue,
      UploadPngOnlyVue: uploadPngOnlyVue,
      CustomRenderVue: customRenderVue,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Avatar />
    <DefaultFileList />
    <PictureCard />
    <FileList />
    <Drag />
    <PictureStyle />
    <UploadManually />
    <Directory />
    <PreviewFile />
    <TransformFile />
    <CustomizeProgressBarVue />
    <MaxCountVue />
    <UploadCustomActionIconVue />
    <UploadPngOnlyVue />
    <CustomRenderVue />
  </demo-sort>
</template>
