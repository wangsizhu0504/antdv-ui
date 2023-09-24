import { computed, inject, unref } from 'vue'
import { enUS as defaultLocaleData } from '../../locale'
import type { LocaleComponentName, LocaleReceiverContext } from './types'
import type { ComputedRef, Ref } from 'vue'
import type { Locale } from '../../locale'

export function useLocaleReceiver<T extends LocaleComponentName>(
  componentName: T,
  defaultLocale?: Locale[T] | Function | ComputedRef<Locale[T] | Function>,
  propsLocale?: Ref<Locale[T]>,
): [ComputedRef<Locale[T]>] {
  const localeData = inject<LocaleReceiverContext>('localeData', {} as LocaleReceiverContext)
  const componentLocale = computed<Locale[T]>(() => {
    const { antLocale } = localeData
    const locale
      = unref(defaultLocale) || defaultLocaleData[componentName || 'global']
    const localeFromContext = (componentName && antLocale) ? antLocale[componentName] : {}

    return {
      ...(typeof locale === 'function' ? (locale as Function)() : locale),
      ...(localeFromContext || {}),
      ...(unref(propsLocale) || {}),
    }
  })
  return [componentLocale]
}
