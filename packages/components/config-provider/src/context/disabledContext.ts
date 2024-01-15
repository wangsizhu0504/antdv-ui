import { computed, inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { DisabledType } from '../interface'

const DisabledContextKey: InjectionKey<Ref<DisabledType>> = Symbol('DisabledContextKey')
export function useInjectDisabled() {
  return inject(DisabledContextKey, ref<DisabledType>(undefined))
}
export function useProviderDisabled(disabled: Ref<DisabledType>) {
  const parentDisabled = useInjectDisabled()
  provide(
    DisabledContextKey,
    computed(() => disabled.value ?? parentDisabled.value),
  )
  return disabled
}
