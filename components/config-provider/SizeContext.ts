import { computed, inject, provide, ref } from 'vue'
import { SizeContextKey } from '../constant'
import type { SizeType } from './type'
import type { Ref } from 'vue'

export const useInjectSize = () => {
  return inject(SizeContextKey, ref(undefined as SizeType))
}
export const useProviderSize = (size: Ref<SizeType>) => {
  const parentSize = useInjectSize()
  provide(
    SizeContextKey,
    computed(() => size.value || parentSize.value),
  )
  return size
}
