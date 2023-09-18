import { computed, defineComponent, inject } from 'vue'
import { enUS as defaultLocaleData } from '../locale'
import { localReceiverProps } from './props'
import type { LocaleReceiverContext } from './types'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LocaleReceiver',
  props: localReceiverProps(),
  setup(props, { slots }) {
    const localeData = inject<LocaleReceiverContext>('localeData', {})
    const locale = computed(() => {
      const { componentName = 'global', defaultLocale } = props
      const locale
        = defaultLocale || defaultLocaleData[componentName || 'global']
      const { antLocale } = localeData

      const localeFromContext = (componentName && antLocale) ? antLocale[componentName] : {}
      return {
        ...(typeof locale === 'function' ? locale() : locale),
        ...(localeFromContext || {}),
      }
    })
    const localeCode = computed(() => {
      const { antLocale } = localeData
      const localeCode = antLocale && antLocale.locale
      // Had use LocaleProvide but didn't set locale
      if (antLocale && antLocale.exist && !localeCode)
        return defaultLocaleData.locale

      return localeCode
    })
    return () => {
      const children = props.children || slots.default
      const { antLocale } = localeData
      return children?.(locale.value, localeCode.value, antLocale)
    }
  },
})
