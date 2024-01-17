import { tuple } from '@antdv/utils'
import type { CSSProperties, ComputedRef, Ref, VNodeArrayChildren } from 'vue'
import type { Breakpoint, Key, SizeType, VueNode } from '@antdv/types'
import type { TableLocale } from '@antdv/locale'
import type { TableProps as VcTableProps } from '@antdv/vue-components/vc-table/src/Table'
import type {
  DefaultRecordType,
  ExpandableConfig,
  FixedType,
  GetRowKey,
  ColumnType as RcColumnType,
  RenderedCell as RcRenderedCell,
} from '@antdv/vue-components/vc-table/src/interface'
import type { SpinProps } from '../../spin'

import type { TooltipProps } from '../../tooltip'
import type { CheckboxProps } from '../../checkbox'
import type { PaginationProps } from '../../pagination'
import type { INTERNAL_SELECTION_ITEM } from './hooks/useSelection'

// import { TableAction } from './Table';

export type { GetRowKey, ExpandableConfig }

export type RowSelectionType = 'checkbox' | 'radio'

export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void

export type ExpandType = null | 'row' | 'nest'

export type SortOrder = 'descend' | 'ascend' | null

const TableActions = tuple('paginate', 'sort', 'filter')
export type TableAction = (typeof TableActions)[number]

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number

export interface ColumnFilterItem {
  text: VueNode
  value: string | number | boolean
  children?: ColumnFilterItem[]
}
export interface ColumnTitleProps<RecordType> {
  /** @deprecated Please use `sorterColumns` instead. */
  sortOrder?: SortOrder
  /** @deprecated Please use `sorterColumns` instead. */
  sortColumn?: TableColumnType<RecordType>
  sortColumns?: Array<{ column: TableColumnType<RecordType>, order: SortOrder }>

  filters?: Record<string, FilterValue>
}

export type FilterValue = Array<Key | boolean>
export type FilterKey = Key[] | null
export type FilterSearchType<RecordType = Record<string, any>> =
  | boolean
  | ((input: string, record: RecordType) => boolean)
export interface FilterConfirmProps {
  closeDropdown: boolean
}

export interface FilterResetProps {
  confirm?: boolean;
  closeDropdown?: boolean;
}
export interface FilterDropdownProps<RecordType> {
  prefixCls: string
  setSelectedKeys: (selectedKeys: Key[]) => void
  selectedKeys: Key[]
  confirm: (param?: FilterConfirmProps) => void
  clearFilters?: (param?: FilterResetProps) => void;
  filters?: ColumnFilterItem[]
  /** Only close filterDropdown */
  close: () => void
  visible: boolean
  column: TableColumnType<RecordType>
}

export interface TableColumnType<RecordType = DefaultRecordType>
  extends Omit<RcColumnType<RecordType>, 'title'> {
  title?: ColumnTitle<RecordType>
  // Sorter
  sorter?:
  | boolean
  | CompareFn<RecordType>
  | {
    compare?: CompareFn<RecordType>
    /** Config multiple sorter order priority */
    multiple?: number
  }
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  sortDirections?: SortOrder[]
  showSorterTooltip?: boolean | TooltipProps

  // Filter
  filtered?: boolean
  filters?: ColumnFilterItem[]
  filterDropdown?: VueNode | ((props: FilterDropdownProps<RecordType>) => VueNode)
  filterMultiple?: boolean
  filteredValue?: FilterValue | null
  defaultFilteredValue?: FilterValue | null
  filterIcon?: VueNode | ((opt: { filtered: boolean, column: TableColumnType }) => VueNode)
  filterMode?: 'menu' | 'tree'
  filterSearch?: FilterSearchType<ColumnFilterItem>
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean
  filterDropdownOpen?: boolean
  onFilterDropdownOpenChange?: (visible: boolean) => void
  filterResetToDefaultFilteredValue?: boolean
  // Responsive
  responsive?: Breakpoint[]

  // Deprecated
  /** @deprecated Please use `filterDropdownOpen` instead */
  filterDropdownVisible?: boolean
  /** @deprecated Please use `onFilterDropdownOpenChange` instead */
  onFilterDropdownVisibleChange?: (visible: boolean) => void
}

export interface TableColumnGroupType<RecordType> extends Omit<TableColumnType<RecordType>, 'dataIndex'> {
  children: TableColumnsType<RecordType>
}

export type TableColumnsType<RecordType = DefaultRecordType> = Array< | TableColumnGroupType<RecordType>
  | TableColumnType<RecordType>>

export interface SelectionItem {
  key: string
  text: VueNode
  onSelect?: SelectionItemSelectFn
}

export type SelectionSelectFn<T> = (
  record: T,
  selected: boolean,
  selectedRows: T[],
  nativeEvent: Event,
) => void

export interface TableRowSelection<T = DefaultRecordType> {
  /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
  preserveSelectedRowKeys?: boolean
  type?: RowSelectionType
  selectedRowKeys?: Key[]
  defaultSelectedRowKeys?: Key[]
  onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void
  getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>
  onSelect?: SelectionSelectFn<T>
  onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void
  /** @deprecated This function is meaningless and should use `onChange` instead */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void
  /** @deprecated This function is meaningless and should use `onChange` instead */
  onSelectInvert?: (selectedRowKeys: Key[]) => void
  onSelectNone?: () => void
  selections?: INTERNAL_SELECTION_ITEM[] | boolean
  hideSelectAll?: boolean
  fixed?: FixedType
  columnWidth?: string | number
  columnTitle?: string | VueNode
  checkStrictly?: boolean
  renderCell?: (
    value: boolean,
    record: T,
    index: number,
    originNode: VueNode,
  ) => VueNode | RcRenderedCell<T>
}

