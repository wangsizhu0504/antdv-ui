<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import customStyleVue from './custom-style.vue';
  import Duration from './duration.vue';
  import Hook from './hook.vue';
  import Info from './info.vue';
  import Loading from './loading.vue';
  import Other from './other.vue';
  import Thenable from './thenable.vue';
  import Update from './update.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Info,
      Other,
      Duration,
      Loading,
      Thenable,
      Update,
      CustomStyleVue: customStyleVue,
      Hook,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Hook />
    <Info />
    <Duration />
    <Other />
    <Loading />
    <Thenable />
    <Update />
    <CustomStyleVue />
  </demo-sort>
</template>
