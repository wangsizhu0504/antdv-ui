<template>
  <demo-sort>
    <basic />
    <local />
    <icon />
    <placement />
    <dynamic-trigger />
    <promiseVue />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import Local from './local.vue'
import Icon from './icon.vue'
import Placement from './placement.vue'
import DynamicTrigger from './dynamic-trigger.vue'
import promiseVue from './promise.vue'

export default defineComponent({
  CN,
  US,
  components: {
    PromiseVue: promiseVue,
    Basic,
    Local,
    Icon,
    Placement,
    DynamicTrigger,
  },
  setup() {
    return {}
  },
})
</script>
