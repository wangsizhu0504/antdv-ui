import type { ComputedRef } from 'vue';
import type { PresetDate } from '../interface';

import { warning } from '@antdv/utils';
import { computed } from 'vue';

export default function usePresets<T>(
  presets?: ComputedRef<Array<PresetDate<T>>>,
  legacyRanges?: ComputedRef<Record<string, T | (() => T)>>,
): ComputedRef<Array<PresetDate<T>>> {
  return computed(() => {
    if (presets?.value)
      return presets.value;

    if (legacyRanges?.value) {
      warning(false, '`ranges` is deprecated. Please use `presets` instead.');

      const rangeLabels = Object.keys(legacyRanges.value);
      return rangeLabels.map((label) => {
        const range = legacyRanges.value[label];
        const newValues = typeof range === 'function' ? (range as any)() : range;
        return {
          label,
          value: newValues,
        };
      });
    }
    return [] as unknown as Array<PresetDate<T>>;
  });
}
