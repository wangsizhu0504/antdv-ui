<script lang="ts">
  import { defineComponent } from 'vue';
  import IconDisplay from '../../../src/theme/template/IconDisplay';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import Custom from './custom.vue';
  import Iconfont from './iconfont.vue';
  import Twotone from './two-tone.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      IconDisplay,
      Basic,
      Custom,
      Iconfont,
      Twotone,
    },
  });
</script>

<template>
  <IconDisplay />
  <demo-sort>
    <Basic />
    <Twotone />
    <Custom />
    <Iconfont />
  </demo-sort>
</template>
