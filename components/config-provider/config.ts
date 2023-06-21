import { reactive } from 'vue'
import { defaultIconPrefixCls } from './context'
import type { ConfigProviderProps } from './context'

export const defaultPrefixCls = 'ant'

export const globalConfigForApi: ConfigProviderProps & {
  getRootPrefixCls?: (rootPrefixCls?: string, customizePrefixCls?: string) => string
} = reactive({})

export function getGlobalIconPrefixCls() {
  return globalConfigForApi.iconPrefixCls || defaultIconPrefixCls
}

export function getGlobalPrefixCls() {
  return globalConfigForApi.prefixCls || defaultPrefixCls
}
export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls()
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: () => {
    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls)
      return globalConfigForApi.prefixCls

    // Fallback to default prefixCls
    return getGlobalPrefixCls()
  },
})
