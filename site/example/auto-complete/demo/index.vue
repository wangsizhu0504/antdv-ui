<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import AllowClear from './allow-clear.vue';
  import Basic from './basic.vue';
  import BorderLess from './border-less.vue';
  import CertainCategory from './certain-category.vue';
  import Custom from './custom.vue';
  import NonCaseSensitive from './non-case-sensitive.vue';
  import Options from './options.vue';
  import statusVue from './status.vue';
  import UncertainCategory from './uncertain-category.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      StatusVue: statusVue,
      Basic,
      Options,
      Custom,
      NonCaseSensitive,
      CertainCategory,
      UncertainCategory,
      BorderLess,
      AllowClear,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Options />
    <Custom />
    <NonCaseSensitive />
    <CertainCategory />
    <UncertainCategory />
    <StatusVue />
    <BorderLess />
    <AllowClear />
  </demo-sort>
</template>
