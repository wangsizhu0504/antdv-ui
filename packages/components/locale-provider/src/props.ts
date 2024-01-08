import type { ExtractPropTypes, PropType, VNodeTypes } from 'vue'
import type { Locale } from '@antdv/locale'
import type { LocaleComponentName } from './types'

export function localReceiverProps() {
  return {
    componentName: String as PropType<LocaleComponentName>,
    defaultLocale: {
      type: [Object, Function],
    },
    children: {
      type: Function as PropType<
      (locale: any, localeCode?: string, fullLocale?: object) => VNodeTypes
    >,
    },
  }
}
export function localeProviderProps() {
  return {
    locale: {
      type: Object as PropType<Locale>,
    },
    ANT_MARK__: String,
  }
}

export type LocaleProviderProps = Partial<ExtractPropTypes<ReturnType<typeof localeProviderProps>>>

export type LocalReceiverProps = Partial<ExtractPropTypes<ReturnType<typeof localReceiverProps>>>
