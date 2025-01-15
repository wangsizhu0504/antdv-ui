<script lang="ts" setup>
  import { getLocalizedPathname, isLocalStorageNameSupported, isZhCN } from '@/utils/util'
  import Github from './Github.vue'
  import Navigation from './Navigation.vue'

  defineOptions({
    name: 'HeaderMenu',
  })
  function onLangChange() {
    const {
      location: { pathname },
    } = window
    const currentProtocol = `${window.location.protocol}//`
    const currentHref = window.location.href.substr(currentProtocol.length)

    if (isLocalStorageNameSupported())
      localStorage.setItem('locale', isZhCN(pathname) ? 'en-US' : 'zh-CN')

    window.location.href = currentProtocol + currentHref.replace(window.location.pathname, getLocalizedPathname(pathname, !isZhCN(pathname)).path)
  }
</script>

<template>
  <Navigation @lang-change="onLangChange" />
  <a-button
    key="lang-button"
    size="small"
    class="header-button header-lang-button"
    @click="onLangChange"
  >
    {{ $t('app.header.lang') }}
  </a-button>
  <Github />
</template>
