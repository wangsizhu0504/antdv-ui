import { inject, provide } from 'vue'
import { AvatarContextKey } from '../constant'
import type { AvatarContextType } from './types'

export const useAvatarInjectContext = () => {
  return inject(AvatarContextKey, {})
}
export const useAvatarProviderContext = (context: AvatarContextType) => {
  return provide(AvatarContextKey, context)
}
