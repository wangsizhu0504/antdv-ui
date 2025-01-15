<script lang="ts">
  import { defineComponent } from 'vue';
  import US from '../index.en-US.md';
  import CN from '../index.zh-CN.md';
  import Basic from './basic.vue';

  // import Ellipsis from './ellipsis.vue';
  // import Interactive from './interactive.vue';
  // import Suffix from './suffix.vue';
  // import Text from './text.vue';
  // import Titlt from './title.vue';

  export default defineComponent({
    CN,
    US,
    components: {
      Basic,
    // Ellipsis,
    // Interactive,
    // Text,
    // Suffix,
    // Titlt,
    },
    setup() {
      return {};
    },
  });
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
  </demo-sort>
</template>
