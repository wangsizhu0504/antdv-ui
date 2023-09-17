import type { TableLocale } from '../../../locale'
import type { Ref } from 'vue'
import type {
  ColumnType,
  ColumnsType,
  FilterKey,
  FilterValue,
  GetPopupContainer,
} from '../../../table/types'
import type { DefaultRecordType, Key } from '../../../vc-table/interface'

export interface FilterState<RecordType = DefaultRecordType> {
  column: ColumnType<RecordType>
  key: Key
  filteredKeys?: FilterKey
  forceFiltered?: boolean
}

export interface FilterConfig<RecordType> {
  prefixCls: Ref<string>
  dropdownPrefixCls: Ref<string>
  mergedColumns: Ref<ColumnsType<RecordType>>
  locale: Ref<TableLocale>
  onFilterChange: (
    filters: Record<string, FilterValue | null>,
    filterStates: FilterState<RecordType>[],
  ) => void
  getPopupContainer?: Ref<GetPopupContainer>
}
