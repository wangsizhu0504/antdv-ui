<template>
  <demo-sort>
    <basic />
    <list />
    <nested />
    <editor />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import List from './list.vue'
import Nested from './nested.vue'
import Editor from './editor.vue'

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
