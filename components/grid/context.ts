import { computed, inject, provide } from 'vue'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface RowContext {
  gutter: ComputedRef<[number, number]>
  wrap: ComputedRef<boolean>
  supportFlexGap: Ref<boolean>
}

export const RowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey')

const useProvideRow = (state: RowContext) => {
  provide(RowContextKey, state)
}

const useInjectRow = () => {
  return inject(RowContextKey, {
    gutter: computed(() => undefined),
    wrap: computed(() => undefined),
    supportFlexGap: computed(() => undefined),
  })
}

export { useInjectRow, useProvideRow }
export default useProvideRow
