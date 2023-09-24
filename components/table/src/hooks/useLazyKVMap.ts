import { shallowRef, watch } from 'vue'
import { isArray } from '../../../_utils/is'
import type { Key } from '../../../_utils/types'
import type { Ref } from 'vue'
import type { GetRowKey } from '../types'

interface MapCache<RecordType> {
  kvMap?: Map<Key, RecordType>
}

export default function useLazyKVMap<RecordType>(
  dataRef: Ref<readonly RecordType[]>,
  childrenColumnNameRef: Ref<string>,
  getRowKeyRef: Ref<GetRowKey<RecordType>>,
) {
  const mapCacheRef = shallowRef<MapCache<RecordType>>({})

  watch(
    [dataRef, childrenColumnNameRef, getRowKeyRef],
    () => {
      const kvMap = new Map<Key, RecordType>()
      const getRowKey = getRowKeyRef.value
      const childrenColumnName = childrenColumnNameRef.value

      function dig(records: readonly RecordType[]) {
        if (!isArray(records)) return
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index)
          kvMap.set(rowKey, record)

          if (record && typeof record === 'object' && childrenColumnName in record)
            dig((record as any)[childrenColumnName] || [])
        })
      }

      dig(dataRef.value)

      mapCacheRef.value = {
        kvMap,
      }
    },
    {
      deep: true,
      immediate: true,
    },
  )
  function getRecordByKey(key: Key): RecordType {
    return mapCacheRef.value.kvMap!.get(key)!
  }

  return [getRecordByKey]
}
