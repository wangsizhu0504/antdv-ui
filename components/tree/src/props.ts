import { treeProps as vcTreeProps } from '../../_internal/tree/props'

// CSSINJS
import { arrayType, booleanType, functionType, objectType, someType } from '../../_utils/vue'
import { PropTypes } from '../../_utils/vue'
import type { Key } from '../../_utils/types'
import type { FieldNames } from '../../_internal/tree/interface'
import type { ExtractPropTypes } from 'vue'

import type { AntdTreeNodeAttribute, ExpandAction } from './types'

export const treeProps = () => {
  const baseTreeProps = vcTreeProps()
  return {
    ...baseTreeProps,
    'showLine': someType<boolean | { showLeafIcon: boolean }>([Boolean, Object]),
    /** 是否支持多选 */
    'multiple': booleanType(),
    /** 是否自动展开父节点 */
    'autoExpandParent': booleanType(),
    /** checkable状态下节点选择完全受控（父子节点选中状态不再关联） */
    'checkStrictly': booleanType(),
    /** 是否支持选中 */
    'checkable': booleanType(),
    /** 是否禁用树 */
    'disabled': booleanType(),
    /** 默认展开所有树节点 */
    'defaultExpandAll': booleanType(),
    /** 默认展开对应树节点 */
    'defaultExpandParent': booleanType(),
    /** 默认展开指定的树节点 */
    'defaultExpandedKeys': arrayType<Key[]>(),
    /** （受控）展开指定的树节点 */
    'expandedKeys': arrayType<Key[]>(),
    /** （受控）选中复选框的树节点 */
    'checkedKeys': someType<Key[] | { checked: Key[], halfChecked: Key[] }>([Array, Object]),
    /** 默认选中复选框的树节点 */
    'defaultCheckedKeys': arrayType<Key[]>(),
    /** （受控）设置选中的树节点 */
    'selectedKeys': arrayType<Key[]>(),
    /** 默认选中的树节点 */
    'defaultSelectedKeys': arrayType<Key[]>(),
    'selectable': booleanType(),

    'loadedKeys': arrayType<Key[]>(),
    'draggable': booleanType(),
    'showIcon': booleanType(),
    'icon': functionType<(nodeProps: AntdTreeNodeAttribute) => any>(),
    'switcherIcon': PropTypes.any,
    'prefixCls': String,
    /**
     * @default{title,key,children}
     * deprecated, please use `fieldNames` instead
     * 替换treeNode中 title,key,children字段为treeData中对应的字段
     */
    'replaceFields': objectType<FieldNames>(),
    'blockNode': booleanType(),
    'openAnimation': PropTypes.any,
    'onDoubleclick': baseTreeProps.onDblclick,
    'onUpdate:selectedKeys': functionType<(keys: Key[]) => void>(),
    'onUpdate:checkedKeys': functionType<(keys: Key[]) => void>(),
    'onUpdate:expandedKeys': functionType<(keys: Key[]) => void>(),
  }
}
export const directoryTreeProps = () => ({
  ...treeProps(),
  expandAction: someType<ExpandAction>([Boolean, String]),
})

export type TreeProps = Partial<ExtractPropTypes<ReturnType<typeof treeProps>>>

export type DirectoryTreeProps = Partial<ExtractPropTypes<ReturnType<typeof directoryTreeProps>>>
