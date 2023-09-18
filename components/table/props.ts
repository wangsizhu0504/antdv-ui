import {
  arrayType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '../_util/type'

import type {
  FilterValue,
  GetPopupContainer,
  SortOrder,
  SorterResult,
  TableColumnType,
  TableColumnsType,
  TableCurrentDataSource,
  TablePaginationConfig,
  TableProps,
  TableRowSelection,
} from './types'
import type { SizeType } from '../config-provider'
import type { TooltipProps } from '../tooltip'
import type { SpinProps } from '../spin'
import type { TableProps as RcTableProps } from '../vc-table/Table'
import type { TableLocale } from '../locale'

export const tableProps = () => ({
  'prefixCls': stringType<string>(),
  'columns': arrayType<TableColumnsType>(),
  'rowKey': someType<TableProps['rowKey']>([String, Function]),
  'tableLayout': stringType<TableProps['tableLayout']>(),
  'rowClassName': someType<TableProps['rowClassName']>([String, Function]),
  'title': functionType<TableProps['title']>(),
  'footer': functionType<TableProps['footer']>(),
  'id': stringType<TableProps['id']>(),
  'showHeader': booleanType(),
  'components': objectType<TableProps['components']>(),
  'customRow': functionType<TableProps['customRow']>(),
  'customHeaderRow': functionType<TableProps['customHeaderRow']>(),
  'direction': stringType<TableProps['direction']>(),
  'expandFixed': someType<TableProps['expandFixed']>([Boolean, String]),
  'expandColumnWidth': Number,
  'expandedRowKeys': arrayType<TableProps['expandedRowKeys']>(),
  'defaultExpandedRowKeys': arrayType<TableProps['defaultExpandedRowKeys']>(),
  'expandedRowRender': functionType<TableProps['expandedRowRender']>(),
  'expandRowByClick': booleanType(),
  'expandIcon': functionType<TableProps['expandIcon']>(),
  'onExpand': functionType<TableProps['onExpand']>(),
  'onExpandedRowsChange': functionType<TableProps['onExpandedRowsChange']>(),
  'onUpdate:expandedRowKeys': functionType<TableProps['onExpandedRowsChange']>(),
  'defaultExpandAllRows': booleanType(),
  'indentSize': Number,
  /** @deprecated Please use `EXPAND_COLUMN` in `columns` directly */
  'expandIconColumnIndex': Number,
  'showExpandColumn': booleanType(),
  'expandedRowClassName': functionType<TableProps['expandedRowClassName']>(),
  'childrenColumnName': stringType<TableProps['childrenColumnName']>(),
  'rowExpandable': functionType<TableProps['rowExpandable']>(),
  'sticky': someType<TableProps['sticky']>([Boolean, Object]),

  'dropdownPrefixCls': String,
  'dataSource': arrayType<RcTableProps['data']>(),
  'pagination': someType<false | TablePaginationConfig>([Boolean, Object]),
  'loading': someType<boolean | SpinProps>([Boolean, Object]),
  'size': stringType<SizeType>(),
  'bordered': booleanType(),
  'locale': objectType<TableLocale>(),

  'onChange':
    functionType<
      (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult | SorterResult[],
        extra: TableCurrentDataSource,
      ) => void
    >(),
  'onResizeColumn': functionType<(w: number, col: TableColumnType) => void>(),
  'rowSelection': objectType<TableRowSelection>(),
  'getPopupContainer': functionType<GetPopupContainer>(),
  'scroll': objectType<
    RcTableProps['scroll'] & {
      scrollToFirstRowOnChange?: boolean
    }
  >(),
  'sortDirections': arrayType<SortOrder[]>(),
  'showSorterTooltip': someType<boolean | TooltipProps>([Boolean, Object], true),
  'transformCellText': functionType<TableProps['transformCellText']>(),
})
