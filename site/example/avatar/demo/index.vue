<template>
  <demo-sort>
    <basic />
    <type />
    <dynamic />
    <badge />
    <group />
    <responsive />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import Type from './type.vue'
import Dynamic from './dynamic.vue'
import Badge from './badge.vue'
import Group from './group.vue'
import Responsive from './responsive.vue'

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Type,
    Dynamic,
    Badge,
    Group,
    Responsive,
  },
  setup() {
    return {}
  },
})
</script>

<style>
[id^='components-avatar-demo-'] .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
</style>
