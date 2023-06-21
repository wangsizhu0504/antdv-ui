import type { ColumnFilterItem, FilterValue } from '../../../table/interface'

export function flattenKeys(filters?: ColumnFilterItem[]) {
  let keys: FilterValue = [];
  (filters || []).forEach(({ value, children }) => {
    keys.push(value)
    if (children)
      keys = [...keys, ...flattenKeys(children)]
  })
  return keys
}
