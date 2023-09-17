import type { ColumnFilterItem, FilterValue } from '../../../table/types'

export function flattenKeys(filters?: ColumnFilterItem[]) {
  let keys: FilterValue = [];
  (filters || []).forEach(({ value, children }) => {
    keys.push(value)
    if (children)
      keys = [...keys, ...flattenKeys(children)]
  })
  return keys
}
