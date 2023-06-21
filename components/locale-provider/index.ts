import type { App, PropType, VNode } from 'vue'
import { defineComponent, provide, reactive, watch } from 'vue'
import type { Locale } from '../locale'
import { changeConfirmLocale } from '../modal/locale'
import warning from '../_util/warning'
import { withInstall } from '../_util/type'

export interface LocaleProviderProps {
  locale: Locale
  children?: VNode | VNode[]
  ANT_MARK__?: string
}

export const ANT_MARK = 'internalMark'

const LocaleProvider = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ALocaleProvider',
  props: {
    locale: {
      type: Object as PropType<Locale>,
    },
    ANT_MARK__: String,
  },
  setup(props, { slots }) {
    warning(
      props.ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead',
    )
    const state = reactive({
      antLocale: {
        ...props.locale,
        exist: true,
      },
      ANT_MARK__: ANT_MARK,
    })
    provide('localeData', state)
    watch(
      () => props.locale,
      (locale) => {
        changeConfirmLocale(locale && locale.Modal)
        state.antLocale = {
          ...locale,
          exist: true,
        } as any
      },
      { immediate: true },
    )

    return () => {
      return slots.default?.()
    }
  },
})

/* istanbul ignore next */
LocaleProvider.install = function (app: App) {
  app.component(LocaleProvider.name, LocaleProvider)
  return app
}

const locale = withInstall(LocaleProvider)

export default locale
