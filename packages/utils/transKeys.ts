export function groupKeysMap(keys: string[]) {
  const map = new Map<string, number>()
  keys.forEach((key, index) => {
    map.set(key, index)
  })
  return map
}

export function groupDisabledKeysMap<RecordType extends any[]>(dataSource: RecordType) {
  const map = new Map<string, number>()
  dataSource.forEach(({ disabled, key }, index) => {
    if (disabled)
      map.set(key, index)
  })
  return map
}
