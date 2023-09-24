import { camelize } from '../../_utils/util'
import { flattenChildren } from '../../_utils/vue'
import type { ColumnTitle, ColumnTitleProps, Key, TableColumnType, TableColumnsType } from './types'

export function getColumnKey<RecordType>(column: TableColumnType<RecordType>, defaultKey: string): Key {
  if ('key' in column && column.key !== undefined && column.key !== null)
    return column.key

  if (column.dataIndex)
    return (Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex) as Key

  return defaultKey
}

export function getColumnPos(index: number, pos?: string) {
  return pos ? `${pos}-${index}` : `${index}`
}

export function renderColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  if (typeof title === 'function')
    return title(props)

  return title
}

export function convertChildrenToColumns<RecordType>(
  elements: any[] = [],
): TableColumnsType<RecordType> {
  const flattenElements = flattenChildren(elements)
  const columns = []
  flattenElements.forEach((element) => {
    if (!element)
      return

    const key = element.key
    const style = element.props?.style || {}
    const cls = element.props?.class || ''
    const props = element.props || {}
    for (const [k, v] of Object.entries(props))
      props[camelize(k)] = v

    const { default: children, ...restSlots } = element.children || {}
    const column = { ...restSlots, ...props, style, class: cls }
    if (key)
      column.key = key

    if (element.type?.__ANT_TABLE_COLUMN_GROUP) {
      column.children = convertChildrenToColumns(
        typeof children === 'function' ? children() : children,
      )
    } else {
      const customRender = element.children?.default
      column.customRender = column.customRender || customRender
    }
    columns.push(column)
  })
  return columns
}
