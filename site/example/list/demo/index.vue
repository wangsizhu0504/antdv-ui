<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Simple from './simple.vue'
  import Loadmore from './loadmore.vue'
  import Vertical from './vertical.vue'
  import Grid from './grid.vue'
  import Resposive from './resposive.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Simple,
      Loadmore,
      Vertical,
      Grid,
      Resposive,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <Basic />
  <Simple />
  <Loadmore />
  <Vertical />
  <Grid />
  <Resposive />
</template>
