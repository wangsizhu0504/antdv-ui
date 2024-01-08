import type { VNodeTypes } from 'vue'
import type { Locale } from '@antdv/locale'

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>

export interface LocaleReceiverProps {
  componentName?: string
  defaultLocale?: Locale | Function
  children: (locale: Locale, localeCode?: string, fullLocale?: Locale) => VNodeTypes
}

export interface LocaleReceiverContext {
  antLocale?: Record<string, any>
}
