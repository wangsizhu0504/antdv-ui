<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import CustomIndicator from './custom-indicator.vue'
  import Delay from './delay.vue'
  import Inside from './inside.vue'
  import Nested from './nested.vue'
  import Size from './size.vue'
  import Tip from './tip.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Size,
      Inside,
      Nested,
      Tip,
      Delay,
      CustomIndicator,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Size />
    <Inside />
    <Nested />
    <Tip />
    <Delay />
    <CustomIndicator />
  </demo-sort>
</template>
