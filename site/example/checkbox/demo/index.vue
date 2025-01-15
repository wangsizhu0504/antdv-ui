<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import CheckAll from './check-all.vue';
  import Controller from './controller.vue';
  import Disabled from './disabled.vue';
  import Group from './group.vue';
  import Layout from './layout.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      CheckAll,
      Controller,
      Disabled,
      Group,
      Layout,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <CheckAll />
    <Controller />
    <Disabled />
    <Group />
    <Layout />
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
