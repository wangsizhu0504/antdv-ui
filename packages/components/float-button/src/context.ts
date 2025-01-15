import type { InjectionKey, Ref } from 'vue'
import type { FloatButtonShape } from './interface'

import { inject, provide, ref } from 'vue'

interface FloatButtonGroupContext {
  shape: Ref<FloatButtonShape>
}
const contextKey: InjectionKey<FloatButtonGroupContext> = Symbol('floatButtonGroupContext')

export function useProvideFloatButtonGroupContext(props: FloatButtonGroupContext) {
  provide(contextKey, props)

  return props
}

export function useInjectFloatButtonGroupContext() {
  return inject(contextKey, { shape: ref() } as FloatButtonGroupContext)
}
