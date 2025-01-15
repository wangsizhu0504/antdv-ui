<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';
  import Changer from './changer.vue';
  import CustomChanger from './custom-changer.vue';
  import ItemRender from './itemRender.vue';
  import Jump from './jump.vue';
  import Mini from './mini.vue';
  import More from './more.vue';
  import Simple from './simple.vue';
  import Total from './total.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
      More,
      Changer,
      CustomChanger,
      Jump,
      Simple,
      Mini,
      Total,
      ItemRender,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <More />
    <Changer />
    <CustomChanger />
    <Jump />
    <Mini />
    <Simple />
    <Total />
    <ItemRender />
  </demo-sort>
</template>
