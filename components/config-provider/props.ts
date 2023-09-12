import { objectType } from '../_util/type'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Locale, ValidateMessages } from '../locale'

import type { TransformCellTextProps } from '../table/interface'
import type { RequiredMark } from '../form/Form'
import type { CSPConfig, RenderEmptyHandler, SizeType, ThemeConfig } from './type'

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
