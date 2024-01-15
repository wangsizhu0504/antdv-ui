import type { Ref } from 'vue'
import { onBeforeUpdate, ref } from 'vue'
import type { Key, RefType, RefsValue } from '@antdv/types'

type UseRef = [(key: Key) => (el: RefType) => void, Ref<RefsValue>]
export function useRefs(): UseRef {
  const refs = ref<RefsValue>(new Map())

  const setRef = (key: Key) => (el: RefType) => {
    refs.value.set(key, el)
  }
  onBeforeUpdate(() => {
    refs.value = new Map()
  })
  return [setRef, refs]
}
