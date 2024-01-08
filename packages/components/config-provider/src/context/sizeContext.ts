import { computed, inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { SizeType } from '../types'

const SizeContextKey: InjectionKey<Ref<SizeType>> = Symbol('SizeContextKey')

export function useInjectSize() {
  return inject(SizeContextKey, ref(undefined as SizeType))
}
export function useProviderSize(size: Ref<SizeType>) {
  const parentSize = useInjectSize()
  provide(
    SizeContextKey,
    computed(() => size.value || parentSize.value),
  )
  return size
}
