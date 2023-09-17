import { omit } from 'lodash-es'
import { objectType } from '../_util/type'
import PropTypes from '../_util/vue-types'
import { baseSelectPropsWithoutPrivate } from '../vc-select/BaseSelect'
import { SHOW_PARENT } from './Cascader'
import type { Placement } from '../vc-select/BaseSelect'
import type { VueNode } from '../_util/type'

import type { BaseOptionType, DefaultOptionType, FieldNames, OnMultipleChange, OnSingleChange, ShowCheckedStrategy, ShowSearchType, ValueType } from './types'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

function baseCascaderProps<OptionType extends BaseOptionType = DefaultOptionType>() {
  return {
    ...omit(baseSelectPropsWithoutPrivate(), ['tokenSeparators', 'mode', 'showSearch']),
    // MISC
    id: String,
    prefixCls: String,
    fieldNames: objectType<FieldNames>(),
    children: Array as PropType<VueNode[]>,

    // Value
    value: { type: [String, Number, Array] as PropType<ValueType> },
    defaultValue: { type: [String, Number, Array] as PropType<ValueType> },
    changeOnSelect: { type: Boolean, default: undefined },
    displayRender: Function as PropType<
      (opt: { labels: string[], selectedOptions?: OptionType[] }) => any
    >,
    checkable: { type: Boolean, default: undefined },
    showCheckedStrategy: { type: String as PropType<ShowCheckedStrategy>, default: SHOW_PARENT },
    // Search
    showSearch: {
      type: [Boolean, Object] as PropType<boolean | ShowSearchType<OptionType>>,
      default: undefined as boolean | ShowSearchType<OptionType>,
    },
    searchValue: String,
    onSearch: Function as PropType<(value: string) => void>,

    // Trigger
    expandTrigger: String as PropType<'hover' | 'click'>,

    // Options
    options: Array as PropType<OptionType[]>,
    /** @private Internal usage. Do not use in your production. */
    dropdownPrefixCls: String,
    loadData: Function as PropType<(selectOptions: OptionType[]) => void>,

    // Open
    /** @deprecated Use `open` instead */
    popupVisible: { type: Boolean, default: undefined },

    /** @deprecated Use `dropdownClassName` instead */
    popupClassName: String,
    dropdownClassName: String,
    dropdownMenuColumnStyle: {
      type: Object as PropType<CSSProperties>,
      default: undefined as CSSProperties,
    },

    /** @deprecated Use `dropdownStyle` instead */
    popupStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    dropdownStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },

    /** @deprecated Use `placement` instead */
    popupPlacement: String as PropType<Placement>,
    placement: String as PropType<Placement>,

    /** @deprecated Use `onDropdownVisibleChange` instead */
    onPopupVisibleChange: Function as PropType<(open: boolean) => void>,
    onDropdownVisibleChange: Function as PropType<(open: boolean) => void>,

    // Icon
    expandIcon: PropTypes.any,
    loadingIcon: PropTypes.any,
  }
}

export type BaseCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof baseCascaderProps>>>

export function singleCascaderProps<OptionType extends BaseOptionType = DefaultOptionType>() {
  return {
    ...baseCascaderProps(),
    checkable: Boolean as PropType<false>,
    onChange: Function as PropType<OnSingleChange<OptionType>>,
  }
}

export function multipleCascaderProps<OptionType extends BaseOptionType = DefaultOptionType>() {
  return {
    ...baseCascaderProps(),
    checkable: Boolean as PropType<true>,
    onChange: Function as PropType<OnMultipleChange<OptionType>>,
  }
}

export type MultipleCascaderProps = Partial<
  ExtractPropTypes<ReturnType<typeof singleCascaderProps>>
>

export function vcCascaderProps<OptionType extends BaseOptionType = DefaultOptionType>() {
  return {
    ...baseCascaderProps(),
    onChange: Function as PropType<
      (value: ValueType, selectOptions: OptionType[] | OptionType[][]) => void
    >,
    customSlots: Object as PropType<Record<string, Function>>,
  }
}

export type CascaderProps = Partial<ExtractPropTypes<ReturnType<typeof vcCascaderProps>>>
export type SingleCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof singleCascaderProps>>>
