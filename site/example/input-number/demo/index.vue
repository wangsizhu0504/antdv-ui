<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import addonVue from './addon.vue';
  import Basic from './basic.vue';
  import borderlessVue from './borderless.vue';
  import Digit from './digit.vue';
  import Disabled from './disabled.vue';
  import Formatter from './formatter.vue';
  import iconVue from './icon.vue';
  import keyboardVue from './keyboard.vue';
  import outOfRangeVue from './out-of-range.vue';
  import prefixVue from './prefix.vue';
  import Size from './size.vue';
  import statusVue from './status.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      IconVue: iconVue,
      StatusVue: statusVue,
      PrefixVue: prefixVue,
      Basic,
      Disabled,
      Digit,
      Formatter,
      Size,
      AddonVue: addonVue,
      BorderlessVue: borderlessVue,
      KeyboardVue: keyboardVue,
      OutOfRangeVue: outOfRangeVue,
    },
  });
</script>

<template>
  <demo-sort>
    <Basic />
    <AddonVue />
    <Size />
    <Disabled />
    <Digit />
    <Formatter />
    <KeyboardVue />
    <OutOfRangeVue />
    <BorderlessVue />
    <PrefixVue />
    <StatusVue />
    <IconVue />
  </demo-sort>
</template>
