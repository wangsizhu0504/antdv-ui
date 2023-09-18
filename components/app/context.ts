import { inject, provide, reactive } from 'vue'
import { AppConfigContextKey } from '../constant'
import type { AppConfig, useAppProps } from './types'
import type { InjectionKey } from 'vue'

export const useProvideAppConfigContext = (appConfigContext: AppConfig) => {
  return provide(AppConfigContextKey, appConfigContext)
}

export const useInjectAppConfigContext = () => {
  return inject(AppConfigContextKey, {})
}

export const AppContextKey: InjectionKey<useAppProps> = Symbol('appContext')

export const useProvideAppContext = (appContext: useAppProps) => {
  return provide(AppContextKey, appContext)
}

const defaultAppContext: useAppProps = reactive({
  message: {},
  notification: {},
  modal: {},
} as useAppProps)

export const useInjectAppContext = () => {
  return inject(AppContextKey, defaultAppContext)
}
