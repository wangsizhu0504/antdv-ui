import { computed, inject, provide, ref } from 'vue'
import { DisabledContextKey } from '../constant'
import type { DisabledType } from './types'
import type { Ref } from 'vue'

export const useInjectDisabled = () => {
  return inject(DisabledContextKey, ref<DisabledType>(undefined))
}
export const useProviderDisabled = (disabled: Ref<DisabledType>) => {
  const parentDisabled = useInjectDisabled()
  provide(
    DisabledContextKey,
    computed(() => disabled.value ?? parentDisabled.value),
  )
  return disabled
}
