<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Accordion from './accordion.vue';
  import Basic from './basic.vue';
  import ContextMenu from './context-menu.vue';
  import CustomIcon from './customized-icon.vue';
  import Directory from './directory.vue';
  import Draggable from './draggable.vue';
  import Dynamic from './dynamic.vue';
  import Line from './line.vue';
  import ReplaceFields from './replaceFields.vue';
  import Search from './search.vue';
  import SwitcherIcon from './switcher-icon.vue';
  import VirtualScroll from './virtual-scroll.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Draggable,
      Dynamic,
      Search,
      ShowLine: Line,
      CustomIcon,
      Directory,
      SwitcherIcon,
      ReplaceFields,
      ContextMenu,
      VirtualScroll,
      Accordion,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Draggable />
    <Dynamic />
    <CustomIcon />
    <Search />
    <ShowLine />
    <Directory />
    <SwitcherIcon />
    <ReplaceFields />
    <ContextMenu />
    <VirtualScroll />
    <Accordion />
  </demo-sort>
</template>
