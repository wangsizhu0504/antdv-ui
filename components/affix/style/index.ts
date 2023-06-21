import type { CSSObject } from '../../cssinjs'
import type { FullToken, GenerateStyle } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

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
