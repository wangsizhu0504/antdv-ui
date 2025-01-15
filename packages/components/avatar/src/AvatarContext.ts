import type { InjectionKey } from 'vue';
import type { AvatarContextType } from './interface';
import { inject, provide } from 'vue';

export const AvatarContextKey: InjectionKey<AvatarContextType> = Symbol('AvatarContextKey');
export function useAvatarInjectContext() {
  return inject(AvatarContextKey, {});
}
export function useAvatarProviderContext(context: AvatarContextType) {
  return provide(AvatarContextKey, context);
}
