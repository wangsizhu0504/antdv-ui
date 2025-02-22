import type { ComputedRef, Ref } from 'vue';
import type { GenerateConfig } from '../generate';
import type { CustomFormat, Locale } from '../interface';
import { useMemo } from '@antdv/hooks';
import { shallowEqual } from '@antdv/utils';
import { computed } from 'vue';
import { formatValue } from '../utils/dateUtil';

export interface ValueTextConfig<DateType> {
  formatList: ComputedRef<Array<string | CustomFormat<DateType>>>;
  generateConfig: Ref<GenerateConfig<DateType>>;
  locale: Ref<Locale>;
}

export default function useValueTexts<DateType>(
  value: Ref<DateType | null>,
  { formatList, generateConfig, locale }: ValueTextConfig<DateType>,
): [ComputedRef<string[]>, ComputedRef<string>] {
  const texts = useMemo<[string[], string]>(
    () => {
      if (!value.value)
        return [[''], ''];

      // We will convert data format back to first format
      let firstValueText = '';
      const fullValueTexts: string[] = [];

      for (let i = 0; i < formatList.value.length; i += 1) {
        const format = formatList.value[i];
        const formatStr = formatValue(value.value, {
          generateConfig: generateConfig.value,
          locale: locale.value,
          format,
        });
        fullValueTexts.push(formatStr);

        if (i === 0)
          firstValueText = formatStr;
      }

      return [fullValueTexts, firstValueText];
    },
    [value, formatList],
    (next, prev) => prev[0] !== next[0] || !shallowEqual(prev[1], next[1]),
  );
  const fullValueTexts = computed(() => texts.value[0]);
  const firstValueText = computed(() => texts.value[1]);
  return [fullValueTexts, firstValueText];
}
