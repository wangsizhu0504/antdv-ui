<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Alternate from './alternate.vue'
  import Basic from './basic.vue'
  import Color from './color.vue'
  import Custom from './custom.vue'
  import Pending from './pending.vue'
  import Right from './right.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Color,
      Pending,
      Custom,
      Alternate,
      Right,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Color />
    <Pending />
    <Custom />
    <Alternate />
    <Right />
  </demo-sort>
</template>
