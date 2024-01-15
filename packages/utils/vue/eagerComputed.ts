import { shallowRef, watchEffect } from 'vue'
import type { ComputedRef } from 'vue'

type ComputedGetter<T> = (...args: any[]) => T

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
