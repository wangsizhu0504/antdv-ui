import type { CSSObject } from '@antdv/cssinjs';
import type { ColorPickerToken } from './index';

import { unit } from '@antdv/cssinjs';

/**
 * @private Internal usage only
 */
export function getTransBg(size: string, colorFill: string): CSSObject {
  return {
    backgroundImage: `conic-gradient(${colorFill} 0 25%, transparent 0 50%, ${colorFill} 0 75%, transparent 0)`,
    backgroundSize: `${size} ${size}`,
  };
}

function genColorBlockStyle(token: ColorPickerToken, size: number): CSSObject {
  const { componentCls, borderRadiusSM, colorPickerInsetShadow, lineWidth, colorFillSecondary }
    = token;
  return {
    [`${componentCls}-color-block`]: {
      position: 'relative',
      borderRadius: borderRadiusSM,
      width: size,
      height: size,
      boxShadow: colorPickerInsetShadow,
      flex: 'none',

      ...getTransBg('50%', token.colorFillSecondary),
      [`${componentCls}-color-block-inner`]: {
        width: '100%',
        height: '100%',
        boxShadow: `inset 0 0 0 ${unit(lineWidth)} ${colorFillSecondary}`,
        borderRadius: 'inherit',
      },
    },
  };
}

export default genColorBlockStyle;
