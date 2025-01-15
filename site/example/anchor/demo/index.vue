<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import CustomizeHighlight from './customizeHighlight.vue'
  import Horizontal from './horizontal.vue'
  import OnChange from './onChange.vue'
  import OnClick from './onClick.vue'
  import Static from './static.vue'
  import TargetOffset from './targetOffset.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Static,
      OnClick,
      CustomizeHighlight,
      TargetOffset,
      Horizontal,
      OnChange,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Horizontal />
    <Static />
    <OnClick />
    <CustomizeHighlight />
    <TargetOffset />
    <OnChange />
  </demo-sort>
</template>
