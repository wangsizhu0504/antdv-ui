import { inject, provide, shallowRef } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export interface HoverContextProps {
  startRow: Ref<number>
  endRow: Ref<number>
  onHover: (start: number, end: number) => void
}
export const HoverContextKey: InjectionKey<HoverContextProps> = Symbol('HoverContextProps')

export function useProvideHover(props: HoverContextProps) {
  provide(HoverContextKey, props)
}

export function useInjectHover() {
  return inject(HoverContextKey, {
    startRow: shallowRef(-1),
    endRow: shallowRef(-1),
    onHover() {},
  } as HoverContextProps)
}
