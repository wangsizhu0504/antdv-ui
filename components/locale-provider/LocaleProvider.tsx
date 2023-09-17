import { defineComponent, provide, reactive, watch } from 'vue'
import { changeConfirmLocale } from '../modal/locale'
import warning from '../_util/warning'
import { ANT_MARK } from '../constant'
import { localeProviderProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ALocaleProvider',
  props: localeProviderProps(),
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
