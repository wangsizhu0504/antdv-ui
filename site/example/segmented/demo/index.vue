<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Block from './block.vue'
  import Custom from './custom.vue'
  import Disabled from './disabled.vue'
  import Dynamic from './dynamic.vue'
  import Size from './size.vue'

  export default defineComponent({
    components: { Size, Dynamic, Custom, Disabled, Block, Basic },
    category: 'Components',
    subtitle: '分段控制器',
    type: 'Data Display',
    title: 'Segmented',
    CN,
    US,
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Block />
    <Disabled />
    <Custom />
    <Dynamic />
    <Size />
  </demo-sort>
</template>
