<template>
  <demo-sort>
    <basic />
    <multiple />
    <!-- <tree-data /> -->
    <checkable />
    <suffix />
    <async />
    <Highlight />
    <treeLineVue />
    <virtualScrollVue />
    <customTagRenderVue />
    <replaceFieldsVue />
    <placementVue />
    <statusVue />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CN from '../index.zh-CN.md'
import US from '../index.en-US.md'
import Basic from './basic.vue'
import Multiple from './multiple.vue'

// import TreeData from './treeData.vue';
import Checkable from './checkable.vue'
import Suffix from './suffix.vue'
import Async from './async.vue'
import Highlight from './highlight.vue'
import treeLineVue from './tree-line.vue'
import virtualScrollVue from './virtual-scroll.vue'
import customTagRenderVue from './custom-tag-render.vue'
import replaceFieldsVue from './replaceFields.vue'
import placementVue from './placement.vue'
import statusVue from './status.vue'

export default defineComponent({
  CN,
  US,
  components: {
    PlacementVue: placementVue,
    StatusVue: statusVue,
    Basic,
    Multiple,
    // TreeData,
    Checkable,
    Suffix,
    Async,
    Highlight,
    TreeLineVue: treeLineVue,
    VirtualScrollVue: virtualScrollVue,
    CustomTagRenderVue: customTagRenderVue,
    ReplaceFieldsVue: replaceFieldsVue,
  },
  setup() {
    return {}
  },
})
</script>
