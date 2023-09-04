import { computed, inject, provide } from 'vue'
import { objectType } from '../_util/type'
import type { ComputedRef, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { Locale, ValidateMessages } from '../locale'
import type { VueNode } from '../_util/type'
import type { TransformCellTextProps } from '../table/interface'
import type { RequiredMark } from '../form/Form'
import type { RenderEmptyHandler } from './renderEmpty'
import type { CSPConfig, GlobalFormCOntextProps, SizeType, ThemeConfig } from './type'

export const defaultIconPrefixCls = 'anticon'

export const GlobalFormContextKey: InjectionKey<GlobalFormCOntextProps>
  = Symbol('GlobalFormContextKey')

export const useProvideGlobalForm = (state: GlobalFormCOntextProps) => {
  provide(GlobalFormContextKey, state)
}

export const useInjectGlobalForm = () => {
  return inject(GlobalFormContextKey, { validateMessages: computed(() => undefined) })
}

export const GlobalConfigContextKey: InjectionKey<GlobalFormCOntextProps>
  = Symbol('GlobalConfigContextKey')

export const configProviderProps = () => ({
  iconPrefixCls: String,
  getTargetContainer: {
    type: Function as PropType<() => HTMLElement | Window>,
  },
  getPopupContainer: {
    type: Function as PropType<(triggerNode?: HTMLElement) => HTMLElement>,
  },
  prefixCls: String,
  getPrefixCls: {
    type: Function as PropType<(suffixCls?: string, customizePrefixCls?: string) => string>,
  },
  renderEmpty: {
    type: Function as PropType<RenderEmptyHandler>,
  },
  transformCellText: {
    type: Function as PropType<(tableProps: TransformCellTextProps) => any>,
  },
  csp: objectType<CSPConfig>(),
  input: objectType<{ autocomplete?: string }>(),
  autoInsertSpaceInButton: { type: Boolean, default: undefined },
  locale: objectType<Locale>(),
  pageHeader: objectType<{ ghost?: boolean }>(),
  componentSize: {
    type: String as PropType<SizeType>,
  },
  componentDisabled: { type: Boolean, default: undefined },
  direction: {
    type: String as PropType<'ltr' | 'rtl'>,
    default: 'ltr',
  },
  space: objectType<{ size?: SizeType | number }>(),
  virtual: { type: Boolean, default: undefined },
  dropdownMatchSelectWidth: { type: [Number, Boolean], default: true },
  form: objectType<{
    validateMessages?: ValidateMessages
    requiredMark?: RequiredMark
    colon?: boolean
  }>(),
  pagination: objectType<{
    showSizeChanger?: boolean
  }>(),
  theme: objectType<ThemeConfig>(),
  select: objectType<{
    showSearch?: boolean
  }>(),
})

export type ConfigProviderProps = Partial<ExtractPropTypes<ReturnType<typeof configProviderProps>>>

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

export const configProviderKey: InjectionKey<ConfigProviderInnerProps> = Symbol('configProvider')

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
