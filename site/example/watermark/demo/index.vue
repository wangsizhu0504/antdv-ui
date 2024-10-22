<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import MultiLine from './multi-line.vue'
  import WatermarkImage from './image.vue'
  import Custom from './custom.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      MultiLine,
      WatermarkImage,
      Custom,
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <MultiLine />
    <WatermarkImage />
    <Custom />
  </demo-sort>
</template>
