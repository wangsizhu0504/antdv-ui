<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Complex from './complex.vue'
  import Active from './active.vue'
  import Children from './children.vue'
  import List from './list.vue'
  import elementVue from './element.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Complex,
      Active,
      List,
      Children,
      ElementVue: elementVue,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <Basic />
  <Complex />
  <Active />
  <Children />
  <List />
  <ElementVue />
</template>
