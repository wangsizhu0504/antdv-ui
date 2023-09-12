import type { FormContextProps } from './form/context'
import type { Breakpoint } from './_util/responsiveObserve'
import type { ConfigProviderInnerProps, DisabledType, GlobalFormCOntextProps, SizeType } from './config-provider'
import type { AppConfig } from './app'
import type { InjectionKey, Ref } from 'vue'
import type { AvatarContextType } from './avatar'

export const AvatarContextKey: InjectionKey<AvatarContextType> = Symbol('AvatarContextKey')

export const AppConfigContextKey: InjectionKey<AppConfig> = Symbol('appConfigContext')

export const configProviderKey: InjectionKey<ConfigProviderInnerProps> = Symbol('configProvider')

export const GlobalFormContextKey: InjectionKey<GlobalFormCOntextProps> = Symbol('GlobalFormContextKey')

export const GlobalConfigContextKey: InjectionKey<GlobalFormCOntextProps> = Symbol('GlobalConfigContextKey')

export const DisabledContextKey: InjectionKey<Ref<DisabledType>> = Symbol('DisabledContextKey')

export const SizeContextKey: InjectionKey<Ref<SizeType>> = Symbol('SizeContextKey')

export const FormContextKey: InjectionKey<FormContextProps> = Symbol('formContextKey')

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
