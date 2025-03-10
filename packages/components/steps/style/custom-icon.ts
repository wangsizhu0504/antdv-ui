import type { CSSObject } from '@antdv/cssinjs';
import type { StepsToken } from '.';

import type { GenerateStyle } from '../../theme/internal';
import { unit } from '@antdv/cssinjs';

const genStepsCustomIconStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, customIconTop, customIconSize, customIconFontSize } = token;

  return {
    [`${componentCls}-item-custom`]: {
      [`> ${componentCls}-item-container > ${componentCls}-item-icon`]: {
        height: 'auto',
        background: 'none',
        border: 0,
        [`> ${componentCls}-icon`]: {
          top: customIconTop,
          width: customIconSize,
          height: customIconSize,
          fontSize: customIconFontSize,
          lineHeight: unit(customIconSize),
        },
      },
    },

    // Only adjust horizontal customize icon width
    [`&:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          width: 'auto',
          background: 'none',
        },
      },
    },
  };
};

export default genStepsCustomIconStyle;
