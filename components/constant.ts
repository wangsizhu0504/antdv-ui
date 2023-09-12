import type { AppConfig } from './app'
import type { InjectionKey } from 'vue'
import type { AvatarContextType } from './avatar'

export const AvatarContextKey: InjectionKey<AvatarContextType> = Symbol('AvatarContextKey')

export const AppConfigContextKey: InjectionKey<AppConfig> = Symbol('appConfigContext')
