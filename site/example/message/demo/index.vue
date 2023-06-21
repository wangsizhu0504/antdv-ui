<template>
  <demo-sort>
    <Hook />
    <info />
    <duration />
    <other />
    <loading />
    <thenable />
    <update />
    <customStyleVue />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Info from './info.vue'
import Other from './other.vue'
import Duration from './duration.vue'
import Loading from './loading.vue'
import Thenable from './thenable.vue'
import Update from './update.vue'
import customStyleVue from './custom-style.vue'
import Hook from './hook.vue'

export default defineComponent({
  CN,
  US,
  components: {
    Info,
    Other,
    Duration,
    Loading,
    Thenable,
    Update,
    CustomStyleVue: customStyleVue,
    Hook,
  },
  setup() {
    return {}
  },
})
</script>
