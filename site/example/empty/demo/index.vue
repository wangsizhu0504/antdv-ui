<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import ConfigProvider from './config-provider.vue'
  import Customize from './customize.vue'
  import Description from './description.vue'
  import Simple from './simple.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Simple,
      Customize,
      ConfigProvider,
      Description,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Simple />
    <Customize />
    <ConfigProvider />
    <Description />
  </demo-sort>
</template>
