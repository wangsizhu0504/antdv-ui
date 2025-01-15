import type { InputStatus, VueNode } from '@antdv/types'

import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { Direction } from '../../config-provider'
import type {
  ListStyle,
  PaginationType,
  SelectAllLabel,
  TransferDirection,
  TransferItem,
  TransferRender,
} from './interface'

import {
  arrayType,
  booleanType,
  functionType,
  objectType,
  PropTypes,
  someType,
  stringType,
} from '@antdv/utils'

export function transferProps() {
  return {
    'id': String,
    'prefixCls': String,
    'dataSource': arrayType<TransferItem[]>([]),
    'disabled': booleanType(),
    'targetKeys': arrayType<string[]>(),
    'selectedKeys': arrayType<string[]>(),
    'render': functionType<TransferRender<TransferItem>>(),
    'listStyle': someType<((style: ListStyle) => CSSProperties) | CSSProperties>(
      [Function, Object],
    () => ({}),
    ),
    'operationStyle': objectType<CSSProperties>(undefined as CSSProperties),
    'titles': arrayType<string[]>(),
    'operations': arrayType<string[]>(),
    'showSearch': booleanType(false),
    'filterOption': functionType<(inputValue: string, item: TransferItem) => boolean>(),
    'searchPlaceholder': String,
    'notFoundContent': PropTypes.any,
    'locale': objectType(),
    'rowKey': functionType<(record: TransferItem) => string>(),
    'showSelectAll': booleanType(),
    'selectAllLabels': arrayType<SelectAllLabel[]>(),
    'children': functionType<(props: TransferListBodyProps) => VueNode>(),
    'oneWay': booleanType(),
    'pagination': someType<PaginationType>([Object, Boolean]),
    'status': stringType<InputStatus>(),
    'onChange':
    functionType<
      (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void
    >(),
    'onSelectChange':
    functionType<(sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void>(),
    'onSearch': functionType<(direction: TransferDirection, value: string) => void>(),
    'onScroll': functionType<(direction: TransferDirection, e: UIEvent) => void>(),
    'onUpdate:targetKeys': functionType<(keys: string[]) => void>(),
    'onUpdate:selectedKeys': functionType<(keys: string[]) => void>(),
  }
}

export function transferListBodyProps() {
  return {
    prefixCls: String,
    filteredRenderItems: PropTypes.array.def([]),
    selectedKeys: PropTypes.array,
    disabled: booleanType(),
    showRemove: booleanType(),
    pagination: PropTypes.any,
    onItemSelect: Function,
    onScroll: Function,
    onItemRemove: Function,
  }
}
export function transferListItemProps() {
  return {
    renderedText: PropTypes.any,
    renderedEl: PropTypes.any,
    item: PropTypes.any,
    checked: booleanType(),
    prefixCls: String,
    disabled: booleanType(),
    showRemove: booleanType(),
    onClick: Function,
    onRemove: Function,
  }
}

export const transferListProps = {
  prefixCls: String,
  dataSource: arrayType<TransferItem[]>([]),
  filter: String,
  filterOption: Function,
  checkedKeys: PropTypes.arrayOf(PropTypes.string),
  handleFilter: Function,
  handleClear: Function,
  renderItem: Function,
  showSearch: booleanType(false),
  searchPlaceholder: String,
  notFoundContent: PropTypes.any,
  itemUnit: String,
  itemsUnit: String,
  renderList: PropTypes.any,
  disabled: booleanType(),
  direction: stringType<TransferDirection>(),
  showSelectAll: booleanType(),
  remove: String,
  selectAll: String,
  selectCurrent: String,
  selectInvert: String,
  removeAll: String,
  removeCurrent: String,
  selectAllLabel: PropTypes.any,
  showRemove: booleanType(),
  pagination: PropTypes.any,
  onItemSelect: Function,
  onItemSelectAll: Function,
  onItemRemove: Function,
  onScroll: Function,
}

export function transferSearchProps() {
  return {
    prefixCls: String,
    placeholder: String,
    value: String,
    handleClear: Function,
    disabled: { type: Boolean, default: undefined },
    onChange: Function,
  }
}

export type TransferListProps = Partial<ExtractPropTypes<typeof transferListProps>>

export interface TransferOperationProps {
  class?: string
  leftArrowText?: string
  rightArrowText?: string
  moveToLeft?: (e: MouseEvent) => void
  moveToRight?: (e: MouseEvent) => void
  leftActive?: boolean
  rightActive?: boolean
  style?: CSSProperties | string
  disabled?: boolean
  direction?: Direction
  oneWay?: boolean
}
export type TransferSearchProps = Partial<ExtractPropTypes<ReturnType<typeof transferSearchProps>>>

export type TransferListItemProps = Partial<ExtractPropTypes<ReturnType<typeof transferListItemProps>>>

export type TransferListBodyProps = Partial<ExtractPropTypes<ReturnType<typeof transferListBodyProps>>>

export type TransferProps = Partial<ExtractPropTypes<ReturnType<typeof transferProps>>>
