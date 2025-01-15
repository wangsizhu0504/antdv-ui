<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Active from './active.vue';
  import Basic from './basic.vue';
  import Children from './children.vue';
  import Complex from './complex.vue';
  import elementVue from './element.vue';
  import List from './list.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Complex,
      Active,
      List,
      Children,
      ElementVue: elementVue,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <Basic />
  <Complex />
  <Active />
  <Children />
  <List />
  <ElementVue />
</template>
