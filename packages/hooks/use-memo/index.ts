import type { Ref, WatchSource } from 'vue'
import { ref, watch } from 'vue'

export function useMemo<T>(
  getValue: () => T,
  condition: Array<WatchSource<unknown> | object>,
  shouldUpdate?: (prev: any[], next: any[]) => boolean,
) {
  const cacheRef: Ref<T> = ref(getValue() as any)
  watch(condition, (next, pre) => {
    if (shouldUpdate) {
      if (shouldUpdate(next, pre))
        cacheRef.value = getValue()
    } else {
      cacheRef.value = getValue()
    }
  })

  return cacheRef
}
