<script lang="ts">
  import { defineComponent } from 'vue'
  import CN from '../index.zh-CN.md'
  import US from '../index.en-US.md'
  import Basic from './basic.vue'
  import Extra from './extra.vue'
  import Placement from './placement.vue'
  import UserProfile from './user-profile.vue'
  import MultiLevelDrawer from './multi-level-drawer.vue'
  import FormInDrawer from './form-in-drawer.vue'
  import RenderInCurrent from './render-in-current.vue'
  import Size from './size.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Extra,
      Placement,
      UserProfile,
      MultiLevelDrawer,
      FormInDrawer,
      RenderInCurrent,
      Size,
    },
    setup() {
      return {}
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <Extra />
    <Placement />
    <RenderInCurrent />
    <FormInDrawer />
    <MultiLevelDrawer />
    <UserProfile />
    <Size />
  </demo-sort>
</template>
