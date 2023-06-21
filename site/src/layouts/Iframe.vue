<script lang="ts" setup>
import { provide } from 'vue'

defineOptions({
  name: 'IframeLayout',
})
provide('inIframe', true)
</script>

<template>
  <router-view />
</template>
