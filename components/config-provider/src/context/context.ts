import { computed, inject, provide } from 'vue'
import { GlobalFormContextKey, configProviderKey, defaultIconPrefixCls } from '../../../constant'
import type { ConfigProviderInnerProps, GlobalFormCOntextProps } from '../types'

export const useProvideGlobalForm = (state: GlobalFormCOntextProps) => {
  provide(GlobalFormContextKey, state)
}

export const useInjectGlobalForm = () => {
  return inject(GlobalFormContextKey, { validateMessages: computed(() => undefined) })
}

export const defaultConfigProvider: ConfigProviderInnerProps = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `ant-${suffixCls}` : 'ant'
  },
  iconPrefixCls: computed(() => defaultIconPrefixCls),
  getPopupContainer: computed(() => () => document.body),
  direction: computed(() => 'ltr'),
}

export const useConfigContextInject = () => {
  return inject(configProviderKey, defaultConfigProvider)
}

export const useConfigContextProvider = (props: ConfigProviderInnerProps) => {
  return provide(configProviderKey, props)
}
