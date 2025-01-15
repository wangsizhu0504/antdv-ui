<script>
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Direction from './direction.vue';
  import Locale from './locale.vue';
  import Size from './size.vue';
  import Theme from './theme.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Locale,
      Size,
      Theme,
      Direction,
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Locale />
    <Size />
    <Direction />
    <Theme />
  </demo-sort>
</template>
