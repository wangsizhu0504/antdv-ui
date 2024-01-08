import type { CSSObject } from '@antdv/cssinjs'
import { genComponentStyleHook, mergeToken } from '../../theme'
import type { FullToken, GenerateStyle } from '../../theme'

interface AffixToken extends FullToken<'Affix'> {
  zIndexPopup: number
}

// ============================== Shared ==============================
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
  const { componentCls } = token

  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexPopup,
    },
  }
}

// ============================== Export ==============================
export default genComponentStyleHook('Affix', (token) => {
  const affixToken = mergeToken<AffixToken>(token, {
    zIndexPopup: token.zIndexBase + 10,
  })
  return [genSharedAffixStyle(affixToken)]
})
