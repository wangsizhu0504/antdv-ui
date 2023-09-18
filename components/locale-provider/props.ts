import type { ExtractPropTypes, PropType, VNodeTypes } from 'vue'
import type { LocaleComponentName } from './types'
import type { Locale } from '../locale'

export const localReceiverProps = () => ({
  componentName: String as PropType<LocaleComponentName>,
  defaultLocale: {
    type: [Object, Function],
  },
  children: {
    type: Function as PropType<
      (locale: any, localeCode?: string, fullLocale?: object) => VNodeTypes
    >,
  },
})
export const localeProviderProps = () => ({
  locale: {
    type: Object as PropType<Locale>,
  },
  ANT_MARK__: String,
})

export type LocaleProviderProps = Partial<ExtractPropTypes<ReturnType<typeof localeProviderProps>>>

export type LocalReceiverProps = Partial<ExtractPropTypes<ReturnType<typeof localReceiverProps>>>
