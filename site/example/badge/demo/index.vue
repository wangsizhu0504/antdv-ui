<script lang="ts">
  import { defineComponent } from 'vue'
  import US from '../index.en-US.md'
  import CN from '../index.zh-CN.md'
  import Basic from './basic.vue'
  import Change from './change.vue'
  import Colors from './colors.vue'
  import Dot from './dot.vue'
  import Link from './link.vue'
  import NoWapper from './no-wrapper.vue'
  import Overflow from './overflow.vue'
  import Ribbon from './ribbon.vue'
  import Status from './status.vue'
  import Title from './title.vue'

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      NoWapper,
      Overflow,
      Dot,
      Status,
      Change,
      Title,
      Colors,
      Link,
      Ribbon,
    },
  })
</script>

<template>
  <demo-sort>
    <Basic />
    <NoWapper />
    <Overflow />
    <Dot />
    <Status />
    <Change />
    <Title />
    <Colors />
    <Ribbon />
    <Link />
  </demo-sort>
</template>

<style>
[id^='site-example-badge-demo-'] .ant-badge:not(.ant-badge-not-a-wrapper) {
  margin-right: 20px;
}
[id^='site-example-badge-demo-'] .head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
  vertical-align: middle;
}
[id^='site-example-badge-demo-'] .ant-badge-not-a-wrapper:not(.ant-badge-status) {
  margin-right: 8px;
}
</style>
