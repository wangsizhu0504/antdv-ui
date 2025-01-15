import type { SizeType } from '@antdv/types'
import type { InjectionKey, Ref } from 'vue'
import { computed, inject, provide, ref } from 'vue'

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
