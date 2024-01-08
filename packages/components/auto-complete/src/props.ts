import { omit } from '@antdv/utils'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { InputStatus } from '@antdv/types'
import { selectProps } from '../../select'

export function autoCompleteProps() {
  return {
    ...omit(selectProps(), ['loading', 'mode', 'optionLabelProp', 'labelInValue']),
    dataSource: Array as PropType<Array<{ value: any, text: any }> | string[]>,
    dropdownMenuStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}) as CSSProperties,
    },
    // optionLabelProp: String,
    dropdownMatchSelectWidth: { type: [Number, Boolean], default: true },
    prefixCls: String,
    showSearch: { type: Boolean, default: undefined },
    transitionName: String,
    choiceTransitionName: { type: String, default: 'zoom' },
    autofocus: { type: Boolean, default: undefined },
    backfill: { type: Boolean, default: undefined },
    // optionLabelProp: PropTypes.string.def('children'),
    filterOption: { type: [Boolean, Function], default: false },
    defaultActiveFirstOption: { type: Boolean, default: true },
    status: String as PropType<InputStatus>,
  }
}

export type AutoCompleteProps = Partial<ExtractPropTypes<ReturnType<typeof autoCompleteProps>>>
