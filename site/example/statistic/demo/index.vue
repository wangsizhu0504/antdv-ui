<template>
  <demo-sort>
    <basic />
    <unit />
    <card />
    <countdown />
    <countdown-slot />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import Unit from './unit.vue'
import Card from './card.vue'
import Countdown from './countdown.vue'
import CountdownSlot from './countdown-slot.vue'

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Unit,
    Card,
    Countdown,
    CountdownSlot,
  },
  setup() {
    return {}
  },
})
</script>
