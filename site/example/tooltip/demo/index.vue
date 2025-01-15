<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import arrowPointAtCenter from './arrow-point-at-center.vue';
  import AutoAdjustOverflow from './auto-adjust-overflow.vue';
  import Basic from './basic.vue';
  import Color from './color.vue';
  import Placement from './placement.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Placement,
      ArrowPointAtCenter: arrowPointAtCenter,
      AutoAdjustOverflow,
      Color,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Placement />
    <ArrowPointAtCenter />
    <AutoAdjustOverflow />
    <Color />
  </demo-sort>
</template>
