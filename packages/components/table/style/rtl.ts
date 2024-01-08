import type { CSSObject } from '@antdv/cssinjs'
import type { GenerateStyle } from '../../theme'
import type { TableToken } from './index'

const genStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls } = token
  return {
    [`${componentCls}-wrapper-rtl`]: {
      direction: 'rtl',
      table: {
        direction: 'rtl',
      },

      [`${componentCls}-pagination-left`]: {
        justifyContent: 'flex-end',
      },

      [`${componentCls}-pagination-right`]: {
        justifyContent: 'flex-start',
      },

      [`${componentCls}-row-expand-icon`]: {
        '&::after': {
          transform: 'rotate(-90deg)',
        },

        '&-collapsed::before': {
          transform: 'rotate(180deg)',
        },

        '&-collapsed::after': {
          transform: 'rotate(0deg)',
        },
      },
    },
  }
}

export default genStyle
