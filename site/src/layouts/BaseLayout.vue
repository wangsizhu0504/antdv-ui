<script setup lang="ts">
import HeaderCom from './header/index.vue'

defineProps<{
  name: string
}>()
defineOptions({
  name: 'BaseLayout',
})
</script>

<template>
  <div>
    <HeaderCom />
    <div style="padding: 20px; margin: 0 auto; width: 960px">
      <slot />
    </div>
  </div>
</template>
