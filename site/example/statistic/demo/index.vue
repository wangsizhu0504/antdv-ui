<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Card from './card.vue'
  import Countdown from './countdown.vue'
  import CountdownSlot from './countdown-slot.vue'
  import Unit from './unit.vue'

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

<template>
  <demo-sort>
    <Basic />
    <Unit />
    <Card />
    <Countdown />
    <CountdownSlot />
  </demo-sort>
</template>
