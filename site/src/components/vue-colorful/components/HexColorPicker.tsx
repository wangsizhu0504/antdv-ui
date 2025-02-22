import type { PropType } from 'vue';
import type { ColorModel } from '../types';

import { defineComponent } from 'vue';
import { equalHex } from '../utils/compare';
import { hexToHsva, hsvaToHex } from '../utils/convert';
import { ColorPicker } from './common/ColorPicker';

const colorModel: ColorModel<string> = {
  defaultColor: '000',
  toHsva: hexToHsva,
  fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
  equal: equalHex,
};

export const HexColorPicker = defineComponent({
  name: 'HexColorPicker',
  inheritAttrs: false,
  props: {
    colorModel: { type: Object as PropType<ColorModel<string>> },
    color: { type: String as PropType<string> },
    onChange: { type: Function as PropType<(newColor: string) => void> },
  },
  setup(props, { attrs }) {
    return () => <ColorPicker {...props} {...attrs} colorModel={colorModel} />;
  },
});
