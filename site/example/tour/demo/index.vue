<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Indicator from './indicator.vue'
  import Mask from './mask.vue'
  import NonModal from './non-modal.vue'
  import Placement from './placement.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      NonModal,
      Placement,
      Mask,
      Indicator,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <NonModal />
    <Placement />
    <Mask />
    <Indicator />
  </demo-sort>
</template>
