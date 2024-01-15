import type { GenerateStyle } from '@antdv/theme'
import type { UploadToken } from '.'

// =========================== Motion ===========================
const genRtlStyle: GenerateStyle<UploadToken> = (token) => {
  const { componentCls } = token

  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  }
}

export default genRtlStyle
