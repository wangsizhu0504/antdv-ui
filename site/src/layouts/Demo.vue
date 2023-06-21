<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  pageData: Record<string, any>
  isZhCN: boolean
}>()
defineOptions({
  name: 'Demo',
})
const route = useRoute()
const frontmatter = computed(() => props?.pageData?.frontmatter || {})
const docHtml = computed(() => {
  return props?.pageData?.html || ''
})
const description = computed(() => {
  return docHtml.value.split('<h2 id="api">API <a class="header-anchor" href="#api">')[0]
})
const api = computed(() => {
  return `
      <h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2>
      ${docHtml.value.split('<h2 id="api">API <a class="header-anchor" href="#api">')[1]}
      `
})
</script>

<template>
  <article>
    <section class="markdown">
      <h1>
        {{ frontmatter.title }}
        <span v-if="isZhCN" class="subtitle">{{ frontmatter.subtitle }}</span>
      </h1>
      <section class="markdown" v-html="description" />
    </section>
    <section class="markdown">
      <h2>{{ $t('app.component.examples') }}</h2>
    </section>
    <slot />
    <section class="markdown api-container" v-html="api" />
  </article>
</template>
