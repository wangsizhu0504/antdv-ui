<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Avatar from './avatar.vue'
  import DefaultFileList from './defaultFileList.vue'
  import PictureCard from './picture-card.vue'
  import FileList from './fileList.vue'
  import Drag from './drag.vue'
  import PictureStyle from './picture-style.vue'
  import UploadManually from './upload-manually.vue'
  import Directory from './directory.vue'
  import PreviewFile from './preview-file.vue'
  import TransformFile from './transform-file.vue'
  import customizeProgressBarVue from './customize-progress-bar.vue'
  import maxCountVue from './max-count.vue'
  import uploadCustomActionIconVue from './upload-custom-action-icon.vue'
  import uploadPngOnlyVue from './upload-png-only.vue'
  import customRenderVue from './custom-render.vue'

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
