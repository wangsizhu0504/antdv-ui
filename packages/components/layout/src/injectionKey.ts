import type { InjectionKey } from 'vue'
import type { SiderCollapsed, SiderHookProvider } from './types'

export const SiderCollapsedKey: InjectionKey<SiderCollapsed> = Symbol('siderCollapsed')

export const SiderHookProviderKey: InjectionKey<SiderHookProvider> = Symbol('siderHookProvider')
