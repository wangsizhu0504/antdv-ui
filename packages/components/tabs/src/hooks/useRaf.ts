import type { Ref } from 'vue'
import { raf } from '@antdv/utils'

import { onBeforeUnmount, shallowRef } from 'vue'

export function useRaf<Callback extends Function>(callback: Callback) {
  const rafRef = shallowRef<number>()
  const removedRef = shallowRef(false)

  function trigger(...args: any[]) {
    if (!removedRef.value) {
      raf.cancel(rafRef.value)
      rafRef.value = raf(() => {
        callback(...args)
      })
    }
  }

  onBeforeUnmount(() => {
    removedRef.value = true
    raf.cancel(rafRef.value)
  })

  return trigger
}

type Callback<T> = (ori: T) => T

export function useRafState<T>(
  defaultState: T | (() => T),
): [Ref<T>, (updater: Callback<T>) => void] {
  const batchRef = shallowRef<Array<Callback<T>>>([])
  const state: Ref<T> = shallowRef(
    typeof defaultState === 'function' ? (defaultState as any)() : defaultState,
  )

  const flushUpdate = useRaf(() => {
    let value = state.value
    batchRef.value.forEach((callback) => {
      value = callback(value)
    })
    batchRef.value = []

    state.value = value
  })

  function updater(callback: Callback<T>) {
    batchRef.value.push(callback)
    flushUpdate()
  }

  return [state, updater]
}
