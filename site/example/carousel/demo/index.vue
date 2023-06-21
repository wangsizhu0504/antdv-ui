<template>
  <demo-sort :cols="1">
    <Basic />
    <Position />
    <Fade />
    <Autoplay />
    <CustomPaging />
    <CustomArrows />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import Fade from './fade.vue'
import Autoplay from './autoplay.vue'
import Position from './position.vue'
import CustomPaging from './customPaging.vue'
import CustomArrows from './customArrows.vue'

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Fade,
    Autoplay,
    Position,
    CustomPaging,
    CustomArrows,
  },
})
</script>
