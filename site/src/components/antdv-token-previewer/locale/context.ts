import type { InjectionKey, Ref } from 'vue'
import type { Locale } from './interface'

import { computed, inject, provide } from 'vue'
import zhCN from './zh-CN'

const contextKey: InjectionKey<Ref<Locale>> = Symbol('localeContext')

export function useProvideLocaleContext(props: Ref<Locale>) {
  provide(contextKey, props)
  return props
}

export function useInjectLocaleContext() {
  return inject(
    contextKey,
    computed(() => zhCN),
  )
}
