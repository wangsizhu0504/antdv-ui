import { inject, provide, reactive } from 'vue'
import type { InjectionKey } from 'vue'
import type { AppConfig, useAppProps } from './interface'

export const AppConfigContextKey: InjectionKey<AppConfig> = Symbol('appConfigContext')
export function useProvideAppConfigContext(appConfigContext: AppConfig) {
  return provide(AppConfigContextKey, appConfigContext)
}

export function useInjectAppConfigContext() {
  return inject(AppConfigContextKey, {})
}

export const AppContextKey: InjectionKey<useAppProps> = Symbol('appContext')

export function useProvideAppContext(appContext: useAppProps) {
  return provide(AppContextKey, appContext)
}

const defaultAppContext: useAppProps = reactive({
  message: {},
  notification: {},
  modal: {},
} as useAppProps)

export function useInjectAppContext() {
  return inject(AppContextKey, defaultAppContext)
}
