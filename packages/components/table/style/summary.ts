import type { CSSObject } from '@antdv/theme'
import type { GenerateStyle } from '@antdv/theme'
import type { TableToken } from './index'

const genSummaryStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, lineWidth, tableBorderColor } = token
  const tableBorder = `${lineWidth}px ${token.lineType} ${tableBorderColor}`
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-summary`]: {
        'position': 'relative',
        'zIndex': token.zIndexTableFixed,
        'background': token.tableBg,

        '> tr': {
          '> th, > td': {
            borderBottom: tableBorder,
          },
        },
      },

      [`div${componentCls}-summary`]: {
        boxShadow: `0 -${lineWidth}px 0 ${tableBorderColor}`,
      },
    },
  }
}

export default genSummaryStyle
