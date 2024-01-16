import { objectType } from '@antdv/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { Locale, ValidateMessages } from '@antdv/locale'

import type { SizeType } from '@antdv/types'
import type { TransformCellTextProps } from '../../table'
import type { RequiredMark } from '../../form'
import type { CSPConfig, RenderEmptyHandler, ThemeConfig } from './interface'

export function configProviderProps() {
  return {
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
    wave: objectType<{
      disabled?: boolean
    }>(),
  }
}

export type ConfigProviderProps = Partial<ExtractPropTypes<ReturnType<typeof configProviderProps>>>
