<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import Overlay from './overlay.vue';
  import Router from './router.vue';
  import SeparatorIndepent from './separator-indepent.vue';
  import Separator from './separator.vue';
  import WithIcon from './withIcon.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Overlay,
      Router,
      Separator,
      SeparatorIndepent,
      WithIcon,
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Overlay />
    <Router />
    <Separator />
    <SeparatorIndepent />
    <WithIcon />
  </demo-sort>
</template>
