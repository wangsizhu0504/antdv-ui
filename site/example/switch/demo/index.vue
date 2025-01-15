<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Disabled from './disabled.vue'
  import Loading from './loading.vue'
  import Size from './size.vue'
  import Text from './text.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Disabled,
      TextAndIcon: Text, // text 无法识别
      Size,
      Loading,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Disabled />
    <TextAndIcon />
    <Size />
    <Loading />
  </demo-sort>
</template>
