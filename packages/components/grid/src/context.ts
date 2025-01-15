import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, inject, provide } from 'vue'

export interface RowContext {
  gutter: ComputedRef<[number, number]>
  wrap: ComputedRef<boolean>
  supportFlexGap: Ref<boolean>
}

export const RowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey')

function useProvideRow(state: RowContext) {
  provide(RowContextKey, state)
}

function useInjectRow() {
  return inject(RowContextKey, {
    gutter: computed(() => undefined),
    wrap: computed(() => undefined),
    supportFlexGap: computed(() => undefined),
  })
}

export { useInjectRow, useProvideRow }
export default useProvideRow
