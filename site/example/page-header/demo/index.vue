<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Actions from './actions.vue'
  import Basic from './basic.vue'
  import Breadcrumb from './breadcrumb.vue'
  import Context from './content.vue'
  import Ghost from './ghost.vue'
  import Responsive from './responsive.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Breadcrumb,
      Actions,
      Context,
      Responsive,
      Ghost,
    },
  })
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Breadcrumb />
    <Actions />
    <Context />
    <Responsive />
    <Ghost />
  </demo-sort>
</template>
