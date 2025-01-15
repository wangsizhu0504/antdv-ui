<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Badge from './badge.vue';
  import Basic from './basic.vue';
  import Dynamic from './dynamic.vue';
  import Group from './group.vue';
  import Responsive from './responsive.vue';
  import Type from './type.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Type,
      Dynamic,
      Badge,
      Group,
      Responsive,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Type />
    <Dynamic />
    <Badge />
    <Group />
    <Responsive />
  </demo-sort>
</template>
