import type { InjectionKey } from 'vue'
import type { SlotsContextProps, TableColumnType } from './interface'
import { computed, inject, provide } from 'vue'

const SlotsContextKey: InjectionKey<SlotsContextProps> = Symbol('SlotsContextProps')

export function useProvideSlots(props: SlotsContextProps) {
  provide(SlotsContextKey, props)
}

export function useInjectSlots() {
  return inject(SlotsContextKey, computed(() => ({})) as SlotsContextProps)
}

interface ContextProps {
  onResizeColumn: (w: number, column: TableColumnType<any>) => void
}

const ContextKey: InjectionKey<ContextProps> = Symbol('ContextProps')

export function useProvideTableContext(props: ContextProps) {
  provide(ContextKey, props)
}

export function useInjectTableContext() {
  return inject(ContextKey, { onResizeColumn: () => {} } as ContextProps)
}
