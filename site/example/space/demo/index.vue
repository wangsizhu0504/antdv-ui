<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Align from './align.vue'
  import Base from './base.vue'
  import Compact from './compact.vue'
  import CompactButtonVertical from './compact-button-vertical.vue'
  import CompactButtons from './compact-buttons.vue'
  import Customize from './customize.vue'
  import Size from './size.vue'
  import Split from './split.vue'
  import Vertical from './vertical.vue'
  import Wrap from './wrap.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Base,
      Customize,
      Vertical,
      Align,
      Wrap,
      Split,
      Compact,
      CompactButtons,
      CompactButtonVertical,
      Size,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Base />
    <Customize />
    <Size />
    <Vertical />
    <Align />
    <Wrap />
    <Split />
    <Compact />
    <CompactButtons />
    <CompactButtonVertical />
  </demo-sort>
</template>
