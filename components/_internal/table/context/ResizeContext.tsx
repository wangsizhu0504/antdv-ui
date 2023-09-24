import { inject, provide } from 'vue'
import type { Key } from '../../../_utils/types'
import type { InjectionKey } from 'vue'

interface ResizeContextProps {
  onColumnResize: (columnKey: Key, width: number) => void
}

export const ResizeContextKey: InjectionKey<ResizeContextProps> = Symbol('ResizeContextProps')

export const useProvideResize = (props: ResizeContextProps) => {
  provide(ResizeContextKey, props)
}

export const useInjectResize = () => {
  return inject(ResizeContextKey, { onColumnResize: () => {} })
}
