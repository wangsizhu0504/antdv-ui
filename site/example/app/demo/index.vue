<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
  </demo-sort>
</template>
