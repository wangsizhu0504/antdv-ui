import type { Key } from '@antdv/types';
import type { ComputedRef, InjectionKey } from 'vue';
import type { StoreMenuInfo } from './useMenuContext';
import { computed, defineComponent, inject, provide } from 'vue';

export const OVERFLOW_KEY = '$$__vc-menu-more__key';
const KeyPathContext: InjectionKey<{
  parentEventKeys: ComputedRef<string[]>
  parentKeys: ComputedRef<Key[]>
  parentInfo: StoreMenuInfo
}> = Symbol('KeyPathContext');

function useInjectKeyPath() {
  return inject(KeyPathContext, {
    parentEventKeys: computed(() => []),
    parentKeys: computed(() => []),
    parentInfo: {} as StoreMenuInfo,
  });
}

function useProvideKeyPath(eventKey: string, key: Key, menuInfo: StoreMenuInfo) {
  const { parentEventKeys, parentKeys } = useInjectKeyPath();
  const eventKeys = computed(() => [...parentEventKeys.value, eventKey]);
  const keys = computed(() => [...parentKeys.value, key]);
  provide(KeyPathContext, { parentEventKeys: eventKeys, parentKeys: keys, parentInfo: menuInfo });
  return keys;
}

const measure = Symbol('measure');
export const PathContext = defineComponent({
  compatConfig: { MODE: 3 },
  setup(_props, { slots }) {
    // 不需要响应式
    provide(measure, true);
    return () => slots.default?.();
  },
});

export function useMeasure() {
  return inject(measure, false);
}

export { KeyPathContext, useInjectKeyPath, useProvideKeyPath };

export default useProvideKeyPath;
