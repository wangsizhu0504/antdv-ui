import {
  PropTypes,
  arrayType,
  booleanType,
  functionType,
  objectType,
  someType,
  vNodeType,
} from '@antdv/utils'
import type { Key } from '@antdv/types'
import type { CSSProperties, ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import type { PaginationConfig } from '../../pagination'
import type { SpinProps } from '../../spin'
import type { ListGridType, ListItemLayout, ListLocale, ListSize } from './types'

export function listProps() {
  return {
    bordered: booleanType(),
    dataSource: arrayType(),
    extra: vNodeType(),
    grid: objectType<ListGridType>(),
    itemLayout: String as PropType<ListItemLayout>,
    loading: someType<boolean | (SpinProps & HTMLAttributes)>([Boolean, Object]),
    loadMore: vNodeType(),
    pagination: someType<false | PaginationConfig>([Boolean, Object]),
    prefixCls: String,
    rowKey: someType<Key | ((item: any) => Key)>([String, Number, Function]),
    renderItem: functionType<(opt: { item: any, index: number }) => any>(),
    size: String as PropType<ListSize>,
    split: booleanType(),
    header: vNodeType(),
    footer: vNodeType(),
    locale: objectType<ListLocale>(),
  }
}

export function listItemProps() {
  return {
    prefixCls: String,
    extra: PropTypes.any,
    actions: PropTypes.array,
    grid: Object as PropType<ListGridType>,
    colStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  }
}

export function listItemMetaProps() {
  return {
    avatar: PropTypes.any,
    description: PropTypes.any,
    prefixCls: String,
    title: PropTypes.any,
  }
}

export type ListItemMetaProps = Partial<ExtractPropTypes<ReturnType<typeof listItemMetaProps>>>

export type ListItemProps = Partial<ExtractPropTypes<ReturnType<typeof listItemProps>>>

export type ListProps = Partial<ExtractPropTypes<ReturnType<typeof listProps>>>
