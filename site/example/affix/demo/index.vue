<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import OnChange from './on-change.vue';
  import Traget from './target.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      OnChange,
      Traget,
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <OnChange />
    <Traget />
  </demo-sort>
</template>
