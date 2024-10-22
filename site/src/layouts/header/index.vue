<script lang="ts" setup>
  import { computed, inject, reactive, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { UnorderedListOutlined } from '@ant-design/icons-vue'
  import { version } from '@antdv/ui'
  import Logo from './Logo.vue'
  import Menu from './Menu.vue'
  import SearchBox from './SearchBox.vue'
  import { GLOBAL_CONFIG } from '@/SymbolKey'
  import type { GlobalConfig } from '@/types'

  const route = useRoute()
  const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG)
  const isHome = computed(() => {
    return ['', 'index', 'index-cn'].includes(route.path)
  })
  const isZhCN = computed(() => globalConfig?.isZhCN.value)
  const isMobile = computed(() => globalConfig?.isMobile.value)
  const responsive = computed(() => globalConfig?.responsive.value)

  const menuVisible = ref<any>(false)
  const colProps = isHome.value
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
      {
        xxxl: 5,
        xxl: 5,
        xl: 6,
        lg: 7,
        md: 7,
        sm: 24,
        xs: 24,
      },
      {
        xxxl: 19,
        xxl: 19,
        xl: 18,
        lg: 17,
        md: 17,
        sm: 0,
        xs: 0,
      },
    ]

  const searching = ref<any>(false)
  const headerClassName = reactive({
    'clearfix': true,
    'home-header': isHome.value,
  })
  function onTriggerSearching(value: boolean) {
    searching.value = value
  }
  const visibleAdblockBanner = ref<any>(false)
  watch(() => globalConfig?.blocked, (val) => {
    visibleAdblockBanner.value = val?.value || false
  })
  const visibleAlertBanner = ref<any>(!localStorage.getItem('surelyform_v2'))
  watch(visibleAlertBanner, () => {
    if (!visibleAlertBanner.value)
      localStorage.setItem('surelyform_v2', version)
  })
</script>

<template>
  <header id="header" :class="headerClassName">
    <a-popover
      v-model:open="menuVisible"
      overlay-class-name="popover-menu"
      placement="bottomRight"
      trigger="click"
      arrow-point-at-center
    >
      <UnorderedListOutlined class="nav-phone-icon" />
      <template #content>
        <Menu />
      </template>
    </a-popover>
    <a-row :style="{ flexFlow: 'nowrap', height: 64 }">
      <a-col v-bind="colProps[0]">
        <Logo />
      </a-col>
      <a-col v-bind="colProps[1]" class="menu-row">
        <SearchBox key="search" :is-zh-c-n="isZhCN" :responsive="responsive" @trigger-focus="onTriggerSearching" />
        <Menu v-if="!isMobile!" />
      </a-col>
    </a-row>
  </header>
</template>

<style lang="less" src="./index.less">
</style>
