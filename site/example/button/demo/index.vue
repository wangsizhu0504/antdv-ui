<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import Block from './block.vue';
  import Danger from './danger.vue';
  import Disabled from './disabled.vue';
  import Ghost from './ghost.vue';
  import Icon from './icon.vue';
  import Loading from './loading.vue';
  import Multiple from './multiple.vue';
  import Size from './size.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      Disabled,
      Ghost,
      Icon,
      Loading,
      Multiple,
      Size,
      Block,
      Danger,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Disabled />
    <Ghost />
    <Icon />
    <Loading />
    <Multiple />
    <Size />
    <Block />
    <Danger />
  </demo-sort>
</template>

<style scoped>
[id^='site-example-button-demo-'] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
[id^='site-example-button-demo-'] .ant-btn-rtl {
  margin-right: 0;
  margin-left: 8px;
}
[id^='site-example-button-demo-'] .ant-btn-group > .ant-btn,
[id^='site-example-button-demo-'] .ant-btn-group > span > .ant-btn {
  margin-right: 0;
}
[data-theme='dark'] .site-button-ghost-wrapper {
  background: rgba(255, 255, 255, 0.2);
}
</style>
