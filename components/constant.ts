import type { Breakpoint } from './_utils/types'
import type { SiderCollapsed, SiderHookProvider } from './layout'
import type { FormContextProps } from './form/src/context'

import type { ConfigProviderInnerProps, DisabledType, GlobalFormCOntextProps, SizeType } from './config-provider'
import type { AppConfig } from './app'
import type { InjectionKey, Ref } from 'vue'
import type { AvatarContextType } from './avatar'

export const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
export const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`
export const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const

export const RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const skipFlattenKey = Symbol('skipFlatten')

export const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']

export const AvatarContextKey: InjectionKey<AvatarContextType> = Symbol('AvatarContextKey')

export const AppConfigContextKey: InjectionKey<AppConfig> = Symbol('appConfigContext')

export const configProviderKey: InjectionKey<ConfigProviderInnerProps> = Symbol('configProvider')

export const GlobalFormContextKey: InjectionKey<GlobalFormCOntextProps> = Symbol('GlobalFormContextKey')

export const GlobalConfigContextKey: InjectionKey<GlobalFormCOntextProps> = Symbol('GlobalConfigContextKey')

export const DisabledContextKey: InjectionKey<Ref<DisabledType>> = Symbol('DisabledContextKey')

export const SizeContextKey: InjectionKey<Ref<SizeType>> = Symbol('SizeContextKey')

export const FormContextKey: InjectionKey<FormContextProps> = Symbol('formContextKey')

export const SiderCollapsedKey: InjectionKey<SiderCollapsed> = Symbol('siderCollapsed')

export const SiderHookProviderKey: InjectionKey<SiderHookProvider> = Symbol('siderHookProvider')

export const defaultIconPrefixCls = 'anticon'

export const PlacementTypes = ['top', 'right', 'bottom', 'left'] as const

export const floatButtonPrefixCls = 'float-btn'

export const DEFAULT_COLUMN_MAP: Partial<Record<Breakpoint, number>> = {
  xxxl: 3,
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
}

export const ANT_MARK = 'internalMark'
export const progressStatuses = ['normal', 'exception', 'active', 'success'] as const
export const progressSize = ['default', 'small'] as const
export const progressType = ['line', 'circle', 'dashboard'] as const

export const PresetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
] as const

export const InputStatuses = ['warning', 'error', ''] as const
