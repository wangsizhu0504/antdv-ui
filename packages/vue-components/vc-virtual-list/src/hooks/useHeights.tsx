import type { Ref, ShallowRef, VNodeProps } from 'vue';
import type { GetKey } from '../interface';
import { raf } from '@antdv/utils';
import { onUnmounted, ref, watch } from 'vue';

export type CacheMap = Map<any, number>;

export default function useHeights<T>(
  mergedData: ShallowRef<any[]>,
  getKey: GetKey<T>,
  onItemAdd?: ((item: T) => void) | null,
  onItemRemove?: ((item: T) => void) | null,
): [(item: T, instance: HTMLElement) => void, () => void, CacheMap, Ref<symbol>] {
  const instance = new Map<VNodeProps['key'], HTMLElement>();
  const heights = new Map();
  const updatedMark = ref(Symbol('update'));
  watch(mergedData, () => {
    updatedMark.value = Symbol('update');
  });
  let collectRaf: number;

  function cancelRaf() {
    raf.cancel(collectRaf);
  }
  function collectHeight() {
    cancelRaf();
    collectRaf = raf(() => {
      instance.forEach((element, key) => {
        if (element && element.offsetParent) {
          const { offsetHeight } = element;
          if (heights.get(key) !== offsetHeight) {
            // changed = true;
            updatedMark.value = Symbol('update');
            heights.set(key, element.offsetHeight);
          }
        }
      });
    });
  }

  function setInstance(item: T, ins: HTMLElement) {
    const key = getKey(item);
    const origin = instance.get(key);

    if (ins) {
      instance.set(key, (ins as any).$el || ins);
      collectHeight();
    } else {
      instance.delete(key);
    }

    // Instance changed
    if (!origin !== !ins) {
      if (ins)
        onItemAdd?.(item);
      else
        onItemRemove?.(item);
    }
  }
  onUnmounted(() => {
    cancelRaf();
  });

  return [setInstance, collectHeight, heights, updatedMark];
}
