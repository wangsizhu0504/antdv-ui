<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Options from './options.vue'
  import Custom from './custom.vue'
  import NonCaseSensitive from './non-case-sensitive.vue'
  import CertainCategory from './certain-category.vue'
  import UncertainCategory from './uncertain-category.vue'
  import statusVue from './status.vue'
  import BorderLess from './border-less.vue'
  import AllowClear from './allow-clear.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      StatusVue: statusVue,
      Basic,
      Options,
      Custom,
      NonCaseSensitive,
      CertainCategory,
      UncertainCategory,
      BorderLess,
      AllowClear,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Options />
    <Custom />
    <NonCaseSensitive />
    <CertainCategory />
    <UncertainCategory />
    <StatusVue />
    <BorderLess />
    <AllowClear />
  </demo-sort>
</template>
