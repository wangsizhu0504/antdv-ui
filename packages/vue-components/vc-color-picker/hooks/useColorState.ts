import type { Ref } from 'vue';
import type { ColorGenInput } from '../interface';

import { useState } from '@antdv/hooks';

import { watch } from 'vue';
import { generateColor } from '../util';

type ColorValue = ColorGenInput | undefined;

function hasValue(value: ColorValue) {
  return value !== undefined;
}

function useColorState(defaultStateValue: ColorValue, option: {
  defaultValue?: ColorValue;
  value?: Ref<ColorValue>;
}) {
  const { defaultValue, value: color } = option;
  const [colorValue, setColorValue] = useState(() => {
    let mergeState;
    if (hasValue(color.value)) {
      mergeState = color.value;
    } else if (hasValue(defaultValue)) {
      mergeState = defaultValue;
    } else {
      mergeState = defaultStateValue;
    }
    return generateColor(mergeState);
  });
  watch(option.value, (value) => {
    setColorValue(generateColor(value));
  });
  return [colorValue, setColorValue] as const;
}

export default useColorState;
