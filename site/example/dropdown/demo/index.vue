<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import ContextMenu from './context-menu.vue'
  import DropdownButton from './dropdown-button.vue'
  import Event from './event.vue'
  import Item from './item.vue'
  import OverlayVisible from './overlay-visible.vue'
  import Placement from './placement.vue'
  import SubMenu from './sub-menu.vue'
  import Trigger from './trigger.vue'
  import loadingVue from './loading.vue'
  import arrowVue from './arrow.vue'
  import arrowCenterVue from './arrow-center.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      ArrowCenterVue: arrowCenterVue,
      ArrowVue: arrowVue,
      LoadingVue: loadingVue,
      Basic,
      ContextMenu,
      DropdownButton,
      Event,
      Item,
      OverlayVisible,
      Placement,
      SubMenu,
      Trigger,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <ContextMenu />
    <DropdownButton />
    <Event />
    <Item />
    <OverlayVisible />
    <Placement />
    <ArrowVue />
    <ArrowCenterVue/>
    <SubMenu />
    <Trigger />
    <LoadingVue />
  </demo-sort>
</template>
