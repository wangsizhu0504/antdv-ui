import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { Key } from '../interface'

interface ResizeContextProps {
  onColumnResize: (columnKey: Key, width: number) => void;
}

export const ResizeContextKey: InjectionKey<ResizeContextProps> = Symbol('ResizeContextProps')

export function useProvideResize(props: ResizeContextProps) {
  provide(ResizeContextKey, props)
}

export function useInjectResize() {
  return inject(ResizeContextKey, { onColumnResize: () => {} })
}
