import { onBeforeUpdate, ref } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'
import type { Key } from '../_util/type'

type RefType = HTMLElement | ComponentPublicInstance
export type RefsValue = Map<Key, RefType>

export type UseRef = [(key: Key) => (el: RefType) => void, Ref<RefsValue>]

export const useRefs = (): UseRef => {
  const refs = ref<RefsValue>(new Map())

  const setRef = (key: Key) => (el: RefType) => {
    refs.value.set(key, el)
  }
  onBeforeUpdate(() => {
    refs.value = new Map()
  })
  return [setRef, refs]
}