export type TransformColumns<RecordType> = (
  columns: TableColumnsType<RecordType>,
) => TableColumnsType<RecordType>

export interface TableCurrentDataSource<RecordType = DefaultRecordType> {
  currentDataSource: RecordType[]
  action: TableAction
}

export interface SorterResult<RecordType = DefaultRecordType> {
  column?: TableColumnType<RecordType>
  order?: SortOrder
  field?: Key | readonly Key[]
  columnKey?: Key
}

export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

export interface TablePaginationConfig extends PaginationProps {
  position?: TablePaginationPosition[]
  class?: string
  style?: CSSProperties
}

export interface TransformCellTextProps {
  text: any
  column: TableColumnType
  record: any
  index: number
}

export interface UseSelectionConfig<RecordType> {
  prefixCls: Ref<string>
  pageData: Ref<RecordType[]>
  data: Ref<RecordType[]>
  getRowKey: Ref<GetRowKey<RecordType>>
  getRecordByKey: (key: Key) => RecordType
  expandType: Ref<ExpandType>
  childrenColumnName: Ref<string>
  locale: Ref<TableLocale>
  getPopupContainer?: Ref<GetPopupContainer>
}

export interface SortState<RecordType = DefaultRecordType> {
  column: TableColumnType<RecordType>
  key: Key
  sortOrder: SortOrder | null
  multiplePriority: number | false
}

export interface ContextSlots {
  emptyText?: (...args: any[]) => any
  expandIcon?: (...args: any[]) => any
  title?: (...args: any[]) => any
  footer?: (...args: any[]) => any
  summary?: (...args: any[]) => any
  bodyCell?: (...args: any[]) => any
  expandColumnTitle?: (...args: any[]) => any
  headerCell?: (...args: any[]) => any
  customFilterIcon?: (...args: any[]) => any
  customFilterDropdown?: (...args: any[]) => any
  // 兼容 2.x 的 columns slots 配置
  [key: string]: ((...args: any[]) => any) | undefined
}

export type SlotsContextProps = ComputedRef<ContextSlots>
export interface DefaultExpandIconProps<RecordType> {
  prefixCls: string
  onExpand: (record: RecordType, e: MouseEvent) => void
  record: RecordType
  expanded: boolean
  expandable: boolean
}

export interface ChangeEventInfo<RecordType = DefaultRecordType> {
  pagination: {
    current?: number
    pageSize?: number
    total?: number
  }
  filters: Record<string, FilterValue | null>
  sorter: SorterResult<RecordType> | Array<SorterResult<RecordType>>

  filterStates: Array<FilterState<RecordType>>
  sorterStates: Array<SortState<RecordType>>

  resetPagination: Function
}

export interface TableProps<RecordType = DefaultRecordType>
  extends Omit<
    VcTableProps<RecordType>,
    | 'transformColumns'
    | 'internalHooks'
    | 'internalRefs'
    | 'data'
    | 'columns'
    | 'scroll'
    | 'emptyText'
    | 'canExpandable'
    | 'onUpdateInternalRefs'
  > {
  dropdownPrefixCls?: string
  dataSource?: VcTableProps<RecordType>['data']
  columns?: TableColumnsType<RecordType>
  pagination?: false | TablePaginationConfig
  loading?: boolean | SpinProps
  size?: SizeType
  bordered?: boolean
  locale?: TableLocale

  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | Array<SorterResult<RecordType>>,
    extra: TableCurrentDataSource<RecordType>,
  ) => void
  onResizeColumn?: (w: number, col: TableColumnType) => void
  rowSelection?: TableRowSelection<RecordType>

  getPopupContainer?: GetPopupContainer
  scroll?: VcTableProps<RecordType>['scroll'] & {
    scrollToFirstRowOnChange?: boolean
  }
  sortDirections?: SortOrder[]
  showSorterTooltip?: boolean | TooltipProps
}

export type TableColumnProps<RecordType = unknown> = TableColumnType<RecordType>

export interface FilterState<RecordType = DefaultRecordType> {
  column: TableColumnType<RecordType>
  key: Key
  filteredKeys?: FilterKey
  forceFiltered?: boolean
}
type ColumnTitleNode = VueNode | VNodeArrayChildren
export type ColumnTitle<RecordType> =
  | ColumnTitleNode
  | ((props: ColumnTitleProps<RecordType>) => ColumnTitleNode)

export interface FilterConfig<RecordType> {
  prefixCls: Ref<string>
  dropdownPrefixCls: Ref<string>
  mergedColumns: Ref<TableColumnsType<RecordType>>
  locale: Ref<TableLocale>
  onFilterChange: (
    filters: Record<string, FilterValue | null>,
    filterStates: Array<FilterState<RecordType>>,
  ) => void
  getPopupContainer?: Ref<GetPopupContainer>
}
