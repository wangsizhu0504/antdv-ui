import type { CSSObject } from '@antdv/cssinjs'
import type { GenerateStyle } from '../../theme'
import type { StepsToken } from '.'

const genStepsCustomIconStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, stepsIconCustomTop, stepsIconCustomSize, stepsIconCustomFontSize } = token

  return {
    [`${componentCls}-item-custom`]: {
      [`> ${componentCls}-item-container > ${componentCls}-item-icon`]: {
        height: 'auto',
        background: 'none',
        border: 0,
        [`> ${componentCls}-icon`]: {
          top: stepsIconCustomTop,
          width: stepsIconCustomSize,
          height: stepsIconCustomSize,
          fontSize: stepsIconCustomFontSize,
          lineHeight: `${stepsIconCustomSize}px`,
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
  }
}

export default genStepsCustomIconStyle
