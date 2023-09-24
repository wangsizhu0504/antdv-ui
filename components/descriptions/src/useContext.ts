import { ref } from 'vue'
import { createContextFn, useContext } from '../../hooks'
import type { CSSProperties, InjectionKey, Ref } from 'vue'

export interface AppProviderContextProps {
  labelStyle: Ref<CSSProperties>
  contentStyle: Ref<CSSProperties>
}

const key: InjectionKey<AppProviderContextProps> = Symbol('InjectionKey')

export function createProviderContext(context: AppProviderContextProps) {
  return createContextFn<AppProviderContextProps>(key, context, {
    reactiveable: false,
  })
}

export function useProviderContext() {
  return useContext<AppProviderContextProps>(key, {
    labelStyle: ref({}),
    contentStyle: ref({}),
  })
}
