import type { Ref, ShallowRef } from 'vue';
import type { KeyType } from '../Cache';
import { onBeforeUnmount, shallowRef, watch, watchEffect } from 'vue';
import { useStyleInject } from '../StyleContext';
import useHMR from './useHMR';

export type ExtractStyle<CacheValue> = (
  cache: CacheValue,
  effectStyles: Record<string, boolean>,
  options?: {
    plain?: boolean;
  },
) => [order: number, styleId: string, style: string] | null;

export default function useGlobalCache<CacheType>(
  prefix: string,
  keyPath: Ref<KeyType[]>,
  cacheFn: () => CacheType,
  onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void,
): ShallowRef<CacheType> {
  const styleContext = useStyleInject();
  const fullPathStr = shallowRef('');
  const res = shallowRef<CacheType>();
  watchEffect(() => {
    fullPathStr.value = [prefix, ...keyPath.value].join('%');
  });
  const HMRUpdate = useHMR();
  const clearCache = (pathStr: string) => {
    styleContext.value.cache.opUpdate(pathStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      const nextCount = times - 1;
      if (nextCount === 0) {
        onCacheRemove?.(cache, false);
        return null;
      }

      return [times - 1, cache];
    });
  };

  watch(
    fullPathStr,
    (newStr, oldStr) => {
      if (oldStr) clearCache(oldStr);
      // Create cache
      styleContext.value.cache.opUpdate(newStr, (prevCache) => {
        const [times = 0, cache] = prevCache || [];

        // HMR should always ignore cache since developer may change it
        let tmpCache = cache;
        if (process.env.NODE_ENV !== 'production' && cache && HMRUpdate) {
          onCacheRemove?.(tmpCache, HMRUpdate);
          tmpCache = null;
        }
        const mergedCache = tmpCache || cacheFn();

        return [times + 1, mergedCache];
      });
      res.value = styleContext.value.cache.opGet(fullPathStr.value)![1];
    },
    { immediate: true },
  );
  onBeforeUnmount(() => {
    clearCache(fullPathStr.value);
  });
  return res;
}
