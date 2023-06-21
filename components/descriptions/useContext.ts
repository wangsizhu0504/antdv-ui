import type { CSSProperties, InjectionKey, Ref } from 'vue'
import { ref } from 'vue'
import { createContextFn, useContext } from '../hooks'

export interface AppProviderContextProps {
  labelStyle: Ref<CSSProperties>
  contentStyle: Ref<CSSProperties>
}

const key: InjectionKey<AppProviderContextProps> = Symbol('InjectionKey')

export function createProviderContext(context: AppProviderContextProps) {
  return createContextFn<AppProviderContextProps>(key, context)
}

export function useProviderContext() {
  return useContext<AppProviderContextProps>(key, {
    labelStyle: ref({}),
    contentStyle: ref({}),
  })
}
