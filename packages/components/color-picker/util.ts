import type { ColorGenInput } from '@antdv/vue-components/vc-color-picker';
import type { Color } from './color';

import { ColorFactory } from './color';

export const customizePrefixCls = 'ant-color-picker';

export function generateColor(color: ColorGenInput<Color>): Color {
  if (color instanceof ColorFactory) {
    return color;
  }
  return new ColorFactory(color);
}
export const getRoundNumber = (value: number) => Math.round(Number(value || 0));

export const getAlphaColor = (color: Color) => getRoundNumber(color.toHsb().a * 100);

export function toHexFormat(value?: string, alpha?: boolean) {
  return value?.replace(/[^\w/]/gi, '').slice(0, alpha ? 8 : 6) || '';
}

export const getHex = (value?: string, alpha?: boolean) => (value ? toHexFormat(value, alpha) : '');
