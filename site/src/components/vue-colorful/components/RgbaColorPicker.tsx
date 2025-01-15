import type { PropType } from 'vue';
import type { ColorModel, RgbaColor } from '../types';

import { defineComponent } from 'vue';
import { equalColorObjects } from '../utils/compare';
import { hsvaToRgba, rgbaToHsva } from '../utils/convert';
import { AlphaColorPicker } from './common/AlphaColorPicker';

const colorModel: ColorModel<RgbaColor> = {
  defaultColor: { r: 0, g: 0, b: 0, a: 1 },
  toHsva: rgbaToHsva,
  fromHsva: hsvaToRgba,
  equal: equalColorObjects,
};

export const RgbaColorPicker = defineComponent({
  name: 'RgbaColorPicker',
  inheritAttrs: false,
  props: {
    colorModel: { type: Object as PropType<ColorModel<RgbaColor>> },
    color: { type: Object as PropType<RgbaColor> },
    onChange: { type: Function as PropType<(newColor: RgbaColor) => void> },
  },
  setup(props, { attrs }) {
    return () => <AlphaColorPicker {...props} {...attrs} colorModel={colorModel} />;
  },
});
