<script setup lang="ts">
  import HeaderCom from './header/index.vue';

  defineOptions({
    name: 'BaseLayout',
  });
  defineProps<{
    name: string
  }>();
</script>

<template>
  <div>
    <HeaderCom />
    <div style="padding: 20px; margin: 0 auto; width: 960px">
      <slot />
    </div>
  </div>
</template>
