import type { LocaleReceiverContext } from './interface'
import { enUS as defaultLocaleData } from '@antdv/locale'
import { computed, defineComponent, inject } from 'vue'
import { localReceiverProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LocaleReceiver',
  props: localReceiverProps(),
  setup(props, { slots }) {
    const localeData = inject<LocaleReceiverContext>('localeData', {})
    const getLocale = computed(() => {
      const { componentName = 'global', defaultLocale } = props
      const locale = defaultLocale || defaultLocaleData[componentName || 'global']
      const { antLocale } = localeData

      const localeFromContext = (componentName && antLocale) ? antLocale[componentName] : {}
      return {
        ...(typeof locale === 'function' ? locale() : locale),
        ...(localeFromContext || {}),
      }
    })
    const getLocaleCode = computed(() => {
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
      return children?.(getLocale.value, getLocaleCode.value, antLocale)
    }
  },
})
