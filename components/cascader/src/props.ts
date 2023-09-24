import { omit } from 'lodash-es'
import { PropTypes, objectType } from '../../_utils/vue'
import { baseSelectPropsWithoutPrivate } from '../../_internal/select/BaseSelect'
import { SHOW_PARENT } from './utils/commonUtil'

import type {
  BaseOptionType,
  DefaultOptionType,
  FieldNames,
  ShowCheckedStrategy,
  ShowSearchType,
  SingleValueType,
  ValueType,
} from './interface'
import type { SelectCommonPlacement } from '../../_internal/transition'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SizeType } from '../../config-provider'
import type { CascaderOptionType } from './types'

import type { InputStatus, Key, MouseEventHandler, VueNode } from '../../_utils/types'

import type { Placement } from '../../_internal/select/BaseSelect'

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

export function innerCascaderProps<OptionType extends BaseOptionType = DefaultOptionType>() {
  return {
    ...baseCascaderProps(),
    onChange: Function as PropType<
      (value: ValueType, selectOptions: OptionType[] | OptionType[][]) => void
    >,
    customSlots: Object as PropType<Record<string, Function>>,
  }
}

export function cascaderProps<DataNodeType extends CascaderOptionType = CascaderOptionType>() {
  return {
    ...omit(innerCascaderProps(), ['customSlots', 'checkable', 'options']),
    'multiple': { type: Boolean, default: undefined },
    'size': String as PropType<SizeType>,
    'bordered': { type: Boolean, default: undefined },
    'placement': { type: String as PropType<SelectCommonPlacement> },
    'suffixIcon': PropTypes.any,
    'status': String as PropType<InputStatus>,
    'options': Array as PropType<DataNodeType[]>,
    'popupClassName': String,
    /** @deprecated Please use `popupClassName` instead */
    'dropdownClassName': String,
    'onUpdate:value': Function as PropType<(value: ValueType) => void>,
  }
}

export const cascaderOptionCheckboxProps = () => ({
  prefixCls: {
    type: String,
    required: true,
  },
  checked: PropTypes.bool,
  halfChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: {
    type: Function as PropType<MouseEventHandler>,
  },
})

export const cascaderOptionColumnProps = () => ({
  prefixCls: {
    type: String,
    required: true,
  },
  multiple: PropTypes.bool,
  options: PropTypes.bool,
  /** Current Column opened item key */
  activeValue: {
    type: [String, Number] as PropType<Key>,
  },
  /** The value path before current column */
  prevValuePath: {
    type: Array as PropType<Key[]>,
  },
  onToggleOpen: {
    type: Function as PropType<(open: boolean) => void>,
  },
  onSelect: {
    type: Function as PropType<(valuePath: SingleValueType, leaf: boolean) => void>,
  },
  onActive: {
    type: Function as PropType<(valuePath: SingleValueType) => void>,
  },
  checkedSet: {
    type: Object as PropType<Set<Key>>,
  },
  halfCheckedSet: {
    type: Object as PropType<Set<Key>>,
  },
  loadingKeys: {
    type: Array as PropType<Key[]>,
  },
  isSelectable: {
    type: Function as PropType<(option: DefaultOptionType) => boolean>,
  },
})

export type BaseCascaderProps = Partial<ExtractPropTypes<ReturnType<typeof baseCascaderProps>>>

export type CascaderProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderProps>>>

export type CascaderOptionCheckboxProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderOptionCheckboxProps>>>

export type CascaderOptionColumnProps = Partial<ExtractPropTypes<ReturnType<typeof cascaderOptionColumnProps>>>
