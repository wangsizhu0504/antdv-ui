import { inject, provide } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export interface ExpandedRowProps {
  componentWidth: Ref<number>
  fixHeader: Ref<boolean>
  fixColumn: Ref<boolean>
  horizonScroll: Ref<boolean>
}
export const ExpandedRowContextKey: InjectionKey<ExpandedRowProps> = Symbol('ExpandedRowProps')

export function useProvideExpandedRow(props: ExpandedRowProps) {
  provide(ExpandedRowContextKey, props)
}

export function useInjectExpandedRow() {
  return inject(ExpandedRowContextKey, {} as ExpandedRowProps)
}
