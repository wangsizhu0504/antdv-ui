<script>
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Half from './half.vue'
  import Text from './text.vue'
  import Disabled from './disabled.vue'
  import Clear from './clear.vue'
  import Character from './character.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Half,
      Text,
      Disabled,
      Clear,
      Character,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Half />
    <Text />
    <Disabled />
    <Clear />
    <Character />
  </demo-sort>
</template>
