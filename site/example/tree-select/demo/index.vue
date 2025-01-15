<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Async from './async.vue';
  import Basic from './basic.vue';

  // import TreeData from './treeData.vue';
  import Checkable from './checkable.vue';

  import customTagRenderVue from './custom-tag-render.vue';
  import Highlight from './highlight.vue';
  import Multiple from './multiple.vue';
  import placementVue from './placement.vue';
  import replaceFieldsVue from './replaceFields.vue';
  import statusVue from './status.vue';
  import Suffix from './suffix.vue';
  import treeLineVue from './tree-line.vue';
  import virtualScrollVue from './virtual-scroll.vue';

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
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Multiple />
    <!-- <tree-data /> -->
    <Checkable />
    <Suffix />
    <Async />
    <Highlight />
    <TreeLineVue />
    <VirtualScrollVue />
    <CustomTagRenderVue />
    <ReplaceFieldsVue />
    <PlacementVue />
    <StatusVue />
  </demo-sort>
</template>
