import { computed, inject, provide } from 'vue'
import type { AnchorDirection } from './types'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface AnchorContext {
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  activeLink: Ref<string>
  scrollTo: (link: string) => void
  handleClick: (e: Event, info: { title: any, href: string }) => void
  direction: ComputedRef<AnchorDirection>
}

function noop(..._any: any[]): any {}

export const AnchorContextKey: InjectionKey<AnchorContext> = Symbol('anchorContextKey')

const useProvideAnchor = (state: AnchorContext) => {
  provide(AnchorContextKey, state)
}

const useInjectAnchor = () => {
  return inject(AnchorContextKey, {
    registerLink: noop,
    unregisterLink: noop,
    scrollTo: noop,
    activeLink: computed(() => ''),
    handleClick: noop,
    direction: computed(() => 'vertical'),
  } as AnchorContext)
}

export { useInjectAnchor, useProvideAnchor }
export default useProvideAnchor
