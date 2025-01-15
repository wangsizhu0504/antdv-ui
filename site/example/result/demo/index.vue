<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Denied from './403.vue';
  import FindLess from './404.vue';
  import ServerError from './500.vue';
  import CustomIcon from './customIcon.vue';
  import Error from './error.vue';
  import Info from './info.vue';
  import Success from './success.vue';
  import Warning from './warning.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Success,
      Info,
      Warning,
      Denied,
      FindLess,
      ServerError,
      Error,
      CustomIcon,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Success />
    <Info />
    <Warning />
    <Denied />
    <FindLess />
    <ServerError />
    <Error />
    <CustomIcon />
  </demo-sort>
</template>
