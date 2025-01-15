<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import CustomizeStyle from './customize-style.vue';
  import Horizontal from './horizontal.vue';
  import Vertical from './vertical.vue';
  import WithText from './with-text.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Horizontal,
      WithText,
      Vertical,
      CustomizeStyle,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Horizontal />
    <WithText />
    <Vertical />
    <CustomizeStyle />
  </demo-sort>
</template>
