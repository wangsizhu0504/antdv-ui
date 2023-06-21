import type { ColumnType, FilterKey } from '../../../table/interface'
import type { DefaultRecordType, Key } from '../../../vc-table/interface'

export interface FilterState<RecordType = DefaultRecordType> {
  column: ColumnType<RecordType>
  key: Key
  filteredKeys?: FilterKey
  forceFiltered?: boolean
}
