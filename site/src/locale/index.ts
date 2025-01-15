import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { computed } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { isZhCN } from '../utils/util'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'

// eslint-disable-next-line import/no-mutable-exports
let i18n: ReturnType<typeof createI18n>

/**
 * @description: 传入localMap，根据当前的语言类型输入i18nmessage,只是中英两种
 * @param {object} localeMap  {en:{xxx:xxx},cn:{xxx:xxx} }
 * @return {object} [i18nMessage, localeType]
 */
export function useLocale(localeMap: Record<string, any> = {}) {
  const { locale } = useI18n()

  const localeType = computed(() => (locale.value === 'zh-CN' ? 'cn' : 'en'))

  const i18nMessage = computed(() => (localeMap && localeMap[localeType.value]) || {})

  return [i18nMessage, localeType]
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  i18n = createI18n({
    legacy: false,
    locale: isZhCN(location.pathname) ? 'zh-CN' : 'en-US',
    fallbackLocale: 'en-US',
    messages: {
      'zh-CN': zhCN,
      'en-US': enUS,
    },
  }) as unknown as I18n
  // @ts-expect-error
  app.config.globalProperties.$i18n = i18n

  app.use(i18n)
}

export { i18n }
