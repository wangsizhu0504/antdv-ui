<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import DynamicTrigger from './dynamic-trigger.vue';
  import Icon from './icon.vue';
  import Local from './local.vue';
  import Placement from './placement.vue';
  import promiseVue from './promise.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      PromiseVue: promiseVue,
      Basic,
      Local,
      Icon,
      Placement,
      DynamicTrigger,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Local />
    <Icon />
    <Placement />
    <DynamicTrigger />
    <PromiseVue />
  </demo-sort>
</template>
