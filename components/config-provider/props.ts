import type { ExtractPropTypes, PropType } from 'vue'
import type { Locale, ValidateMessages } from '../locale'

import type { TransformCellTextProps } from '../table/interface'
import type { RequiredMark } from '../form/Form'
import { functionType, objectType, stringType } from '../_util/type'
import type { CSPConfig, SizeType, ThemeConfig } from './type'
import type { RenderEmptyHandler } from './renderEmpty'

export const configProviderProps = {
  iconPrefixCls: String,
  getTargetContainer: {
    type: Function as PropType<() => HTMLElement | Window>,
  },
  getPopupContainer: {
    type: Function as PropType<(triggerNode?: HTMLElement) => HTMLElement>,
  },
  prefixCls: stringType(),
  getPrefixCls: functionType<(suffixCls?: string, customizePrefixCls?: string) => string>(),
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
  componentSize: stringType<SizeType>(),
  componentDisabled: { type: Boolean, default: undefined },
  direction: {
    type: String as PropType<'ltr' | 'rtl'>,
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
}

export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>
