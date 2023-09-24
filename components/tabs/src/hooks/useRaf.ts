import { onBeforeUnmount, shallowRef } from 'vue'
import { wrapperRaf } from '../../../_utils/vue'

import type { Ref } from 'vue'

export function useRaf<Callback extends Function>(callback: Callback) {
  const rafRef = shallowRef<number>()
  const removedRef = shallowRef(false)

  function trigger(...args: any[]) {
    if (!removedRef.value) {
      wrapperRaf.cancel(rafRef.value)
      rafRef.value = wrapperRaf(() => {
        callback(...args)
      })
    }
  }

  onBeforeUnmount(() => {
    removedRef.value = true
    wrapperRaf.cancel(rafRef.value)
  })

  return trigger
}

type Callback<T> = (ori: T) => T

export function useRafState<T>(
  defaultState: T | (() => T),
): [Ref<T>, (updater: Callback<T>) => void] {
  const batchRef = shallowRef<Callback<T>[]>([])
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
