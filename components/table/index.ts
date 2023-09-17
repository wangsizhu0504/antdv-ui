import { EXPAND_COLUMN, Summary, SummaryCell, SummaryRow } from '../vc-table'
import Table from './Table'
import Column from './Column'
import ColumnGroup from './ColumnGroup'
import {
  SELECTION_ALL,
  SELECTION_COLUMN,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './hooks/useSelection'

import type { App } from 'vue'

export const TableSummaryRow = SummaryRow
export const TableSummaryCell = SummaryCell
export const TableColumn = Column
export const TableColumnGroup = ColumnGroup

export const TableSummary = Object.assign(Summary, {
  Cell: TableSummaryCell,
  Row: TableSummaryRow,
  name: 'ATableSummary',
})

export default Object.assign(Table, {
  SELECTION_ALL,
  SELECTION_INVERT,
  SELECTION_NONE,
  SELECTION_COLUMN,
  EXPAND_COLUMN,
  Column,
  ColumnGroup,
  Summary: TableSummary,
  install: (app: App) => {
    app.component(TableSummary.name, TableSummary)
    app.component(TableSummaryCell.name, TableSummaryCell)
    app.component(TableSummaryRow.name, TableSummaryRow)
    app.component(Table.name, Table)
    app.component(Column.name, Column)
    app.component(ColumnGroup.name, ColumnGroup)
    return app
  },
})

export * from './types'
export * from './props'
