<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Editor from './editor.vue'
  import List from './list.vue'
  import Nested from './nested.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      List,
      Nested,
      Editor,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <List />
    <Nested />
    <Editor />
  </demo-sort>
</template>
