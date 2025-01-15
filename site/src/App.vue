<script lang="ts">
  import type { Ref } from 'vue'
  import { enUS, zhCN } from '@antdv/locale'
  import { theme as antdTheme } from '@antdv/ui'
  import dayjs from 'dayjs'
  import { computed, defineComponent, provide, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import useMediaQuery from './hooks/useMediaQuery'
  import SiteToken from './SiteToken.vue'
  import { GLOBAL_CONFIG } from './SymbolKey'
  import 'dayjs/locale/zh-cn'

  function isZhCN(name: string) {
    return /-cn\/?$/.test(name)
  }
  export interface GlobalConfig {
    isMobile: Ref<boolean>
    lang: Ref<'zh-CN' | 'en-US'>
    isZhCN: Ref<boolean>
    responsive: Ref<null | 'narrow' | 'crowded'>
    blocked: Ref<boolean>
  }
  export type ThemeName = '' | 'light' | 'dark' | 'compact'
  function getAlgorithm(themes: ThemeName[] = []) {
    return themes
      .filter(theme => !!theme)
      .map((theme) => {
        if (theme === 'dark')
          return antdTheme.darkAlgorithm

        if (theme === 'compact')
          return antdTheme.compactAlgorithm

        return antdTheme.defaultAlgorithm
      })
  }

  export default defineComponent({
    components: {
      SiteToken,
    },
    setup() {
      const route = useRoute()
      const i18n = useI18n()
      const colSize = useMediaQuery()
      const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs')
      const theme = ref<ThemeName>((localStorage.getItem('theme') as ThemeName) || 'light')
      const compactTheme = ref<ThemeName>((localStorage.getItem('compactTheme') as ThemeName) || '')
      const themeConfig = computed(() => {
        const themeConf = { algorithm: getAlgorithm([...new Set([theme.value, compactTheme.value])]) }
        console.log('themeConf', themeConf)
        return themeConf
      })
      const hashPriority = ref<any>('low' as const)
      watch(hashPriority, () => {
        location.reload()
      })
      // useSiteToken();
      const responsive = computed(() => {
        if (colSize.value === 'xs')
          return 'crowded'
        else if (colSize.value === 'sm')
          return 'narrow'

        return null
      })
      const globalConfig: GlobalConfig = {
        isMobile,
        responsive,
        lang: computed<any>(() => i18n.locale.value),
        isZhCN: computed(() => i18n.locale.value === 'zh-CN'),
        blocked: ref<any>(false),
      }
      const changeTheme = (t: ThemeName) => {
        theme.value = t
        localStorage.setItem('theme', t)
      }

      const changeCompactTheme = (t: ThemeName) => {
        compactTheme.value = t
        localStorage.setItem('compactTheme', t)
      }

      provide('themeMode', {
        theme,
        compactTheme,
        changeTheme,
        changeCompactTheme,
      })
      provide(GLOBAL_CONFIG, globalConfig)
      watch(
        () => route.path,
        (val) => {
          i18n.locale.value = isZhCN(val) ? 'zh-CN' : 'en-US'
        },
        { immediate: true },
      )
      watch(
        globalConfig.isZhCN,
        (val) => {
          if (val)
            dayjs.locale(zhCN.locale)
          else
            dayjs.locale(enUS.locale)
        },
        { immediate: true },
      )
      const locale = computed(() => {
        return globalConfig.isZhCN.value ? zhCN : enUS
      })
      setTimeout(() => {
        const div = document.createElement('div')
        div.className = 'adsbox'
        document.body.appendChild(div)
        globalConfig.blocked.value = getComputedStyle(div).display === 'none'
      }, 300)
      watch(
        theme,
        () => {
          if (theme.value === 'dark') {
            document.getElementsByTagName('html')[0].setAttribute('data-doc-theme', 'dark')
            document.getElementsByTagName('body')[0].setAttribute('data-theme', 'dark')
            document.getElementsByTagName('html')[0].style.colorScheme = 'dark'
          } else {
            document.getElementsByTagName('html')[0].setAttribute('data-doc-theme', 'light')
            document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light')
            document.getElementsByTagName('html')[0].style.colorScheme = 'light'
          }
        },
        { immediate: true },
      )
      return { globalConfig, locale, themeConfig, hashPriority }
    },
  })
</script>

<template>
  <a-style-provider :hash-priority="hashPriority">
    <a-config-provider :locale="locale" :theme="themeConfig">
      <SiteToken>
        <router-view />
      </SiteToken>
    </a-config-provider>
  </a-style-provider>
</template>
