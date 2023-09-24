import { shallowRef, watchEffect } from 'vue'
import type { ComputedGetter } from './types'
import type { ComputedRef } from 'vue'

export function eagerComputed<T>(fn: ComputedGetter<T>) {
  const result = shallowRef<T>()
  watchEffect(
    () => {
      result.value = fn()
    },
    {
      flush: 'sync', // needed so updates are immediate.
    },
  )

  return result as any as ComputedRef<T>
}
