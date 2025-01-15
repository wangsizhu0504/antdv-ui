<script>
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Async from './async.vue';
  import Basic from './basic.vue';
  import FormMentions from './form.vue';
  import Placement from './placement.vue';
  import Prefix from './prefix.vue';
  import Readonly from './readonly.vue';
  import statusVue from './status.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      StatusVue: statusVue,
      Basic,
      Async,
      Prefix,
      Readonly,
      Placement,
      FormMentions,
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <Async />
    <Prefix />
    <Readonly />
    <Placement />
    <FormMentions />
    <StatusVue />
  </demo-sort>
</template>
