<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import FlexAlign from './flex-align.vue';
  import FlexOrder from './flex-order.vue';
  import FlexStretch from './flex-stretch.vue';
  import Flex from './flex.vue';
  import Gutter from './gutter.vue';
  import Offset from './offset.vue';
  import Playfround from './playfround.vue';
  import ResponsiveMore from './responsive-more.vue';
  import Responsive from './responsive.vue';
  import Sort from './sort.vue';
  import UseBreakpoint from './use-breakpoint.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      FlexAlign,
      FlexOrder,
      FlexStretch,
      Flex,
      Gutter,
      Offset,
      ResponsiveMore,
      Responsive,
      Sort,
      Playfround,
      UseBreakpoint,
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Gutter />
    <Offset />
    <Sort />
    <Flex />
    <FlexAlign />
    <FlexOrder />
    <FlexStretch />
    <Responsive />
    <ResponsiveMore />
    <Playfround />
    <UseBreakpoint />
  </demo-sort>
</template>
