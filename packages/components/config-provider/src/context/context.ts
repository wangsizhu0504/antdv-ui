import type { InjectionKey } from 'vue'
import { computed, inject, provide } from 'vue'
import type { ConfigProviderInnerProps, GlobalFormCOntextProps } from '../types'

export const configProviderKey: InjectionKey<ConfigProviderInnerProps> = Symbol('configProvider')

export const GlobalFormContextKey: InjectionKey<GlobalFormCOntextProps> = Symbol('GlobalFormContextKey')
export const defaultIconPrefixCls = 'anticon'

export function useProvideGlobalForm(state: GlobalFormCOntextProps) {
  provide(GlobalFormContextKey, state)
}

export function useInjectGlobalForm() {
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

export function useConfigContextInject() {
  return inject(configProviderKey, defaultConfigProvider)
}

export function useConfigContextProvider(props: ConfigProviderInnerProps) {
  return provide(configProviderKey, props)
}
