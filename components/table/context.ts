import { computed, inject, provide } from 'vue'
import type { InjectionKey } from 'vue'
import type { SlotsContextProps, TableColumnType } from './types'

const SlotsContextKey: InjectionKey<SlotsContextProps> = Symbol('SlotsContextProps')

export const useProvideSlots = (props: SlotsContextProps) => {
  provide(SlotsContextKey, props)
}

export const useInjectSlots = () => {
  return inject(SlotsContextKey, computed(() => ({})) as SlotsContextProps)
}

interface ContextProps {
  onResizeColumn: (w: number, column: TableColumnType<any>) => void
}

const ContextKey: InjectionKey<ContextProps> = Symbol('ContextProps')

export const useProvideTableContext = (props: ContextProps) => {
  provide(ContextKey, props)
}

export const useInjectTableContext = () => {
  return inject(ContextKey, { onResizeColumn: () => {} } as ContextProps)
}
