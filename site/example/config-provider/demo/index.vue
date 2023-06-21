<template>
  <demo-sort :cols="1">
    <Locale />
    <Size />
    <Direction />
    <Theme />
  </demo-sort>
</template>

<script>
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Locale from './locale.vue'
import Size from './size.vue'
import Direction from './direction.vue'
import Theme from './theme.vue'

export default defineComponent({
  CN,
  US,
  components: {
    Locale,
    Size,
    Theme,
    Direction,
  },
})
</script>
