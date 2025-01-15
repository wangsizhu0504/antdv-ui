<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Custom from './custom.vue'
  import WatermarkImage from './image.vue'
  import MultiLine from './multi-line.vue'

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
