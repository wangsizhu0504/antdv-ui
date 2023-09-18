import type renderEmpty from './renderEmpty'
import type { ConfigProviderProps } from './props'
import type { ComputedRef, Ref } from 'vue'
import type { Locale, ValidateMessages } from '../locale'
import type { DerivativeFunc } from '../cssinjs'
import type { AliasToken, SeedToken } from '../theme'
import type { MapToken, OverrideToken } from '../theme/interface'

import type { RequiredMark } from '../form'
import type { TransformCellTextProps } from '../table'
import type { MaybeRef, VueNode } from '../_util/type'

export type DisabledType = boolean | undefined
export interface GlobalFormCOntextProps {
  validateMessages?: Ref<ValidateMessages>
}

export type DirectionType = 'ltr' | 'rtl' | undefined

export interface CSPConfig {
  nonce?: string
}

export interface ThemeColor {
  primaryColor?: string
  infoColor?: string
  successColor?: string
  processingColor?: string
  errorColor?: string
  warningColor?: string
}

export type SizeType = 'small' | 'middle' | 'large' | undefined
export type Direction = 'ltr' | 'rtl'
export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>
export type RenderEmptyHandler = typeof renderEmpty

export interface RenderEmptyProps {
  componentName?: string
  prefixCls?: string
}

export interface GlobalConfigProviderProps {
  prefixCls?: MaybeRef<ConfigProviderProps['prefixCls']>
  iconPrefixCls?: MaybeRef<ConfigProviderProps['iconPrefixCls']>
  getPopupContainer?: ConfigProviderProps['getPopupContainer']
}

export interface ThemeConfig {
  token?: Partial<AliasToken>
  components?: OverrideToken
  algorithm?: MappingAlgorithm | MappingAlgorithm[]
  hashed?: boolean
  inherit?: boolean
}

export interface ConfigProviderInnerProps {
  csp?: ComputedRef<CSPConfig>
  autoInsertSpaceInButton?: ComputedRef<boolean>
  locale?: ComputedRef<Locale>
  direction?: ComputedRef<'ltr' | 'rtl'>
  space?: ComputedRef<{
    size?: number | SizeType
  }>
  virtual?: ComputedRef<boolean>
  dropdownMatchSelectWidth?: ComputedRef<number | boolean>
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
  iconPrefixCls: ComputedRef<string>
  theme?: ComputedRef<ThemeConfig>
  renderEmpty?: (name?: string) => VueNode
  getTargetContainer?: ComputedRef<() => HTMLElement | Window>
  getPopupContainer?: ComputedRef<(triggerNode?: HTMLElement) => HTMLElement>
  pageHeader?: ComputedRef<{
    ghost?: boolean
  }>
  input?: ComputedRef<{
    autocomplete?: string
  }>
  pagination?: ComputedRef<{
    showSizeChanger?: boolean
  }>
  form?: ComputedRef<{
    validateMessages?: ValidateMessages
    requiredMark?: RequiredMark
    colon?: boolean
  }>
  select?: ComputedRef<{
    showSearch?: boolean
  }>
  componentSize?: ComputedRef<SizeType>
  componentDisabled?: ComputedRef<boolean>
  transformCellText?: ComputedRef<(tableProps: TransformCellTextProps) => any>
}
