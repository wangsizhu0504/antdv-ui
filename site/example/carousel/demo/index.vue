<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Autoplay from './autoplay.vue';
  import Basic from './basic.vue';
  import CustomArrows from './customArrows.vue';
  import CustomPaging from './customPaging.vue';
  import Fade from './fade.vue';
  import Position from './position.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Fade,
      Autoplay,
      Position,
      CustomPaging,
      CustomArrows,
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Position />
    <Fade />
    <Autoplay />
    <CustomPaging />
    <CustomArrows />
  </demo-sort>
</template>
