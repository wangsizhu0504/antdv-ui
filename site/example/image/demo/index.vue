<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Fallback from './fallback.vue'
  import Placeholder from './placeholder.vue'
  import previewSrc from './preview-src.vue'
  import PreviewGroup from './preview-group.vue'
  import ControlledPreview from './controlled-preview.vue'
  import previewGroupVisibleVue from './preview-group-visible.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Fallback,
      PreviewSrc: previewSrc,
      Placeholder,
      PreviewGroup,
      ControlledPreview,
      PreviewGroupVisibleVue: previewGroupVisibleVue,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Fallback />
    <Placeholder />
    <PreviewGroup />
    <PreviewGroupVisibleVue />
    <PreviewSrc />
    <ControlledPreview />
  </demo-sort>
</template>

<style></style>
