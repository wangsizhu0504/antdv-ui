<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Breadcrumb from './breadcrumb.vue'
  import Actions from './actions.vue'
  import Context from './content.vue'
  import Responsive from './responsive.vue'
  import Ghost from './ghost.vue'

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
