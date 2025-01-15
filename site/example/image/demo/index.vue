<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import ControlledPreview from './controlled-preview.vue';
  import Fallback from './fallback.vue';
  import Placeholder from './placeholder.vue';
  import previewGroupVisibleVue from './preview-group-visible.vue';
  import PreviewGroup from './preview-group.vue';
  import previewSrc from './preview-src.vue';

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
  });
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
